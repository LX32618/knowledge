<template>
    <div>
        <el-form :model="form" label-width="100px">
            <el-form-item label="选择对象">
                <el-select v-model="form.object" placeholder="请选择" @change="objectChange">
                    <el-option label="指定人员" value="people"></el-option>
                    <el-option label="指定部门" value="dept"></el-option>
                    <el-option label="指定专业组" value="group"></el-option>
                    <el-option label="全部人员" value="allpeople"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="form.object == 'people'" label="选择人员">
                <el-button type="primary" icon="el-icon-search" circle @click.native="peopleDialogVisible=true"></el-button>
                <el-tag
                        v-for="tag in selectList"
                        :key="tag.id"
                        closable
                        @close="closeTag(tag)"
                        type="danger">
                    {{tag.userName}}
                </el-tag>

            </el-form-item>
            <el-form-item v-if="form.object == 'dept'" label="选择部门">
                <el-button type="primary" icon="el-icon-search" circle @click.native="deptDialogVisible=true"></el-button>
                <el-tag
                        v-for="tag in selectList"
                        :key="tag.id"
                        closable
                        @close="closeTag(tag)"
                        type="danger">
                    {{tag.orgName}}
                </el-tag>
            </el-form-item>
            <el-form-item v-if="form.object == 'group'" label="选择专业组">
                <el-select v-model="form.group" placeholder="请选择">
                    <el-option label="x1项目组" value="x1"></el-option>
                    <el-option label="x2项目组" value="x2"></el-option>
                    <el-option label="x3项目组" value="x3"></el-option>
                    <el-option label="x4项目组" value="x4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="权限类型" v-if="priority">
                <el-select v-model="form.type" multiple placeholder="请选择">
                    <el-option label="查看" value="view"></el-option>
                    <el-option label="编辑" value="edit"></el-option>
                    <el-option label="创建" value="create"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="可下载" v-if="priority && form.type.indexOf('view')!=-1">
                <el-switch v-model="form.isDownload">
                </el-switch>
            </el-form-item>
        </el-form>
        <slot name="operationSlot"></slot>
        <el-dialog :visible.sync="deptDialogVisible"  title="选择部门" append-to-body :close-on-click-modal="false" append-to-body>
            <dept-transfer @cancel="deptCancel" @certain="deptCertain"></dept-transfer>
        </el-dialog>
        <el-dialog :visible.sync="peopleDialogVisible"  title="选择人员" append-to-body :close-on-click-modal="false" append-to-body>
            <people-transfer @cancel="peopleCancel" @certain="peopleCertain"></people-transfer>
        </el-dialog>
    </div>
</template>

<script>
    import PeopleTransfer from "../Transfer/PeopleTransfer";
    import DeptTransfer from "../Transfer/DeptTransfer";
    export default {
        name: "PeopleSelect",
        props:{
            form:{
                type:Object,
                default: ()=>{}
            },
            priority:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                deptDialogVisible:false,
                peopleDialogVisible:false,
                selectList:[]
            }
        },
        methods:{
            objectChange(){
                this.selectList = [];
            },
            deptCancel(){
                this.deptDialogVisible = false;
            },
            deptCertain(selectList){
                this.selectList = selectList;
                this.deptDialogVisible = false;
            },
            peopleCancel(){
                this.peopleDialogVisible = false;
            },
            peopleCertain(selectList){
                this.selectList = selectList;
                this.peopleDialogVisible = false;
            }
        },
        components:{
            PeopleTransfer,
            DeptTransfer
        }
    }
</script>

<style scoped>

</style>
