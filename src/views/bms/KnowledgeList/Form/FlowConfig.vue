<template>
    <div>
        <span>新建流程：<el-button type="primary" icon="el-icon-s-platform" circle @click="add"></el-button></span>
        <el-divider></el-divider>
        <span>
            入库审批流程：
            <el-button type="primary" icon="el-icon-s-platform" circle @click="openDialog('inBound',inBoundTag)"></el-button>
            <el-tag v-if="inBoundTag && inBoundTag.processId" type="danger" @close="handleClose(inBoundTag)" closable>{{inBoundTag.processName}}</el-tag>
        </span>
        <el-divider></el-divider>
        <span>
            更改审批流程：
            <el-button type="primary" icon="el-icon-s-platform" circle @click="openDialog('alter',alterTag)"></el-button>
            <el-tag v-if="alterTag && alterTag.processId" type="danger" @close="handleClose(alterTag)" closable>{{alterTag.processName}}</el-tag>
        </span>
        <el-divider></el-divider>
        <span>
            删除审批流程：
            <el-button type="primary" icon="el-icon-s-platform" circle @click="openDialog('remove',removeTag)"></el-button>
            <el-tag v-if="removeTag && removeTag.processId" type="danger" @close="handleClose(removeTag)" closable>{{removeTag.processName}}</el-tag>
        </span>
        <el-divider></el-divider>
        <span>下载/查看申请审批流程：
            <el-button type="primary" icon="el-icon-s-platform" circle @click="openDialog('downloadView',downloadViewTag)"></el-button>
            <el-tag v-if="downloadViewTag && downloadViewTag.processId" type="danger" @close="handleClose(downloadViewTag)" closable>{{downloadViewTag.processName}}</el-tag>
        </span>
        <el-divider></el-divider>
        <el-dialog :visible.sync="dialogVisible" :show-close="true" title="" @opened="dialogOpened" :close-on-click-modal="false">
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
    import {saveProcessBind,deleteProcessBind} from "@/api/processBind.js"

    export default {
        name: "FlowConfig",
        props:{
            categoryId:{
                type:String,
                default:""
            },
            bindData:{
                type:Array,
                default:()=>[]
            },
            flowData:{
                type:Array,
                default:()=>[]
            }
        },
        data(){
            return {
                dialogVisible1:false,
                dialogVisible:false,
                processKindType:"",
                clickTag:"",
                defaultRow:{},
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
        computed:{
            inBoundTag(){
                return this.bindData.filter(d=>{
                    return d.processKindType == "inBound"
                })[0]
            },
            alterTag(){
                return this.bindData.filter(d=>{
                    return d.processKindType == "alter"
                })[0]
            },
            removeTag(){
                return this.bindData.filter(d=>{
                    return d.processKindType == "remove"
                })[0]
            },
            downloadViewTag() {
                return this.bindData.filter(d => {
                    return d.processKindType == "downloadView"
                })[0]
            }
        },
        methods:{
            openDialog(type,tag){
                this.processKindType = type;
                this.clickTag = tag;
                this.dialogVisible = true;
            },
            dialogOpened(){
                if("{}" != JSON.stringify(this.defaultRow))
                {
                    this.$refs.tb.$refs.tb.setCurrentRow(this.defaultRow);
                }
            },
            add(){
                window.open("/fms-basic/processDesignerController.do?init&oper=create&type=kes_29_type");
            },
            currentChange(currentRow){
                this.selectRow = currentRow;
            },
            cancel(){
                this.dialogVisible = false;
            },
            async bindProcess(){
                let option = {
                    id:(this.clickTag)?this.clickTag.id:"",
                    categoryId:this.categoryId,
                    processId:this.selectRow.id,
                    processKey:this.selectRow.key,
                    processKindType:this.processKindType,
                    processDefId:this.selectRow.procDefId,
                    processName:this.selectRow.name,
                    processState:this.selectRow.status,
                    processType:this.selectRow.type
                };
                let resp = await saveProcessBind(option);
                this.$emit("saveSuccess",resp.content);
                this.dialogVisible = false;
            },
            async handleClose(tag){
                let resp = await deleteProcessBind({id:tag.id});
                this.$emit("deleteSuccess",tag);
            }
        }
    }
</script>

<style scoped>

</style>
