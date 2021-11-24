<template>
    <div style="width: 100%">
        <cs-table ref="tb"
                  :settings="tableSettings"
                  :table-data="tableData"
                  @currentChange="currentChange"
                  @pageSizeChange="pageSizeChange">
            <template v-slot:horizontalSlot>
                <div style="margin:5px">
                    <el-button-group>
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click.native="add">添加</el-button>
                        <el-button type="primary" icon="el-icon-edit-outline" @click.native="edit">修改</el-button>
                        <el-button type="primary" icon="el-icon-position" @click.native="deploy">发布</el-button>
                    </el-button-group>
                </div>
            </template>
        </cs-table>
    </div>
</template>

<script>

    import {fetchFlowList,deployFlowList} from "@/api/fmsBasic.js"

    export default {
        name: "FlowManagement",
        data(){

            return{
                tableSettings: {
                    radio:true,//是否单选
                    checkbox: false,//是否多选，单选和多选同一时间只能存在一个
                    pagination:true,//是否显示分页
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
                tableData:[],
                selectRow:{}
            }
        },
        methods:{
            add(){
                window.open("/fms-basic/processDesignerController.do?init&oper=create&type=kes_29_type")
            },
            edit(){

                if("{}" != JSON.stringify(this.selectRow))
                {
                    window.open("/fms-basic/processDesignerController.do?init&oper=edit&deployId="+this.selectRow.id+"&type=kes_29_type")
                }
                else
                {
                    this.$error("请先选中需要修改的流程");
                }
            },
            deploy(){
                if("{}" == JSON.stringify(this.selectRow)){
                    this.$error("请选择一个需要发布的流程");
                }
                else if(this.selectRow.status == "已发布")
                {
                    this.$error("已发布的流程不能再次发布");
                }
                else{
                    let option = {
                        id:this.selectRow.id
                    };
                    deployFlowList(option).then(resp=>{
                        if(resp.data.success)
                        {
                            this.tableData.map(d=>{
                                if(d.id == this.selectRow.id)
                                {
                                    d.status = "已发布";
                                }
                                else
                                    return d;
                            })
                            this.$success("发布成功");
                        }
                        else
                        {
                            this.$error(resp.data.msg);
                        }
                    }).catch((msg)=>{
                        this.$error(msg);
                    })
                }
            },
            getFlowList(option){
                fetchFlowList(option).then(resp=>{
                    if(resp.data.success)
                    {
                        let result = JSON.parse(resp.data.obj);
                        console.log(result);
                        this.tableSettings.total = result.total;
                        this.tableData = result.rows;
                    }
                    else
                    {
                        this.$error(resp.data.msg);
                    }
                }).catch((msg)=>{
                    this.$error(msg);
                })
            },
            currentChange(val){//行单选事件
                this.selectRow = val;
            },
            pageSizeChange({page,rows})//每页显示数量、页码变化
            {
                let option = {
                    searchName: '',
                    searchKey: '',
                    ifPage: 'true',
                    page: page,
                    rows: rows
                };
                this.getFlowList(option);
            }
        },
        mounted() {
            let option = {
                searchName: '',
                searchKey: '',
                ifPage: 'true',
                page: this.tableSettings.currentPage.toString(),
                rows: this.tableSettings.pageSize.toString()
            };
            this.getFlowList(option);
        }
    }
</script>

<style scoped>

</style>
