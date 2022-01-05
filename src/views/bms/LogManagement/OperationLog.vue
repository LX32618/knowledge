<template>
    <div style="width: 100%;margin-top: 10px;margin-left: 20px"  v-loading="loading">
        <el-form :inline="true" :model="searchForm">
            <el-row>
                <el-col :span=8>
                    <el-form-item label="操作对象">
                        <el-input v-model="searchForm.objName" placeholder="操作对象"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span=8>
                    <el-form-item label="用户名称">
                        <el-input v-model="searchForm.userName" placeholder="用户名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span=8>
                    <el-form-item label="时间">
                        <el-date-picker
                                v-model="searchForm.dateRange"
                                value-format="yyyy-MM-dd"
                                type="daterange"
                                :picker-options="pickerOptions"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span=8>
                    <el-form-item label="对象类型">
                        <el-select v-model="searchForm.objType" placeholder="对象类型" style="width:188px;" @change="objTypeChangeEvent">
                            <template v-for="item in objTypeItems" >
                                <el-option :label="item.label" :key="item.value" :value="item.value"></el-option>
                            </template>


             <!--               <el-option label="全部" value="9999"></el-option>
                            <el-option label="知识" value="1"></el-option>
                            <el-option label="知识目录" value="2"></el-option>
                            <el-option label="临时项目组" value="40"></el-option>
                            <el-option label="字典树标签树" value="301"></el-option>-->
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span=8>
                    <el-form-item label="事件类型">
                        <el-select v-model="searchForm.operation" placeholder="事件类型" style="width:188px;">
                            <template v-for="item in operationItems" >
                                <el-option :label="item.label" :key="item.value" :value="item.value"></el-option>
                            </template>


   <!--                         <el-option label="全部" value=""></el-option>
                            <el-option label="新建" value="999"></el-option>
                            <el-option label="编辑" value="3"></el-option>
                            <el-option label="删除" value="4"></el-option>
                            <el-option label="申请" value="5"></el-option>
                            <el-option label="共享" value="6"></el-option>
                            <el-option label="下载" value="2"></el-option>-->
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span=8>
                    <el-form-item>
                        <el-switch v-model="exportOnePage" active-text="仅导出本页">
                        </el-switch>
                        <el-button size="small" type="primary" icon="el-icon-download" round @click="exportData" style="margin-left: 20px">导出</el-button>
                        <el-button size="small" type="primary" icon="el-icon-search" round @click="search">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <cs-table :settings="tableSettings"
                  :table-data="tableData"
                  @pageSizeChange="tablePageSizeChange"
        style="width: 99%">
        </cs-table>
    </div>
</template>

<script>
    import moment from 'moment'
    import {fetchOpertionLog,exportOpertionLog} from "@/api/operationLog.js"
    import Template from "../KnowledgeList/Form/Template";


    export default {
        name: "OperationLog",
        components: {Template},
        data(){
            return{
                loading:false,
                exportOnePage:false,
                objTypeItems:[
                    {label:"全部",value:"9999"},
                    {label:"知识",value:"1"},
                    {label:"知识目录",value:"2"},
                    {label:"临时项目组",value:"40"},
                    {label:"字典树标签树",value:"301"}
                ],
                operationItems:[
                    {label:"全部",value:""}
                ],
                searchForm:{
                    objName:"",
                    dateRange:"",
                    objType:"9999",
                    operation:""
                },
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
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
                        {prop: "id", label: "id",  visible: false},
                        {prop: "userName", label: "用户"},
                        {prop: "dateTime", label: "操作时间"},
                        {prop: "objName", label: "操作对象"},
                        {prop: "remarks", label: "具体操作"},
                        {prop: "operation", label: "事件类型"},
                    ]
                },
                tableData:[],
            }
        },
        methods:{
            objTypeChangeEvent(val){
                let operationItems = [];
                switch (val) {
                    case "9999":
                        operationItems = [{label:"全部",value:""}];
                        break;
                    case "1":
                        operationItems = [
                            {label:"全部",value:""},
                            {label:"新建",value:"999",visible:false},
                            {label:"编辑",value:"3",visible:false},
                            {label:"删除",value:"4",visible:false},
                            {label:"申请",value:"5",visible:false},
                            {label:"共享",value:"6",visible:false},
                            {label:"下载",value:"2",visible:false}];
                        break;
                    case "2":
                        operationItems =[
                            {label:"全部",value:""},
                            {label:"新建",value:"999",visible:false},
                            {label:"编辑",value:"3",visible:false},
                            {label:"删除",value:"4",visible:false}
                        ];
                        break;
                    case "40":
                        operationItems =[
                            {label:"全部",value:""},
                            {label:"新建",value:"999",visible:false},
                            {label:"编辑",value:"3",visible:false},
                            {label:"删除",value:"4",visible:false}
                        ];
                        break;
                    case "301":
                        operationItems =[
                            {label:"全部",value:""},
                            {label:"新建",value:"999",visible:false},
                            {label:"编辑",value:"3",visible:false},
                            {label:"删除",value:"4",visible:false}
                        ];
                        break;
                    default:
                        operationItems = [{label:"全部",value:""}];
                        break;
                };
                this.operationItems = operationItems;
            },
            loadData(option){
                fetchOpertionLog(option).then(resp=>{
                    this.tableSettings.total = resp.content.total;
                    this.tableData = resp.content.datas;
                    this.loading = false;
                }).catch((msg)=>{
                    this.$error(msg);
                    this.loading = false;
                })
            },
            exportData(){
                let option = {
                    userId: "",
                    logType: "",
                    operation: this.searchForm.operation,
                    userName: this.searchForm.userName,
                    objName:this.searchForm.objName,
                    beginTime:this.searchForm.dateRange?this.searchForm.dateRange[0]+" 00:00:00":"",
                    endTime:this.searchForm.dateRange?this.searchForm.dateRange[1]+" 23:59:59":"",
                    objType:this.searchForm.objType,
                    check: "",
                    exportType: "0",
                    exportData:this.exportOnePage?this.tableData:[]
                };
                exportOpertionLog(option);
            },
            search(){
                let  option= {
                    page:this.tableSettings.currentPage,
                    rows:this.tableSettings.pageSize,
                    condition:{
                        userId: "",
                        logType: "",
                        operation: this.searchForm.operation,
                        userName: this.searchForm.userName,
                        objName:this.searchForm.objName,
                        beginTime:this.searchForm.dateRange?this.searchForm.dateRange[0]+" 00:00:00":"",
                        endTime:this.searchForm.dateRange?this.searchForm.dateRange[1]+" 23:59:59":"",
                        objType:this.searchForm.objType,
                        sort: "DATETIME",
                        order: "desc",
                        check: "",
                        exportType: "0"
                    }
                };
                this.loadData(option);
            },
/*            tableCurrentChange(currentRow){

            },
            tableSortChange({sort, order}){

            },*/
            tablePageSizeChange({page,rows}){
                console.log({page,rows});
                console.log(this.searchForm);
                let  option= {
                    page:page,
                    rows:rows,
                    condition:{
                        userId: "",
                        logType: "",
                        operation: this.searchForm.operation,
                        userName: this.searchForm.userName,
                        objName:this.searchForm.objName,
                        beginTime:this.searchForm.dateRange?this.searchForm.dateRange[0]+" 00:00:00":"",
                        endTime:this.searchForm.dateRange?this.searchForm.dateRange[1]+" 23:59:59":"",
                        objType:this.searchForm.objType,
                        sort: "DATETIME",
                        order: "desc",
                        check: "",
                        exportType: "0"
                    }
                };
                this.loadData(option);
            }
        },
        mounted() {
            let  option= {
                page:this.tableSettings.currentPage,
                rows:this.tableSettings.pageSize,
                condition:{
                    userId: "",
                    logType: "",
                    operation: "",
                    userName: "",
                    objName:"",
                    beginTime:"",
                    endTime:"",
                    objType:"9999",
                    sort: "DATETIME",
                    order: "desc",
                    check: "",
                    exportType: "0"
                }
            };
            this.loadData(option);
        }
    }
</script>

<style scoped>
    .operationNav{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
