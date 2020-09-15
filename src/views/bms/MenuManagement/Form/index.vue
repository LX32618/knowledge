<template>
    <div>
        <el-form :model="formData" label-width="100px" :rules="rules" ref="menuForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model="formData.name" style="width:203px"></el-input>
            </el-form-item>
            <el-form-item label="链接">
                <el-input v-model="formData.url" style="width:203px"></el-input>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="formData.sort" style="width:203px"></el-input-number>
            </el-form-item>
        </el-form>
        <div style="text-align:end">
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button @click="cancelForm">取消</el-button>
        </div>
    </div>
</template>

<script>

    import {saveMenu} from "@/api/menuManagement.js"

    export default {
        name: "index",
        data(){
            return{
                rules:{
                    name:[
                        {required:true,message:"请填入导航菜单名称",trigger:"blur"}
                    ]
                }
            }
        },
        props:{
            type:{
              type:String,
              default:"add"
            },
            formData:{
                type:Object,
                default:()=>{}
            }
        },
        methods:{
            submitForm(){
                this.$refs["menuForm"].validate((valid) => {
                    if (valid) {
                        let option ={
                            menuinfoId:this.formData.id,
                            menuinfoPid:this.formData.pid,
                            menuinfoName:this.formData.name,
                            menuinfoUrl:this.formData.url,
                            sort:this.formData.sort,
                            isEnable:0
                        }
                        saveMenu(option).then(resp=>{
                            if(resp.status == "success")
                            {
                                if("add" == this.type)
                                {
                                    this.$success("新增成功");
                                }
                                else
                                {
                                    this.$success("编辑成功");
                                }
                                this.$emit("submitSuccess",{type:this.type,data:resp.content});
                            }
                            else{
                                this.$error(resp.msg);
                            }
                        });

                    } else {
                        return false;
                    }
                });
            },
            cancelForm(){
                this.$emit("cancelSuccess");
            }
        }
    }
</script>

<style scoped>

</style>
