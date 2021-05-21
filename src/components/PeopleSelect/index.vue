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
                    {{tag.realName}}
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
                    {{tag.departName}}
                </el-tag>
            </el-form-item>
            <el-form-item v-if="form.object == 'group'" label="选择专业组">
                <el-select v-model="form.group" placeholder="请选择">
                    <template v-for="group in groupList">
                        <el-option :label="group.name" :value="group.id" :key="group.id"></el-option>
                    </template>
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
    import {fetchGroupList} from "@/api/group.js";
    import Template from "../../views/bms/KnowledgeList/Form/Template";

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
                groupList:[],
                selectList:[]
            }
        },
        methods:{
            objectChange(){
                console.log(this.groupList);
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
            },
            closeTag(tag)
            {
                let index = this.selectList.findIndex(s=>{
                    return tag.id == s.id;
                });
                this.selectList.splice(index,1);
            },
        },
        async mounted() {
            let option = {
                page:1,
                rows:10000,
                condition:{
                    name:""
                }
            };
            let resp = await fetchGroupList(option);
            this.groupList = resp.content.datas;
        },
        components:{
            Template,
            PeopleTransfer,
            DeptTransfer
        }
    }
</script>

<style scoped>

</style>
