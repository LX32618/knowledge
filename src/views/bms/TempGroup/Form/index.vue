<template>
    <div>
        <el-form :model="formData" :rules="rules" label-width="100px">
            <el-form-item label="名称" prop="name">
                <el-input  v-model="formData.name" style="width:203px"></el-input>
            </el-form-item>
            <el-form-item label="人员">
                <el-button type="primary" icon="el-icon-search" circle @click.native="dialogVisible=true"></el-button>
                <el-tag
                        v-for="tag in selectList"
                        :key="tag.id"
                        closable
                        @close="closeTag(tag)"
                        type="danger">
                    {{tag.realName}}
                </el-tag>
            </el-form-item>
        </el-form>
        <div style="text-align:end">
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button @click="cancelForm">取消</el-button>
        </div>
        <el-dialog :visible.sync="dialogVisible"  title="选择人员" append-to-body :close-on-click-modal="false" append-to-body>
            <people-transfer :iniList="selectList" @cancel="peopleCancel" @certain="peopleCertain"></people-transfer>
        </el-dialog>
    </div>
</template>

<script>
    import _ from "lodash"
    import PeopleTransfer from "@/components/Transfer/PeopleTransfer";
    import {saveGroupList} from "@/api/group.js"

    export default {
        name: "TempForm",
        props:{
            actionType:{
                type:String,
                default:"add"
            },
            formData:{
                type:Object,
                default:() => {}
            }
        },
        data(){
            return {
                dialogVisible:false,
                selectList:[],
                rules:{
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            closeTag(tag)
            {
                let index = this.selectList.findIndex(s=>{
                    return tag.id == s.id;
                });
                this.selectList.splice(index,1);
            },
            peopleCancel(){
                this.dialogVisible = false;
            },
            peopleCertain(selectList){
                this.selectList = selectList;
                this.dialogVisible = false;
            },
            async submitForm(){
                let user = this.selectList.map(item=>{
                    return {id:item.id,name:item.realName};
                })

                let option = {
                    id:this.formData.id,
                    name:this.formData.name,
                    user:user
                };

                let resp = await saveGroupList(option);
                let row = _.pick(resp.content, ['id', 'name','userInfo']);

                this.$emit("submitSuccess",{actionType:this.actionType,row:row});
            },
            cancelForm(){
                this.$emit("cancelSuccess",{actionType:this.actionType});
            }
        },
        watch:{
            formData:{
                handler(newValue,oldValue){
                    this.selectList = newValue.userInfo;
                },
                immediate:true
            }
        },
        components:{
            PeopleTransfer
        }
    }
</script>

<style scoped>

</style>
