<template>
    <div>
        <el-form :model="data" :rules="rules" ref="peopleSelectForm" label-width="100px">
            <el-form-item label="选择对象">
                <el-select v-model="data.object" placeholder="请选择" @change="objectChange">
                    <el-option label="指定人员" value="1"></el-option>
                    <el-option label="指定部门" value="2"></el-option>
                    <el-option label="指定专业组" value="3"></el-option>
                    <el-option label="全部人员" value="99"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="data.object == '1'" label="选择人员" id="itemPeople">
                <el-button type="primary" icon="el-icon-search" circle @click.native="peopleDialogVisible=true"></el-button>
                <el-tag
                        v-for="tag in selectList"
                        :key="tag.id"
                        closable
                        @close="closeTag(tag)"
                        type="danger">
                    {{tag.realName}}
                </el-tag>
                <div style="font-size: 12px;color:#F56C6C;" v-if="itemPeopleTip">
                    请选择人员
                </div>
            </el-form-item>
            <el-form-item v-if="data.object == '2'" label="选择部门" id="itemDept">
                <el-button type="primary" icon="el-icon-search" circle @click.native="deptDialogVisible=true"></el-button>
                <el-tag
                        v-for="tag in selectList"
                        :key="tag.id"
                        closable
                        @close="closeTag(tag)"
                        type="danger">
                    {{tag.departName}}
                </el-tag>
                <div style="font-size: 12px;color:#F56C6C;" v-if="itemDeptTip">
                    请选择部门
                </div>
            </el-form-item>
            <el-form-item v-if="data.object == '3'" label="选择专业组" id="itemGroup">
                <el-select v-model="data.group" placeholder="请选择" value-key="id" filterable>
                    <template v-for="group in groupList">
                        <el-option :label="group.name" :value="group" :key="group.id"></el-option>
                    </template>
                </el-select>
                <div style="font-size: 12px;color:#F56C6C;" v-if="itemGroupTip">
                    请选择专业组
                </div>
            </el-form-item>
            <el-form-item label="权限类型" v-if="priority" prop="type">
                <el-select v-model="data.type" multiple placeholder="请选择">
                    <el-option label="查看" value="4"></el-option>
                    <el-option label="编辑" value="2"></el-option>
                    <el-option label="创建" value="999"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="可下载" v-if="false"><!--v-if="priority && data.type.indexOf('4')!=-1"-->
                <el-switch v-model="data.download" active-value="1" inactive-value="0">
                </el-switch>
            </el-form-item>
        </el-form>
        <div style="text-align: end">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
        <el-dialog :visible.sync="deptDialogVisible"  title="选择部门" append-to-body :close-on-click-modal="false" append-to-body>
            <dept-transfer @cancel="deptCancel" @certain="deptCertain" :ini-list="selectList"></dept-transfer>
        </el-dialog>
        <el-dialog :visible.sync="peopleDialogVisible"  title="选择人员" append-to-body :close-on-click-modal="false" append-to-body>
            <people-transfer @cancel="peopleCancel" @certain="peopleCertain" :ini-list="selectList"></people-transfer>
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
            formData:{
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
                rules:{
                    type:[
                        { type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
                    ]
                },
                data:{},
                deptDialogVisible:false,
                peopleDialogVisible:false,
                groupList:[],
                selectList:[]
            }
        },
        computed:{
            itemPeopleTip(){
                if(this.data.object == '1'){
                    return this.selectList.length == 0;
                }
                return false;
            },
            itemDeptTip(){
                if(this.data.object == '2'){
                    return this.selectList.length == 0;
                }
                return false;
            },
            itemGroupTip(){
                if(this.data.object == '3'){
                   if(!this.data.group)
                   {
                       return true;
                   }
                }
                return false;
            },
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
            },
            closeTag(tag)
            {
                let index = this.selectList.findIndex(s=>{
                    return tag.id == s.id;
                });
                this.selectList.splice(index,1);
            },
            cancel(){
                this.$emit("cancelSuccess");
                this.selectList = [];
            },
            submit(){
                this.$refs["peopleSelectForm"].validate((valid) => {
                    if (valid) {
                        if(!this.itemPeopleTip&&!this.itemDeptTip&&!this.itemGroupTip)
                        {
                            let selectList = _.cloneDeep(this.selectList)
                            this.$emit("submitSuccess",{formData:this.data,selectList:selectList});
                            this.selectList = [];
                        }
                        else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                });

            }
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
        watch:{
            formData:{
                handler(newVal){
                    this.data= _.cloneDeep(newVal);

                    /*                if(this.$refs['basicForm'])//排除第一次加载组件时的情形
                                        this.$refs['basicForm'].clearValidate();//切换的时候清空校验规则*/
                },
                deep:true,
                immediate:true
            }
        },
        components:{
            Template,
            PeopleTransfer,
            DeptTransfer
        }
    }
</script>

<style>
    #itemPeople .el-form-item__label:before,
    #itemDept .el-form-item__label:before,
    #itemGroup .el-form-item__label:before{
        content: '*';
        color: #F56C6C;
        margin-right: 4px;
    }
</style>
