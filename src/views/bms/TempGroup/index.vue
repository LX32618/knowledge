<template>
    <div style="width: 100%">
        <cs-table :settings="tableSettings"
                  :table-data="tableData"
                  @pageSizeChange="pageSizeChange"
                  @currentChange = "currentChange">
            <template v-slot:horizontalSlot>
                <el-button-group style="margin:5px">
                    <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click.native="add">新增</el-button>
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click.native="edit">修改</el-button>
                    <el-button type="primary" size="mini" icon="el-icon-delete" @click.native="remove">删除</el-button>
                </el-button-group>
            </template>
        </cs-table>
        <el-dialog :visible.sync="addDialogVisible"  title="添加临时项目组" append-to-body :close-on-click-modal="false">
            <temp-form action-type="add" :form-data="addFormdData" @submitSuccess="submitSuccess" @cancelSuccess="cancelSuccess"></temp-form>
        </el-dialog>
        <el-dialog :visible.sync="editDialogVisible"  title="修改临时项目组" append-to-body :close-on-click-modal="false">
            <temp-form action-type="edit" :form-data="editFormData" @submitSuccess="submitSuccess" @cancelSuccess="cancelSuccess"></temp-form>
        </el-dialog>
    </div>

</template>

<script>
    import tempForm from "./Form"
    import {fetchGroupList,removeGroup} from "@/api/group.js"

    export default {
        name: "index",
        data(){
            return {
                addDialogVisible:false,
                editDialogVisible:false,
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
                        {prop: "name", label: "名称", sortable: false},
                        {prop: "userNames", label: "人员", sortable: false,
                            formatter(index,row){
                                return row.userInfo.map(u=>{
                                    return u.realName;
                                }).join(",");
                            }
                        }
                    ]
                },
                tableData:[],
                selectRow:{},
                addFormdData:{
                    id:"",
                    name:"",
                    userInfo:[]
                },
                editFormData:{

                }
            }
        },
        methods:{
            async getGroup(page,rows){
                let option = {
                    page:page,
                    rows:rows,
                    condition:{
                        name:""
                    }
                };
                let resp = await fetchGroupList(option);
                console.log(resp.content.datas);
                this.tableData = resp.content.datas;
                this.tableSettings.total = resp.content.total;
            },
            pageSizeChange({page,rows})//每页显示数量、页码变化
            {
                this.getGroup(page,rows,this.keyWord,this.deptSelect);
            },
            add(){
                this.addDialogVisible = true;
            },
            edit(){
                if("{}" == JSON.stringify(this.selectRow)) {
                    this.$error("请选择要编辑的行");
                }
                else{
                    this.editFormData = this.selectRow;
                    this.editDialogVisible = true;
                }

            },
            async remove(){
                if("{}" == JSON.stringify(this.selectRow)) {
                    this.$error("请选择要删除的行");
                }
                else{
                    this.$confirm('是否确定删除该行数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async ()=>{
                        let id = this.selectRow.id;
                        let name = this.selectRow.name;
                        let resp = await removeGroup({id:id,name:name});
                        let index = this.tableData.findIndex(t=>{
                            return t.id == id;
                        })
                        this.tableData.splice(index,1);
                        this.$success("数据已删除");
                    }).catch()

                }
            },
            currentChange(currentRow, oldCurrentRow) {
                this.selectRow = currentRow;
            },
            submitSuccess({actionType,row}){
                if("add" == actionType){
                    this.tableData.push(row);
                    this.addDialogVisible = false;
                    this.$success("新增成功");
                }
                else{
                    let index = this.tableData.findIndex(d=>{
                        return d.id == row.id;
                    });
                    this.tableData.splice(index,1,row);
                    this.editDialogVisible = false;
                    this.$success("修改成功");
                }
            },
            cancelSuccess({actionType}){
                if("add" == actionType){
                    this.addDialogVisible = false;
                }
                else{
                    this.editDialogVisible = false;
                }
            }
        },
        mounted() {
            this.getGroup(this.tableSettings.currentPage,this.tableSettings.pageSize);
        },
        components:{
            tempForm
        }
    }
</script>

<style scoped>

</style>
