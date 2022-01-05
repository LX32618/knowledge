<template>
<!--    <div class="clickrate box">
        <div class="clickrate sidebar">
            <cs-lazytree ref="lazytree" :settings="treeSettings" :dataFormat="treeDataFormat" @treeNodeClick="treeNodeClick"></cs-lazytree>
        </div>
        <div class="clickrate main">
            <cs-table ref="tb"
                      :settings="tableSettings"
                      :table-data="tableData"
                      @pageSizeChange="pageSizeChange"
                      style="width: 100%">
                <template v-slot:horizontalSlot>
                    <div style="width: 100%;text-align: center">
                        <h4>{{currentNode.label}}</h4>
                    </div>
                    <el-form :inline="true" :model="searchData" class="searchForm">
                        <el-form-item label="知识名称">
                            <el-input  placeholder="请输入知识名称" style="width: 150px"  v-model="searchData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="发布人">
                            <el-input  placeholder="请输入发布人名称" style="width: 150px"  v-model="searchData.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="发布时间">
                            <el-date-picker
                                    v-model="searchData.date"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="~"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button-group>
                                <el-button type="primary" size="mini" @click="search()">搜索</el-button>
                                <el-button type="primary" size="mini" @click="tableExport()">导出</el-button>
                            </el-button-group>
                        </el-form-item>
                    </el-form>
                </template>
            </cs-table>
        </div>
    </div>-->
    <el-container v-loading="loading"  :element-loading-text="loadingText">
        <el-aside width="210px" style="min-height:100vh;border-right: 1px solid #DCDFE6;">
            <cs-lazytree ref="lazytree" :settings="treeSettings" :dataFormat="treeDataFormat" @treeNodeClick="treeNodeClick"></cs-lazytree>
        </el-aside>
        <el-container>
            <el-main>
                <cs-table ref="tb"
                          :settings="tableSettings"
                          :table-data="tableData"
                          @pageSizeChange="pageSizeChange"
                          style="width: 100%">
                    <template v-slot:horizontalSlot>
                        <div style="width: 100%;text-align: center;margin-top: -20px">
                            <h4>{{currentNode.label}}</h4>
                        </div>
                        <el-form :inline="true" :model="searchData" class="searchForm">
                            <el-form-item label="知识名称">
                                <el-input  placeholder="请输入知识名称" style="width: 150px"  v-model="searchData.name"></el-input>
                            </el-form-item>
                            <el-form-item label="发布人">
                                <el-input  placeholder="请输入发布人名称" style="width: 150px"  v-model="searchData.userName"></el-input>
                            </el-form-item>
                            <el-form-item label="发布时间">
                                <el-date-picker
                                        v-model="searchData.date"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        range-separator="~"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button-group>
                                    <el-button type="primary" size="mini" @click="search()">搜索</el-button>
                                    <el-button type="primary" size="mini" @click="tableExport()">导出</el-button>
                                </el-button-group>
                            </el-form-item>
                        </el-form>
                    </template>
                </cs-table>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

    import _ from "lodash";
    import moment from "moment"
    import {fetchClickRate} from "@/api/analysisController.js"
    import {export_json_to_excel} from "@/plugins/Export2Excel";


    const treeUrl = '/app-zuul/knowledge/app/authcenter/api/categoryTree/';

    export default {
        name: "ClickRate",
        data(){
            return {
                loading:false,
                loadingText:"",
                currentNode:{key:"",label:"知识目录"},
                treeSettings:{
                    root_id:"0",//根节点id
                    expand_root:true,//是否默认展开根节点
                    check_strictly:true,//在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
                    default_expand_all:false,//是否默认展开所层级
                    show_checkbox:false,//是否有checkbox
                    show_radio: false,//是否有单选radio
                    expand_on_click_node:false,//点击接点是否进行展开收缩
                    right_click:false,//是否具有右键功能
                    request:{//访问路径设置
                        url:`${treeUrl}get`,
                        method:"post"
                    }
                },
                tableSettings: {
                    radio:false,//是否单选
                    checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                    pagination:true,//是否显示分页
                    total:0,//一共有多少条数据
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "name", label: "名称"},
                        {prop: "categoryName", label: "知识库"},
                        {prop: "createDate", label: "发布时间"},
                        {prop: "userName", label: "发布人"},
                        {prop: "clickingRate", label: "点击率统计",sortable:true}
                    ]
                },
                tableData:[],
                searchData:{
                    name:"",
                    userName:"",
                    date:[],
                }
            }
        },
        methods:{
            async loadTableData(option){
                option.name = this.searchData.name;
                option.userName = this.searchData.userName;
                option.categoryId = this.currentNode.key;//this.currentNodeId;

                option.beginTime = (this.searchData.date && this.searchData.date[0])?moment(this.searchData.date[0]).format("YYYY-MM-DD"):"";
                option.endTime = (this.searchData.date && this.searchData.date[1])?moment(this.searchData.date[1]).format("YYYY-MM-DD"):"";

                this.loading = true;
                let resp = await fetchClickRate(option);
                this.tableSettings.total = resp.content.total;
                this.tableData = resp.content.datas.map(d=>{
                    return {id:d.ID,name:d.NAME,categoryName:d.CATEGORYNAME,createDate:d.CREATEDATE,clickingRate:d.CLICKINGRATE,userName:d.USERNAME}
                });
                this.loading = false;
            },
            treeDataFormat({node,data}){
                const temp = _.cloneDeep(data);
                let formatData = temp.filter(item=>{
                    return !(item.type == 2 && item.enable != 0);
                }).map((item,index,arr)=>{
                    if(item.pid==this.treeSettings.root_id)
                    {
                        item.icon = "element-icons el-custom-book";
                    }
                    else if(item.type==0){
                        item.icon = "element-icons el-custom-db";
                    }
                    else if(item.type==1){
                        item.icon = "element-icons el-custom-files";
                    }
                    else if(item.type==2){
                        item.icon = "element-icons el-custom-file";
                    }
                    else{}
                    return item;
                })
                return formatData;
            },
            treeNodeClick({data,node})
            {
                this.currentNode = node;
                let option = {
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize
                };
                this.loadTableData(option);
            },
            pageSizeChange({page,rows})//每页显示数量、页码变化
            {
                let option = {
                    page:page,
                    rows:rows
                };
                this.loadTableData(option);
            },
            formatExcelData(filterVal, jsonData) {
                return  jsonData.map(v =>
                    filterVal.map(
                        j => v[j]
                    )
                );
            },
            async tableExport(){
                this.loading = true;
                this.loadingText = "下载中";
                let option = {
                    page:1,
                    rows:this.tableSettings.total
                };
                option.name = this.searchData.name;
                option.userName = this.searchData.userName;
                option.categoryId = this.currentNode.key;//this.currentNodeId;
                option.beginTime = this.searchData.date?moment(this.searchData.date[0]).format("YYYY-MM-DD"):"";
                option.endTime = this.searchData.date?moment(this.searchData.date[1]).format("YYYY-MM-DD"):"";
                const tHeader = this.tableSettings.fields.filter(c => {
                    return c.visible != false;
                }).map(c => {
                    return c.label;
                });
                const filterVal = this.tableSettings.fields.filter(c=>{
                    return c.visible != false;
                }).map(c => {
                    return c.prop;
                });
                let resp = await fetchClickRate(option);
                const list = resp.content.datas.map(d=>{
                    return {id:d.ID,name:d.NAME,categoryName:d.CATEGORYNAME,createDate:d.CREATEDATE,clickingRate:d.CLICKINGRATE}
                });
                const data = this.formatExcelData(filterVal, list);
                export_json_to_excel({
                    header: tHeader,
                    data,
                    filename:"知识点击率统计"
                });
                this.loading = false;
            },
            search(){

                let option = {
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize
                };
                this.loadTableData(option);
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
    .clickrate.box{
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 99%;
    }
    .clickrate.sidebar{
        flex-basis: 15%;
        height: 100vh;
    }
    .clickrate.main{
        flex-basis:84%;
    }
    .searchForm{
        margin-left: 20px;
        margin-top: 10px;
        margin-bottom: -10px;
    }



</style>
