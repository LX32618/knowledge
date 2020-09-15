<template>
  <div>
      <el-form :model="formData" label-width="100px" :rules="rules" ref="priorityForm">
          <el-form-item label="权限名称" prop="name">
              <el-input v-model="formData.name" style="width:203px"></el-input>
          </el-form-item>
          <el-form-item label="选择资源">
              <cs-tree ref="tree" :tree-options="formData.treeSettings" :data="treeData"></cs-tree>
          </el-form-item>
      </el-form>
      <div style="text-align:end">
          <el-button type="primary" @click="submitForm">保存</el-button>
          <el-button @click="">取消</el-button>
      </div>
  </div>
</template>

<script>
    export default {
        name: "index",
        props:{
            type:{
                type:String,
                default:""
            },
            formData:{
                type:Object,
                default:()=>{}
            }
        },
        data(){
            return {
                treeData:[
                    {
                        id:"szzx",
                        name:"设置中心",
                        showCheckBox:true,
                        children:[
                            {
                                id:"glysz",
                                name:"管理员设置",
                                showCheckBox:true
                            },{
                                id:"mjdqjcbg",
                                name:"密级定期检查报告",
                                showCheckBox:true
                            },
                        ]
                    },
                    {
                        id:"xtgl",
                        name:"系统管理",
                        showCheckBox:true,
                        children:[
                            {
                                id:"jsgl",
                                name:"角色管理",
                                showCheckBox:true
                            },
                        ]
                    },
                    {
                        id:"zsgl",
                        name:"知识管理",
                        showCheckBox:true,
                        children:[
                            {
                                id:"zssh",
                                name:"知识审核",
                                showCheckBox:true
                            },  {
                                id:"zsgly",
                                name:"知识管理员",
                                showCheckBox:true
                            }
                        ]
                    }
                ],
                rules:{
                    name:[
                        {required:true,message:"请填入权限名称",trigger:"blur"}
                    ]
                }
            }
        },
        methods:{
            submitForm(){
                this.$refs["priorityForm"].validate((valid) => {
                    if (valid) {
                        let data ={

                        }
                        this.$emit("submitSuccess",{type:this.type,data:data});
                    } else {
                        return false;
                    }
                });
            }
        },
        watch:{
            formData:{
                handler(newVal,oldVal){
                   let selectIds = newVal.treeSettings.default_checked_keys;
                   this.$refs["tree"].setCheckedKeys(selectIds);
                },
                deep:true
            }
        },

    }
</script>

<style scoped>

</style>
