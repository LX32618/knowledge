<template>
    <div>
        <el-form :model="formData" label-width="100px" :rules="rules" ref="parameterForm">
            <el-form-item label="名称" prop="display">
                <el-input v-model="formData.display" style="width:203px"></el-input>
            </el-form-item>
            <el-form-item label="标识" prop="pKey">
                <el-input v-model="formData.pKey" style="width:203px"></el-input>
            </el-form-item>
            <el-form-item label="值" prop="pValue">
                <el-input v-model="formData.pValue" style="width:203px"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input type="textarea" v-model="formData.remark"></el-input>
            </el-form-item>
        </el-form>
        <div style="text-align:end">
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button @click="canCelSubmit">取消</el-button>
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
                default: ()=>{}
            }
        },
        data(){
            return{
                rules: {
                    display:[
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                    pKey:[
                        {required: true, message: '请输入标识', trigger: 'blur'}
                    ],
                    pValue:[
                        {required: true, message: '请输入值', trigger: 'blur'}
                    ],
                }
            }
        },
        methods:{
            submitForm(){
                this.$emit("submitSuccess");
            },
            canCelSubmit(){
                this.$emit("cancelSubmit");
            }
        }
    }
</script>

<style scoped>

</style>
