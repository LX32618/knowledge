<template>
    <div style="width: 100%;margin-top: 10px;margin-left: 20px">
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
                    <el-form-item label="事件类型">
                        <el-select v-model="searchForm.operation" placeholder="事件类型" style="width:188px;">
                            <el-option label="全部" :value=9999></el-option>
                            <el-option label="新建" :value=999></el-option>
                            <el-option label="编辑" :value=99></el-option>
                            <el-option label="删除" :value=9></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span=8>
                    <el-form-item label="对象类型">
                        <el-select v-model="searchForm.objType" placeholder="对象类型" style="width:188px;">
                            <el-option label="全部" :value=999></el-option>
                            <el-option label="知识目录" :value=99></el-option>
                            <el-option label="临时项目组" :value=9></el-option>
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
                  v-loading="loading"
                  @currentChange="tableCurrentChange"
                  @sortChange="tableSortChange"
                  @pageSizeChange="tablePageSizeChange"
        style="width: 99%">
        </cs-table>
    </div>
</template>

<script>
    export default {
        name: "OperationLog",
        data(){
            return{
                loading:false,
                exportOnePage:false,
                searchForm:{
                    objName:"",
                    dateRange:"",
                    objType:999,
                    operation:9999
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
            exportData(){

            },
            search(){

            },
            tableCurrentChange(currentRow){

            },
            tableSortChange({sort, order}){

            },
            tablePageSizeChange({page,rows}){

            }
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
