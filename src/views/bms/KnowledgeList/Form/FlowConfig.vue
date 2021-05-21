<template>
    <div>
        <span>关联的流程：<el-button type="primary" icon="el-icon-s-platform" circle @click="dialogVisible = true"></el-button></span>
        <el-divider></el-divider>
        <el-dialog :visible.sync="dialogVisible" :show-close="true" title="" @opened="dialogOpen" :close-on-click-modal="false">
            <cs-table ref="tb"
                      :settings="tableSettings"
                      :table-data="flowData">
            </cs-table>
        </el-dialog>
        <el-button type="primary" icon="el-icon-s-platform" circle @click="dialogVisible1 = true"></el-button>
        <el-dialog :visible.sync="dialogVisible1" :show-close="true" title="设置审核人" :close-on-click-modal="false">
            <cs-processnode process-id="process1605080548130:10:22546"  process-key="process1605080548130"></cs-processnode>
        </el-dialog>
    </div>
</template>

<script>

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
            }
        }
    }
</script>

<style scoped>

</style>
