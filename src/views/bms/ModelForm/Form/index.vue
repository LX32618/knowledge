<template>
    <el-tabs v-model="activeName" type="border-card" :style="{height:'100%'}">
        <el-tab-pane :key="0" label="基本信息" name="basic">
            <el-form :rules="rules" ref="basicForm" label-width="100px">
                <el-form-item label="表单名称" prop="formname">
                    <el-input autocomplete="off" placeholder="请输入名称" v-model="data.formName"></el-input>
                </el-form-item>
                <el-form-item label="表单类型">
                    <el-select placeholder="--请选择--" v-model="data.formType" :disabled="formType=='edit'">
                        <el-option label="实体表单" value="entity"></el-option>
                        <el-option label="虚拟表单" value="virtual"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数据库表名" prop="tablename" >
                    <el-input autocomplete="off" v-model="data.tableName" :disabled="formType=='edit'"></el-input>
                </el-form-item>
                <el-form-item label="关联表单"><!--虚拟表单才有-->
                    <el-input autocomplete="off" v-model="data.associatedForm"></el-input>
                </el-form-item>
                <el-form-item label="所属知识库">
                    <el-select placeholder="--请选择--" v-model="data.base">
                        <el-option label="dsa" value="dsa"></el-option>
                        <el-option label="test" value="test"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="表单排序">
                    <el-input autocomplete="off" v-model="data.sort"></el-input>
                </el-form-item>
                <el-button type="primary" :style="{float:'right',marginTop:'-10px'}" @click="submitForm">保存</el-button>
            </el-form>
        </el-tab-pane>
        <el-tab-pane :key="1" label="表单配置" name="template">表单配置111</el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "Form",
        props:["formData","formType"],
        data(){
            return{
                activeName:"basic",
                data:this.formData,
                rules:{
                    formName:[
                        {required: true, message: "请输入表单名称", trigger: "blur"}
                    ],
                    tableName:[
                        {required: true, message: "请输入数据库表名", trigger: "blur"},
                        {required: true, message: "数据表必须以字母开头，只可包含字母、数字和下划线", trigger: "blur"}
                    ]
                }
            }
        },
        methods:{
            submitForm() {
                this.$refs['basicForm'].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.resetForm();
                    } else {
                        return false;
                    }
                });
            },
            resetForm() {
                this.$refs['basicForm'].resetFields();
            }
        },
        watch:{
            formData:{
                handler(newVal){
                    this.data=newVal;
                    console.log(this.data);
                },
                deep:true
            },
        },
    }
</script>

<style scoped>

</style>