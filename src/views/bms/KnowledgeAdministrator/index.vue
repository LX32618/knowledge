<template>
    <div style="margin: 5px">
        <cs-table ref="tb"
                  :settings="tableSettings"
                  :table-data="tableData"
                  @pageSizeChange="pageSizeChange"
                  @currentChange="currentChange">
            <template v-slot:horizontalSlot>
                <div class="operationNav" style="margin-bottom: 5px">
                    <el-button-group>
                        <!--<el-button type="primary" icon="el-icon-delete" @click.native="remove">删除</el-button>-->
                        <el-button type="primary" icon="el-icon-document-add" size="mini" @click="add">添加</el-button>
                        <el-button type="primary" icon="el-icon-edit-outline" size="mini" @click="edit">编辑</el-button>
                        <el-button type="primary" icon="el-icon-delete" size="mini" @click="remove">删除</el-button>
                    </el-button-group>
                </div>
            </template>
        </cs-table>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <el-form label-width="100px" ref="adminForm" :model="form" :rules="rules">
                <el-form-item label="选择人员" prop="selectPeople" >
                    <el-select v-model="form.selectPeople" placeholder="请选择" :disabled="selectDisabled">
                        <el-option
                                v-for="item in peopleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="知识库目录">
                    <div class="category">
                        <el-tree ref="categoryTree"
                                 :data="treeData"
                                 show-checkbox
                                 node-key="id"
                                 :default-expanded-keys="defaultCheckedKeys"
                                 :default-checked-keys="defaultCheckedKeys"
                                 :props="defaultProps"
                        >
                        </el-tree>
                    </div>
                </el-form-item>
                <div style="text-align:end;margin-top: 10px">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm">确定</el-button>
                </div>
            </el-form>

        </el-dialog>

    </div>
</template>

<script>

    import _ from "lodash"
    import {fetchKnowledgeAdministrator,fetchKnowledgeAdministratorList,fetchCategoryTreeSync,saveKnowledgeAdministrator,removeKnowledgeAdministrator} from "@/api/knowledgeAdministrator.js"
    import {flatTree} from "@/utils/tree.js"

    export default {
        name: "KnowledgeAdministrator",
        data(){
            return {
                selectDisabled:false,
                dialogTitle:"",
                dialogVisible:false,
                tableSettings: {
                    radio:true,//是否单选
                    checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                    pagination:true,//是否显示分页
                    total:50,//一共有多少条数据
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    fields: [
                        {prop: "id", label: "id", visible: false},
                        {prop: "realName", label: "名称"},
                        {prop: "category", label: "知识库目录"}
                    ]
                },
                tableData:[],
                treeData:[],
                defaultCheckedKeys:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                selectRow:{},
                peopleList:[],
                form:{
                    selectPeople:""
                },
                rules: {
                    selectPeople: [
                        {required: true, message: '请选择人员', trigger: 'blur'},
                    ],
                }
            }
        },
        methods:{
            async loadTableData(option){
                let resp = await fetchKnowledgeAdministrator(option);
                this.tableSettings.total = resp.content.total;
                let datas = resp.content.datas.map(d=>{
                    let temp = {};
                    temp.id = d.userInfo.id;
                    temp.realName = d.userInfo.realName;
                    temp.category = d.categoryInfo.categoryName;
                    return temp;
                });
                this.tableData = datas;
            },
            async loadtTreeData(option){
                let resp = await fetchCategoryTreeSync(option);
                this.treeData = [resp.content.docCategory];
                let flatCategoryTree = flatTree([resp.content.docCategory]);
                let checkedIds = _.cloneDeep(resp.content.checkedIds);
                checkedIds = checkedIds.filter(cId=>{
                    let filterNode = flatCategoryTree.filter(tree=>{
                        return tree.id == cId;
                    });

                    if(!filterNode[0].children)
                        return true;

                    if(filterNode[0].children.length==0)
                        return true;

                    return false;

                })
                this.defaultCheckedKeys = checkedIds;
            },
            currentChange(currentRow){
                this.selectRow = currentRow;
            },
            pageSizeChange({page,rows})//每页显示数量、页码变化
            {
                let option = {
                    page:page,
                    rows:rows
                };
                this.loadTableData(option);
            },
            add(){
                this.selectDisabled = false;
                this.dialogVisible = true;
                this.form.selectPeople = "";
                this.dialogTitle = "添加知识管理员";
                this.loadtTreeData({hrmId:""});
            },
            edit(){
                if("{}" == JSON.stringify(this.selectRow)){
                    this.$error("请选择需要编辑的行");
                }
                else{
                    this.selectDisabled = true;
                    this.dialogTitle = "编辑知识管理员";
                    this.form.selectPeople = this.selectRow.id;
                    let option = {hrmId:this.selectRow.id};
                    this.loadtTreeData(option);
                    this.dialogVisible = true;
                }
            },
            async remove(){
                if("{}" == JSON.stringify(this.selectRow)){
                    this.$error("请选择需要删除的行");
                }
                else{
                    let hrmId = this.selectRow.id;
                    let option = {hrmId:hrmId};
                    this.$confirm('此操作将删除改行数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () => {
                        await removeKnowledgeAdministrator(option);
                        this.$success("删除成功");
                        let index = this.tableData.findIndex(d=>{
                            return d.id  == hrmId;
                        });
                        this.tableData.splice(index,1);
                    }).catch(() => {

                    });
                }
            },
            async submitForm(){
                this.$refs["adminForm"].validate(async (valid) => {
                    if (valid) {
                        let option = {};
                        let hrmId = this.form.selectPeople;
                        option.hrmId = hrmId;

                        let checkedNodes = this.$refs.categoryTree.getCheckedNodes();
                        let halfCheckedNodes = this.$refs.categoryTree.getHalfCheckedNodes();
                        let allSelectedNodes = _.concat(checkedNodes,halfCheckedNodes);

                        option.categoryIds = allSelectedNodes.map(n=>{
                            return n.id;
                        }).join(",");

                        let category = allSelectedNodes.map(n=>{
                            return n.name;
                        }).join(",");

                        let submitRow = {
                            id:hrmId,
                            realName:this.peopleList.find(p => p.id == hrmId)?this.peopleList.find(p => p.id == hrmId).name:"",
                            category:category
                        };
                        let resp = await saveKnowledgeAdministrator(option);

                        let index = this.tableData.findIndex(d=>{
                            return d.id == hrmId;
                        });

                        if(index >= 0){//如果保存的数据现在的table中有，则保存
                            this.tableData.splice(index,1,submitRow);
                        }
                        else{//没有则新增
                            this.tableData.push(submitRow);
                        }

                        this.$success("保存成功");
                        this.dialogVisible = false;

                    } else {
                        return false;
                    }
                });
            }
        },
        async mounted() {
            let option = {
                page:this.tableSettings.currentPage,
                rows:this.tableSettings.pageSize
            };
            this.loadTableData(option);
            let resp = await fetchKnowledgeAdministratorList();
            this.peopleList = resp.content.map(d =>{
                return {id:d.id,name:d.realName}
            });
        }
    }
</script>

<style scoped>
    .category{
        left:-1px;
        z-index:999;
        height: 200px;
    }
    .category{
        overflow: auto;

    }
</style>
