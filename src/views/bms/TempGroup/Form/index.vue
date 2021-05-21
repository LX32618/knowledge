<template>
    <div>
        <el-form :model="formData" label-width="100px">
            <el-form-item label="名称">
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
        <el-dialog :visible.sync="dialogVisible"  title="选择人员" append-to-body :close-on-click-modal="false" append-to-body>
            <people-transfer :iniList="selectList" @cancel="peopleCancel" @certain="peopleCertain"></people-transfer>
        </el-dialog>
    </div>
</template>

<script>
    import _ from "lodash"
    import PeopleTransfer from "@/components/Transfer/PeopleTransfer";

    export default {
        name: "TempForm",
        props:{
            type:{
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
            }
        },
        watch:{
            formData:{
                handler(newValue,oldValue){
                    let selects = [];
                    if(newValue.userIds){
                        let userIdArray = newValue.userIds.split(",");
                        let userNameArray = newValue.userNames.split(",");

                        for(let i = 0;i<userIdArray.length;i++)
                        {
                            let select = {};
                            select.id = userIdArray[i];
                            select.realName = userNameArray[i];
                            selects.push(select);
                        }
                    }

                    this.selectList = selects;
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
