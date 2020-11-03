<template>
    <div class="model box">
        <cs-table ref="tb"
                  :settings="tableSettings"
                  :table-data="tableData"
                  v-loading="tableLoading"
                  @currentChange="currentChange"
                  @pageSizeChange="pageSizeChange"
                  @sortChange="sortChange">
            <template v-slot:horizontalSlot>
                <div class="model operationNav">
                    <el-button-group>
                        <el-button type="primary" icon="el-icon-circle-plus" @click.native="append">添加</el-button>
                        <el-button type="primary" icon="el-icon-edit" @click.native="edit">编辑</el-button>
                        <el-button type="primary" icon="el-icon-delete" @click.native="remove">删除</el-button>
                    </el-button-group>
                    <el-button-group class="model search">
                        <el-input  placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="searchKeyword" @keyup.enter.native="search"></el-input>
                        <el-button type="primary" @click="search">搜索</el-button>
                    </el-button-group>
                </div>
            </template>
        </cs-table>
        <el-dialog title="全局参数配置" :visible.sync="appendFormVisible" :close-on-click-modal="false">
            <parameter-form :form-data="appendFormData" @submitSuccess="submitSuccess" @cancelSubmit="appendFormVisible = false"></parameter-form>
        </el-dialog>

        <el-dialog title="全局参数配置" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <parameter-form :form-data="editFormData" @submitSuccess="submitSuccess" @cancelSubmit="editFormVisible = false"></parameter-form>
        </el-dialog>
    </div>
</template>

<script>
    import Form from "./Form"

    export default {
        name: "SystemParameter",
        data(){
            return{
                tableLoading:false,
                appendFormVisible:false,
                editFormVisible:false,
                searchKeyword:"",
                tableSettings: {
                    radio:true,//是否显示单选框
                    checkbox: false,//是否显示checkbox
                    pagination:true,//是否显示分页
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    total:0,//一共有多少条数据
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "display", label: "名称", sortable: true},
                        {prop: "pKey", label: "标识"},
                        {prop: "pValue", label: "值"},
                        {prop: "remark", label: "描述"}
                    ]
                },
                tableData:[

                ],
                appendFormData:{

                },
                editFormData:{
                }
            }
        },
        methods:{
            append(){
                this.appendFormVisible = true;
            },
            edit(){
                if(this.editFormData.id){
                    this.editFormVisible = true;
                }
                else{
                    this.$error("请先选择要编辑的数据");
                }
            },
            remove(){
                if(this.editFormData.id){
                    this.editFormVisible = true;
                }
                else{
                    this.$error("请先选择要删除的数据");
                }
            },
            currentChange(val){//单选事件
                console.log(val);
                this.$set(this,"editFormData",val);
            },
            pageSizeChange({page,rows})
            {
            },
            sortChange({sort, order}){
            },
            submitSuccess({type,data}){

            },
            search(){

            }
        },
        mounted() {
            this.tableData = [
                {
                    id:"1",
                    display:"六性失效程度字段",
                    remark:"",
                    pValue:"fd_38",
                    pKey:"six_invalid"
                },{
                    id:"2",
                    display:"六性失效程度字段",
                    remark:"",
                    pValue:"fd_38",
                    pKey:"six_invalid"
                },{
                    id:"3",
                    display:"六性失效程度字段",
                    remark:"",
                    pValue:"fd_38",
                    pKey:"six_invalid"
                },{
                    id:"4",
                    display:"六性失效程度字段",
                    remark:"",
                    pValue:"fd_38",
                    pKey:"six_invalid"
                },{
                    id:"5",
                    display:"六性失效程度字段",
                    remark:"",
                    pValue:"fd_38",
                    pKey:"six_invalid"
                },{
                    id:"6",
                    display:"六性失效程度字段",
                    remark:"",
                    pValue:"fd_38",
                    pKey:"six_invalid"
                },{
                    id:"7",
                    display:"六性失效程度字段",
                    remark:"",
                    pValue:"fd_38",
                    pKey:"six_invalid"
                },{
                    id:"8",
                    display:"六性失效程度字段",
                    remark:"",
                    pValue:"fd_38",
                    pKey:"six_invalid"
                },{
                    id:"9",
                    display:"六性失效程度字段",
                    remark:"",
                    pValue:"fd_38",
                    pKey:"six_invalid"
                },{
                    id:"10",
                    display:"六性失效程度字段",
                    remark:"",
                    pValue:"fd_38",
                    pKey:"six_invalid"
                }
            ];
        },
        components:{
            parameterForm:Form
        }
    }
</script>

<style scoped>
    .model.box{
        display: flex;
        width: 100%;
    }
    .model.operationNav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin:5px;
    }
    .model.search{
        display: flex;
    }
</style>
