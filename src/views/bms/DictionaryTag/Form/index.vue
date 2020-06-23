<template>
    <el-form :model="data" :rules="rules" ref="form" :label-width="settings.lableWidth">
        <el-form-item label="名称"   prop="name">
            <el-input autocomplete="off" v-model="data.name" placeholder="请输入名称" :disabled="!settings.request"></el-input>
        </el-form-item>
        <el-form-item label="描述">
            <el-input autocomplete="off" v-model="data.data.describe" :disabled="!settings.request"></el-input>
        </el-form-item>
        <el-form-item label="排序">
            <el-input autocomplete="off" v-model.number="data.data.sort" :disabled="!settings.request"></el-input>
        </el-form-item>
        <el-form-item label="预留字段一">
            <el-input autocomplete="off" v-model="data.data.field_900" :disabled="!settings.request"></el-input>
        </el-form-item>
        <el-form-item label="预留字段二">
            <el-input autocomplete="off" v-model="data.data.field_901" :disabled="!settings.request"></el-input>
        </el-form-item>
        <el-form-item label="预留字段三">
            <el-input autocomplete="off" v-model="data.data.field_902" :disabled="!settings.request"></el-input>
        </el-form-item>
        <slot name="operation"></slot>
    </el-form>
</template>

<script>
    import _ from 'lodash';
    import request from '@/utils/request'

    export default {
        name: "From",
        props:{
            settings:{
                type:Object
            },
            formData:{
                type:Object,
                default:()=>{return {
                    pid:"",
                    id:"",
                    name:"",
                    data:{
                        describe: "",
                        sort: 0,
                        field_900: "",
                        field_901: "",
                        field_902: ""
                    }
                }}
            }
        },
        data(){
            return {
                data:{},
                rules: {
                    name: [
                        {required: true, message: "请输入名称", trigger: "blur"}
                    ]
                }
            }
        },
        watch:{
            formData:{
                handler(newVal,oldVal){
                    this.data = _.cloneDeep(newVal);
                },
                deep:true,
                immediate:true
            }
        },
        methods:{
            submitForm() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        request({
                            url: this.settings.request.url,
                            method: this.settings.request.method,
                            data:this.data
                        }).then(data=>{
                            if(data.status == "success")
                            {
                                this.$success("保存成功");
                                this.$emit("submitSuccess",{type:this.settings.type,data:this.data});
                            }
                            else{
                                this.$error(data.message);
                            }

                        });
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>