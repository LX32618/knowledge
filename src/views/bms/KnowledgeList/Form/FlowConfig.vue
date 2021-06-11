<template>
    <div>
        <span>入库审批流程：<el-button type="primary" icon="el-icon-s-platform" circle @click="dialogVisible = true"></el-button></span>
        <el-divider></el-divider>
        <span>更改审批流程：<el-button type="primary" icon="el-icon-s-platform" circle @click="dialogVisible = true"></el-button></span>
        <el-divider></el-divider>
        <span>删除审批流程：<el-button type="primary" icon="el-icon-s-platform" circle @click="dialogVisible = true"></el-button></span>
        <el-divider></el-divider>
        <span>下载/查看申请审批流程：<el-button type="primary" icon="el-icon-s-platform" circle @click="dialogVisible = true"></el-button></span>
        <el-divider></el-divider>
        <el-dialog :visible.sync="dialogVisible" :show-close="true" title="" @opened="dialogOpen" :close-on-click-modal="false">
            <cs-table ref="tb"
                      :settings="tableSettings"
                      :table-data="flowData"
                      @currentChange="currentChange">
            </cs-table>
            <div style="text-align:end;margin-top: 10px">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="bindProcess">确定</el-button>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import {saveProcessBind} from "@/api/processBind.js"

    export default {
        name: "FlowConfig",
        props:{
            flowData:{
                type:Array,
                default:()=>[]
            },
            defaultRow:{
                type:Object,
                default:()=>{}
            }
        },
        data(){
            return {
                dialogVisible1:false,
                dialogVisible:false,
                selectRow:{},
                tableSettings: {
                    radio:true,//是否单选
                    checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                    pagination:false,//是否显示分页
                    total:50,//一共有多少条数据
                    pageSize:10,//默认每页多少条数据
                    pageSizes:[10,20,50],//设置每页显示多少条数据
                    currentPage:1,//默认显示第几页
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "procDefId", label: "procDefId", sortable: false, visible: false},
                        {prop: "key", label: "流程定义id", sortable: false},
                        {prop: "name", label: "名称"},
                        {prop: "status", label: "状态"},
                        {prop: "createTime", label: "创建时间",formatter:(index,row)=>{
                                return new Date(row.createTime).toLocaleDateString();
                            }
                        }
                    ]
                },
            }
        },
        methods:{
            dialogOpen(){
                if("{}" != JSON.stringify(this.defaultRow))
                {
                    this.$refs.tb.$refs.tb.setCurrentRow(this.defaultRow);
                }
            },
            currentChange(currentRow){
                this.selectRow = currentRow;
            },
            cancel(){
                this.dialogVisible = false;
            },
            async bindProcess(type){
                console.log(this.selectRow);
                let option = {
                    id:"",
                    categoryId:"",
                    processId:this.selectRow.id,
                    processKey:this.selectRow.key,
                    processKindType:type,
                    processDefId:this.selectRow.procDefId,
                    processName:this.selectRow.name,
                    processState:this.selectRow.status,
                    processType:this.selectRow.type
                }
            }
        }
    }
</script>

<style scoped>

</style>
