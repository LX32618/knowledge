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

        <el-dialog title="浏览按钮配置" :visible.sync="appendFormVisible" :close-on-click-modal="false" width="50%">
            <cs-form :form-data="appendFormData" @submitSuccess="submitSuccess"></cs-form>
        </el-dialog>

        <el-dialog title="浏览按钮配置" :visible.sync="editFormVisible" :close-on-click-modal="false" width="50%">
            <cs-form :form-data="editFormData" @submitSuccess="submitSuccess"></cs-form>
        </el-dialog>
    </div>
</template>

<script>
    import request from '@/utils/request'
    import form from './Form'
    import {mapGetters} from "vuex";

    let browseBtnUrl = '/api4/app/authcenter/api/SysRefObjServer/';

    export default {
        name: "BrowseButton",
        components:{
            "cs-form":form
        },
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
                        {prop: "refName", label: "名称", sortable: true},
                        {prop: "refType", label: "类型", sortable: false,
                            formatter(index,row)
                            {
                                return row.refType==0?"默认":"自定义sql";
                            }},
                        {prop: "keyField", label: "标识字段"},
                        {prop: "viewField", label: "显示字段"},
                        {prop: "viewUrl", label: "链接地址"},
            /*            {prop: "isMulti", label: "多选",
                            formatter(index,row)
                            {
                                return row.isMulti==0?"否":"是";
                            },
                            visible: false
                        },*/
                        {prop: "isSys", label: "系统对象",
                            formatter(index,row)
                            {
                                return row.isSys==0?"否":"是";
                            }
                        },
                        {prop: "refSql", label: "SQL", visible:false},
                        {prop: "categoryName", label: "知识目录", visible:false},
                        {prop: "categoryId", label: "知识目录id", visible:false},
                        {prop: "importField", label: "导入标识", visible:false},
                        {prop: "viewUrl", label: "链接地址", visible:false},
                        {prop: "filter", label: "过滤条件", visible:false},
                        {prop: "createrId", label: "createrId", visible:false},
                    ]
                },
                tableData:[],
                appendFormData:{

                },
                editFormData:{
                }
            }
        },
        computed: {
            ...mapGetters([
                'userInfo'
            ])
        },
        methods:{
            currentChange(val){//单选事件
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
                        isMulti:-1,
                        refName:this.searchKeyword,
                        sort:sort,
                        order:order,
                    },
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize
                };
                this.loadTableData(data);
            },
            loadTableData(data) {
                this.tableLoading = true;
                request({
                    url: `${browseBtnUrl}get`,
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
            append(){
                let appendFormData = {
                    id:"",
                    refName:"",
                    refType:0,
                    refSql:"",
                    categoryId:"",
                    categoryName:"",
                    createrId:this.userInfo.id,
                    keyField:"id",
                    viewField:"name",
                    importField:"",
                    viewUrl:"system/knowledgeDataController/dataView?baseid=&#36;{id}&edittype=2",
                    filter:"",
                    isMulti:0,
                    isSys:0
                };
                this.$set(this,"appendFormData",appendFormData);
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
            remove(){},
            search(){
                let data = {
                    condition:{
                        isMulti:-1,
                        refName:this.searchKeyword
                    },
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize
                };
                this.loadTableData(data);
            },
            submitSuccess({type,data}){
                if(type == "edit")
                {
                    let index = this.tableData.findIndex(d=> d.id == data.id);
                    this.tableData.splice(index,1,data);
                    this.editFormVisible = false;

                }
                else if(type == "append")
                {
                    this.tableData.unshift(data);
                    this.appendFormVisible = false;
                }
                else{

                }

            }
        },
        mounted() {
            let data = {
                condition:{
                    isMulti:-1,
                    refName:"",
                    sort:"",
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
