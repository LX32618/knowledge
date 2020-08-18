<template>
    <div>
        <el-form :model="ruleForm" style="margin-top:-5px">
            <el-button type="primary" size="mini" icon="fa fa-save" @click.native="add">保存</el-button>
            <el-divider></el-divider>
            <p><i class="el-icon-s-operation"></i>创建人相关</p>
            <el-form-item label="创建人权限">
                <el-select v-model="ruleForm.creator" placeholder="请选择">
                    <el-option label="编辑" value="edit"></el-option>
                    <el-option label="查看" value="view"></el-option>
                </el-select>
            </el-form-item>
            <el-divider></el-divider>
            <p><i class="el-icon-s-operation"></i>默认权限</p>
            <cs-table :settings="tableSettings"
                      :table-data="ruleForm.ruleData">
                <template v-slot:horizontalSlot>
                    <el-button-group style="margin:5px">
                        <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click.native="add">新增</el-button>
                        <el-button type="primary" size="mini" icon="el-icon-delete" @click.native="remove">删除</el-button>
                    </el-button-group>
                </template>
            </cs-table>
        </el-form>
        <el-dialog :visible.sync="dialogVisible"  title="添加共享规则">
            <el-form :model="addRuleForm" label-width="80px">
                <el-form-item label="权限规则">
                    <el-select v-model="addRuleForm.object" placeholder="请选择">
                        <el-option label="指定人员" value="people"></el-option>
                        <el-option label="指定部门" value="dept"></el-option>
                        <el-option label="指定专业组" value="group"></el-option>
                        <el-option label="全部人员" value="allpeople"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限类型">
                    <el-select v-model="addRuleForm.type" multiple placeholder="请选择">
                        <el-option label="查看" value="view"></el-option>
                        <el-option label="编辑" value="edit"></el-option>
                        <el-option label="创建" value="create"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="可下载" v-if="addRuleForm.type.indexOf('view')!=-1">
                    <el-switch v-model="addRuleForm.isDownload">
                    </el-switch>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AuthorityConfig",
        data(){
            return{
                dialogVisible:false,
                ruleForm:{
                    creator:"",
                    ruleData:[]
                },
                addRuleForm:{
                    object:"",
                    type:[],
                    isDownload:false
                },
                tableSettings: {
                    radio:false,//是否单选
                    checkbox: true,//是否多选，单选和多选同一时间只能存在一个
                    pagination:false,//是否显示分页
                    fields: [
                        {prop: "id", label: "id", sortable: false, visible: false},
                        {prop: "rule", label: "规则", sortable: true},
                        {prop: "object", label: "对象", sortable: true},
                        {prop: "authority", label: "权限", sortable: true}
                    ]
                }
            }
        },
        methods:{
            add(){
                this.dialogVisible = true;
            },
            remove(){}
        }
    }
</script>

<style scoped>
    .el-divider--horizontal{
        margin: 4px;
    }
</style>
