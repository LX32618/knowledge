<template>
    <div class="box" style="width: 100%">
        <cs-table :table-id="'tb'"
                  ref="tb"
                  :table-options="tableOptions"
                  :table-data="tableData"
                  @currentChange="currentChange"
                  @selectionChange="selectionChange"
                  @sizeChange="sizeChange"
                  @pageChange="pageChange">
            <template v-slot:horizontalSlot>
                <div class="operationNav">
                    <el-button-group>
                        <el-button type="primary" icon="el-icon-circle-plus" @click.native="append">添加</el-button>
                        <el-button type="primary" icon="el-icon-edit" @click.native="edit">编辑</el-button>
                        <el-button type="primary" icon="el-icon-delete" @click.native="remove">删除</el-button>
                    </el-button-group>
                    <el-button-group class="search">
                        <el-input  placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="keywords"></el-input>
                        <el-button type="primary" @click="search">搜索</el-button>
                    </el-button-group>
                </div>
            </template>
        </cs-table>

        <el-dialog title="表单添加" :visible.sync="appendFormVisible">
            <cs-form :form-type="'append'" :form-data="appendFormData"></cs-form>
        </el-dialog>

        <el-dialog title="表单编辑" :visible.sync="editFormVisible">
            <cs-form :form-type="'edit'" :form-data="editFormData"></cs-form>
        </el-dialog>
    </div>
</template>

<script>

    import form from "./Form"

    export default {
        name: "ModelForm",
        data(){
            return {
                keywords:"",
                appendFormVisible:false,
                editFormVisible:false,
                tableOptions: {
                    radio:true,//是否显示单选框
                    checkbox: false,//是否显示checkbox
                    pagination:true,//是否显示分页
                    pageSize:10,//默认每页多少条数据
                    pageList:[10,20,50],//设置每页显示多少条数据
                    total:100,//一共有多少条数据
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "formName", label: "表单名称", sortable: true},
                        {prop: "formType", label: "表单类型", sortable: true},
                        {prop: "tableName", label: "数据库表名", sortable: true},
                        {prop: "base", label: "知识库", sortable: true}
                    ]
                },
                tableData:[],
                appendFormData:{
                    formName:"",
                    formType:"entity",
                    tableName:"",
                    base:"",
                    sort:"0"
                },
                editFormData:{
                    formName:"test",
                    formType:"entity",
                    tableName:"testTable",
                    base:"dbs",
                    sort:"0"
                }
            }
        },
        components:{
            "cs-form":form
        },
        methods:{
            currentChange(val){//单选事件
                console.log(val);
            },
            selectionChange(val){//多选事件
                console.log(val)
            },
            sizeChange(pageSize)//每页显示数量变化
            {
                console.log(val)
            },
            pageChange(currentPage)//当前显示页面变化
            {
                console.log(val);
            },
            append(){
                this.appendFormVisible = true;
            },
            edit(){
                this.editFormVisible = true;
            },
            remove(){
                console.log(this.$refs.tb)
            },
            search(){
                this.drawer = true;
            }
        },
        mounted() {
            this.tableData=[{
                id:1,
                formName:"模型表单",
                formType:"虚拟表单",
                tableName:"table",
                base:"作战需求知识库"
            },{
                id:2,
                formName:"经验教训",
                formType:"实体表单",
                tableName:"table1",
                base:"作战需求知识库"
            }]
        }
    }
</script>

<style scoped>
    .box{
        display: flex;
    }
    .operationNav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin:5px;
    }
    .search{
        display: flex;
    }
</style>