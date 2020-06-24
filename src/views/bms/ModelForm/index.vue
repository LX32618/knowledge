<template>
    <div class="model box" style="width: 100%">
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

        <el-dialog title="表单添加" :visible.sync="appendFormVisible" :close-on-click-modal="false" width="60%">
            <cs-form :form-data="appendFormData" @submitSuccess="submitSuccess"></cs-form>
        </el-dialog>

        <el-dialog title="表单编辑" :visible.sync="editFormVisible" :close-on-click-modal="false" width="60%">
            <cs-form :form-data="editFormData" @submitSuccess="submitSuccess"></cs-form>
        </el-dialog>
    </div>
</template>

<script>
    import form from "./Form"
    import request from '@/utils/request'

    let modelUrl = "/api1/system/knowledgeFormController/";

    export default {
        name: "ModelForm",
        data(){
            return {
                tableLoading:false,
                searchKeyword:"",
                appendFormVisible:false,
                editFormVisible:false,
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
                        {prop: "formName", label: "表单名称", sortable: true},
                        {prop: "formType", label: "表单类型", sortable: false,
                            formatter(index,row)
                            {
                                return row.formType==0?"实体表单":"虚拟表单";
                            }},
                        {prop: "sortTable", label: "表单顺序", visible:false},
                        {prop: "tableName", label: "数据库表名", sortable: true},
                        {prop: "knowledgeDir", label: "知识库", sortable: false},
                        {prop: "associatedForm", label: "关联表单", visible:false},
                    ]
                },
                tableData:[],
                appendFormData:{

                },
                editFormData:{
                }
            }
        },
        components:{
            "cs-form":form
        },
        methods:{
            currentChange(val){//单选事件
                val.mainId = "";
               /* val.formType = val.formType.toString();*/
                this.$set(this,"editFormData",val);
            },
            pageSizeChange({page,rows})
            {
                let data = {
                    condition:{
                        mainForm:"mainForm",
                        formType:"",
                        formName:this.searchKeyword,
                        sort:"",
                        order:"",
                    },
                    page:page,
                    rows:rows
                };
                this.loadTableData(data);
            },
            sortChange({sort, order}){
                let data = {
                    condition:{
                        mainForm:"mainForm",
                        formType:"",
                        formName:this.searchKeyword,
                        sort:sort,
                        order:order,
                    },
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize
                };
                this.loadTableData(data);
            },
            append(){
                this.appendFormData= {
                    mainId:"",
                    id:"",
                    formName:"",
                    formType:0,
                    tableName:"",
                    knowledgeDir:"",
                    sortTable:0,
                    associatedForm:[]
                },
                this.appendFormVisible = true;
            },
            edit(){
                if(this.editFormData.id)
                {
                    this.editFormVisible = true;
                }
                else{
                    this.$error("请先选择要编辑的数据");
                }

            },
            submitSuccess({type,data}){
                if(type=="append")
                {
                    this.$set(this,"appendFormData",data);
                    this.tableData.unshift(data);
                }
                else if(type=="edit"){
                    this.editFormVisible = false;
                    let index = this.tableData.findIndex(d=>d.id==data.id);
                    this.tableData.splice(index,1,data);

                }
            },
            remove(){
            },
            search(){
                let data = {
                    condition:{
                        mainForm:"mainForm",
                        formType:"",
                        formName:this.searchKeyword,
                        sort:"ID",
                        order:"desc",
                    },
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize
                };
                this.loadTableData(data);
            },
            loadTableData(data) {
                this.tableLoading = true;
                request({
                    url: `${modelUrl}loadData`,
                    method: 'post',
                    data:data,
                }).then(data=>{
                    this.tableLoading = false;
                    let fileds = this.tableSettings.fields.map(f=>{
                        return f.prop;
                    });
                    this.$set(this.tableSettings,"total",data.content.total);
                    this.tableData =  data.content.datas.map(d=>{
                        return _.pick(d,fileds);
                    });
                });
            },
        },
        mounted() {
            let data = {
                condition:{
                    mainForm:"mainForm",
                    formName:"",
                    sort:"ID",
                    order:"",
                },
                page:this.tableSettings.currentPage,
                rows:this.tableSettings.pageSize
            };
            this.loadTableData(data);
        }
    }
</script>

<style scoped>
    .model.box{
        display: flex;
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