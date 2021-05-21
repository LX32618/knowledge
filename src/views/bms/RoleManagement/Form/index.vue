<template>
    <div>
        <el-form :model="formData" label-width="100px"  ref="roleForm">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="formData.roleName" style="width:203px"></el-input>
            </el-form-item>
            <el-form-item label="角色人员">
                <el-button type="primary" icon="el-icon-search" circle @click.native="peopleDialogVisible=true"></el-button>
                <el-tag
                        v-for="tag in formData.roles"
                        :key="tag.id"
                        closable
                        size="mini"
                        @close="closeTag(tag)"
                        type="danger">
                    {{tag.realName}}
                </el-tag>
            </el-form-item>
            <el-form-item label="角色权限">
                <el-select v-model="formData.permissions" multiple placeholder="请选择" ref="selection">
                    <el-option label="安选审计" value="axsj"></el-option>
                    <el-option label="系统管理" value="xtgl"></el-option>
                    <el-option label="知识管理" value="zsgl"></el-option>
                    <el-option label="安全保密" value="aqbm"></el-option>
                    <el-option label="SEG审核" value="seg"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div style="text-align:end">
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button @click="cancelForm">取消</el-button>
        </div>
        <el-dialog :visible.sync="peopleDialogVisible"  title="选择人员" append-to-body :close-on-click-modal="false" append-to-body>
            <people-transfer :iniList="formData.roles" @cancel="peopleCancel" @certain="peopleCertain"></people-transfer>
        </el-dialog>
    </div>
</template>

<script>
    import PeopleTransfer from "@/components/Transfer/PeopleTransfer";

    import _ from "lodash";

    export default {
        name: "RoleSelect",
        props:{
            type:{
                type:String,
                default:""
            },
            formData:{
                type:Object,
                default: ()=>{}
            }
        },
        data(){
            return {
                peopleDialogVisible:false,
            }
        },
        methods:{
            peopleCancel(){
                this.peopleDialogVisible = false;
            },
            peopleCertain(selectList){
                this.$set(this.formData,"roles",selectList);
                this.peopleDialogVisible = false;
            },
            closeTag(tag)
            {
                let index = this.formData.roles.findIndex(s=>{
                    return tag.id == s.id;
                });
                this.formData.roles.splice(index,1);
            },
            submitForm() {
                this.$refs["roleForm"].validate((valid) => {
                    if (valid) {
                        let data ={
                            id:this.formData.id,
                            roleName:this.formData.roleName,
                            permissionIds:this.formData.permissions.join(","),
                            permissionNames:_.map(this.$refs.selection.selected,"label").join(","),
                            userNames:_.map(this.formData.roles,"userName").join(","),
                            userIds:_.map(this.formData.roles,"id").join(","),
                            orgNames:_.map(this.formData.roles,"orgName").join(",")
                        }
                        this.$emit("submitSuccess",{type:this.type,data:data});
                    } else {
                        return false;
                    }
                });
            },
            cancelForm(){
                this.$emit("cancelSuccess",{type:this.type});
            }
        },
        components:{
            PeopleTransfer
        }
    }
</script>

<style scoped>

</style>
