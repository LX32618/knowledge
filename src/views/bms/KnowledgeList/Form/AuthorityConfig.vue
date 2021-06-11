<template>
    <div>
        <el-form :model="authorityData" style="margin-top:-5px">
            <el-button type="primary" size="mini" icon="fa fa-save" @click.native="saveCreatorPermission">保存</el-button>
            <el-divider></el-divider>
            <p><i class="el-icon-s-operation"></i>创建人相关</p>
            <el-form-item label="创建人权限">
                <el-select v-model="authorityData.ruleLevel" placeholder="请选择">
                    <el-option label="编辑" value="2"></el-option>
                    <el-option label="查看" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-divider></el-divider>
            <p><i class="el-icon-s-operation"></i>默认权限</p>
            <cs-table :settings="tableSettings"
                      :table-data="ruleData"
                      @selectionChange = "selectionChange">
                <template v-slot:horizontalSlot>
                    <el-button-group style="margin:5px">
                        <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click.native="add">新增</el-button>
                        <el-button type="primary" size="mini" icon="el-icon-delete" @click.native="remove">删除</el-button>
                    </el-button-group>
                </template>
            </cs-table>
        </el-form>
        <el-dialog :visible.sync="dialogVisible"  title="添加共享规则" append-to-body :close-on-click-modal="false" :show-close="false">
            <cs-people-select ref="peopleSelect" :priority="true" :form-data="addRuleForm" @cancelSuccess="canCelSuccess" @submitSuccess="addRowSuccess">
            </cs-people-select>
        </el-dialog>
    </div>
</template>

<script>

    import _ from "lodash"
    import {updateCreatorPermission,savePermission,removePermission} from "@/api/authorityConfig.js"

    export default {
        name: "AuthorityConfig",
        props:["authorityData"],
        data(){
            return{
                dialogVisible:false,
                deptDialogVisible:false,
                peopleDialogVisible:false,
                selectRows:[],
                addRuleForm:{},
                ruleData:[],
                tableSettings: {
                    radio:false,//是否单选
                    checkbox: true,//是否多选，单选和多选同一时间只能存在一个
                    pagination:false,//是否显示分页
                    height:400,
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "ruleType", label: "规则",
                            formatter(index,row){
                                switch (row.ruleType) {
                                    case 1:return "指定人员";
                                    case 2:return "指定部门";
                                    case 3:return "指定专业组";
                                    case 99:return "全部人员";
                                    default:return "";
                                }
                            }
                        },
                        {prop: "object", label: "对象",
                            formatter(index,row){
                                return  row.linkList.map(l=>{
                                    return l.resourceText;
                                }).join(",");
                            }},
                        {prop: "permissionType", label: "权限",
                            formatter(index,row){
                                switch (row.permissionType) {
                                    case 2:return "编辑";
                                    case 4:return "查看";
                                    case 3:return "查看可下载";
                                    case 999:return "创建";
                                    default:return "";
                                }
                            }
                        }
                    ]
                }
            }
        },
        methods:{
            add(){
                this.addRuleForm={
                    object:"1",
                        type:[],
                        group:[],
                        download:"0"
                };
                this.dialogVisible = true;
            },
            selectionChange(selections) {
                this.selectRows = selections;
            },
            async saveCreatorPermission(){
                let option = {
                    categoryId:this.authorityData.categoryId,
                    rightlevel0:this.authorityData.ruleLevel
                };
                let resp = await updateCreatorPermission(option);
                this.$success("保存成功");

            },
            canCelSuccess(){
                this.dialogVisible = false;
            },
            async addRowSuccess({formData,selectList}){
                let ruleType = formData.object;
                let hrmId = [];
                let orgId = [];
                let groupId = [];

                if("1" == ruleType)//指定人员
                {
                    hrmId = selectList.map(s=>{
                        return {id:s.id,name:s.realName};
                    });
                }
                else if("2" == ruleType){//指定部门
                    orgId = selectList.map(s=>{
                        return {id:s.id,name:s.departName}
                    })
                }
                else if("3" == ruleType){//指定专业组
                    groupId = formData.group.map(s=>{
                        return {id:s.id,name:s.name}
                    })
                }

                let option = {
                    id:"",
                    objId:this.authorityData.categoryId,
                    ruleType:ruleType,
                    hrmId:hrmId,
                    orgId:orgId,
                    groupId:groupId,
                    permission:formData.type.join(","),
                    download:formData.download
                }
                let resp = await savePermission(option);
                this.ruleData = _.concat(this.ruleData,resp.content.ruleList);
                this.$success("保存成功");
                this.dialogVisible = false;
            },
            async remove(){
                if(this.selectRows.length == 0) {
                    this.$error("请选择要删除的行");
                }
                else{
                    this.$confirm('是否确定删除数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async ()=>{
                        let ruleIds = this.selectRows.map(r=>{
                            return r.id;
                        }).join(",");
                        let option = {
                            objId:this.authorityData.categoryId,
                            ruleIds:ruleIds
                        };
                        let resp = await removePermission(option);
                        this.ruleData = _.differenceBy(this.ruleData,this.selectRows,"id");
                        this.$success("数据已删除");
                    }).catch()

                }
            }
        },
        watch:{
            authorityData:{
                handler(newValue,oldValue){
                    this.ruleData = _.cloneDeep(newValue.ruleData);
                },
                immediate:true,
                deep:true
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .el-divider--horizontal{
        margin: 4px;
    }
</style>
