<template>
    <div>
        <el-form :model="authorityData" style="margin-top:-5px">
            <el-button type="primary" size="mini" icon="fa fa-save" @click.native="add">保存</el-button>
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
                      :table-data="authorityData.ruleData">
                <template v-slot:horizontalSlot>
                    <el-button-group style="margin:5px">
                        <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click.native="add">新增</el-button>
                        <el-button type="primary" size="mini" icon="el-icon-delete" @click.native="remove">删除</el-button>
                    </el-button-group>
                </template>
            </cs-table>
        </el-form>
        <el-dialog :visible.sync="dialogVisible"  title="添加共享规则" append-to-body :close-on-click-modal="false" :show-close="false">
            <cs-people-select :priority="true" :form="addRuleForm">
                <template v-slot:operationSlot>
                    <div style="text-align: end">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </div>
                </template>
            </cs-people-select>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: "AuthorityConfig",
        props:["authorityData"],
        data(){
            return{
                dialogVisible:false,
                deptDialogVisible:false,
                peopleDialogVisible:false,
                addRuleForm:{
                    object:"people",
                    type:[],
                    isDownload:false
                },
                tableSettings: {
                    radio:false,//是否单选
                    checkbox: true,//是否多选，单选和多选同一时间只能存在一个
                    pagination:false,//是否显示分页
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
                this.dialogVisible = true;
            },
            remove(){

            },
            openPeopleDialog(){
                this.peopleDialogVisible = true;
            },
            openDeptDialog() {

            }
        }
    }
</script>

<style scoped>
    .el-divider--horizontal{
        margin: 4px;
    }
</style>
