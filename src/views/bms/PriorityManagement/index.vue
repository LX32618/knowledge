<template>
    <div style="width: 97%;margin:10px">
        <cs-table ref="tb"
                  :settings="tableSettings"
                  :table-data="tableData"
                  @currentChange="currentChange"
                  @pageSizeChange="pageSizeChange">
            <template v-slot:horizontalSlot>
                <div style="margin:5px">
                    <el-button-group>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click.native="add">添加</el-button>
                        <el-button type="primary" icon="el-icon-edit-outline" @click.native="edit">修改</el-button>
                        <el-button type="primary" icon="el-icon-delete" @click.native="remove">删除</el-button>
                    </el-button-group>
                </div>
            </template>
        </cs-table>
        <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" append-to-body :close-on-click-modal="false">
            <div>
                <el-form :model="formData" label-width="100px" :rules="rules" ref="priorityForm">
                    <el-form-item label="权限名称" prop="name">
                        <el-input v-model="formData.name" style="width:203px" :disabled="inputDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="选择资源">
                        <div class="resource">
                            <el-tree ref="resourceTree"
                                 :data="treeData"
                                 show-checkbox
                                 node-key="id"
                                 :default-expanded-keys="defaultCheckedKeys"
                                 :default-checked-keys="defaultCheckedKeys"
                                 :props="{children: 'children',label: 'name'}"
                            >
                            </el-tree>
                        </div>
                    </el-form-item>
                </el-form>
                <div style="text-align:end">
                    <el-button type="primary" @click="submitForm">保存</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import _ from "lodash"
    import {flatTree} from "@/utils/tree.js"
    import {fetchPriorities,fetchPrioritiesSelected,savePriorities,removePriorities} from "@/api/priorityManagement.js"

    export default {
        name: "PriorityManagement",
        data(){
            return{
                inputDisabled:false,
                dialogTitle:"",
                dialogVisible:false,
                treeSettings:{
                    check_strictly:false,
                    default_expand_all:false,
                    show_checkbox:true,
                    show_radio:false,
                    expand_on_click_node:true,
                    right_click:false,
                    default_checked_keys:[]
                },
                tableSettings: {
                    radio:true,//是否单选
                    checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                    pagination:true,//是否显示分页
                    total:0,//一共有多少条数据
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "name", label: "名称",width:200},
                        {prop: "resourceNames", label: "资源"}
                    ]
                },
                tableData:[
                ],
                selectRow:{},
                treeData:[],
                defaultCheckedKeys:[],
                formData:{
                    id:"",
                    name:""
                },
                rules: {
                    name: [
                        {required: true, message: '请输入权限名称', trigger: 'blur'},
                    ],
                }
            }
        },
        methods:{
            async loadTableData(option){
                let resp = await fetchPriorities(option);
                this.tableSettings.total = resp.content.total;
                let tableData = resp.content.datas.map(d=>{
                    return {id:d.ID,name:d.NAME,resourceNames:d.RESOURCENAMES}
                });

                this.tableData = tableData;
            },
            async loadTreeData(option){
              let resp = await fetchPrioritiesSelected(option);
              this.treeData = resp.content.resourceTree;
              let flatResourceTree = flatTree(resp.content.resourceTree);
              let checkedIds = _.cloneDeep(resp.content.checkList);
              checkedIds = checkedIds.filter(cId=>{
                  let filterNode = flatResourceTree.filter(tree=>{
                      return tree.id == cId;
                  });

                  if(!filterNode[0].children)
                      return true;

                  if(filterNode[0].children.length==0)
                      return true;

                  return false;
              });

              this.defaultCheckedKeys = checkedIds;
            },
            add(){
                this.inputDisabled = false;
                this.dialogTitle = "添加权限资源";
                this.formData.id = "";
                this.formData.name = "";
                let option = {roleID:""};
                this.loadTreeData(option);
                this.dialogVisible = true;
            },
            edit(){
                if("{}" == JSON.stringify(this.selectRow)){
                    this.$error("请先选择一行数据");
                }
                else{
                    this.inputDisabled = true;
                    this.dialogTitle = "修改权限资源";
                    this.formData.id = this.selectRow.id;
                    this.formData.name = this.selectRow.name;
                    let option = {roleID:this.selectRow.id};
                    this.loadTreeData(option);
                    this.dialogVisible = true;
                }
            },
            async remove(){
                if("{}" == JSON.stringify(this.selectRow)){
                    this.$error("请先选择一行数据");
                }
                else{

                    let rowId = this.selectRow.id;
                    let option = {id:rowId};
                    this.$confirm('此操作将删除该行数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () => {
                        await removePriorities(option);
                        let index = this.tableData.findIndex(d=>{
                            return d.id  == rowId;
                        });
                        this.tableData.splice(index,1);
                        this.$success("删除成功");
                        this.selectRow = {};
                        this.$set(this.tableSettings,"total",this.tableSettings.total - 1);
                    }).catch(() => {

                    });
                }
            },
            currentChange(val){//行单选事件
                this.selectRow = val;
            },
            pageSizeChange({page,rows})//每页显示数量、页码变化
            {
                let option = {
                    page:page,
                    rows:rows
                };
                this.loadTableData(option);
            },
            async submitForm(){
                this.$refs["priorityForm"].validate(async (valid) => {
                    if (valid) {
                        let option = {};
                        option.id = this.formData.id;
                        option.name = this.formData.name;
                        let checkedNodes = this.$refs.resourceTree.getCheckedNodes();
                        let halfCheckedNodes = this.$refs.resourceTree.getHalfCheckedNodes();
                        let allSelectedNodes = _.concat(checkedNodes,halfCheckedNodes);

                        option.resourceIds = allSelectedNodes.map(n=>{
                            return n.id;
                        }).join(",");
                        let resp = await savePriorities(option);
                        let newId = resp.content.id;

                        let submitRow = {
                            id:newId,
                            name:this.formData.name,
                            resourceNames:allSelectedNodes.map(n=>{return n.name}).join(",")
                        }

                        if("" == this.formData.id)//新增
                        {
                            this.tableData.push(submitRow);
                            this.$success("新增成功");
                            this.$set(this.tableSettings,"total",this.tableSettings.total +1);
                        }
                        else{
                            let index = this.tableData.findIndex(td=>{
                                return td.id == this.formData.id;
                            })
                            this.tableData.splice(index,1,submitRow);
                            this.$success("编辑成功");
                        }

                        this.dialogVisible = false;
                    }
                    else{
                        return false;
                    }
                })
            }
        },
        mounted() {
            let option = {
                page:this.tableSettings.currentPage,
                rows:this.tableSettings.pageSize
            };
            this.loadTableData(option);
        }
    }
</script>

<style scoped>
    .resource{
        left:-1px;
        z-index:999;
        height: 200px;
    }
    .resource{
        overflow: auto;

    }
</style>
