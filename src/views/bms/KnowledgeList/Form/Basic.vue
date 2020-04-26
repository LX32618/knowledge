<template>
    <el-form :model="data" :rules="rules" ref="basicForm" :label-width="settings.lableWidth">
        <el-form-item label="名称"   prop="name">
            <el-input autocomplete="off" v-model="data.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="目录类型" v-if="data.catalogType!='root'" >
            <el-select  placeholder="请选择目录类型" v-model="data.catalogType" :disabled="settings.formType=='basic'">
                <el-option label="知识库" value="repository" v-if="settings.formType=='basic'"></el-option>
                <el-option label="分类" value="sort"></el-option>
                <el-option label="目录" value="catalog"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="关联表单"  v-if="data.catalogType=='catalog'">
            <el-input autocomplete="off" v-model="data.associatedForm"></el-input>
        </el-form-item>
        <el-form-item label="标签分类选择" v-if="data.catalogType=='catalog'">
            <el-input autocomplete="off" v-model="data.labelClassification"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" prop="viewSort">
            <el-input autocomplete="off" v-model.number="data.viewSort" placeholder="请输入显示顺序"></el-input>
        </el-form-item>
        <el-form-item label="密级">
            <el-select  placeholder="请选择密级" v-model="data.secrectLevel">
                <el-option label="非密" value="nonsecret"></el-option>
                <el-option label="内部" value="internal"></el-option>
                <el-option label="秘密" value="secret"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="知识库图片" v-if="data.catalogType=='root' || data.catalogType=='repository'">
            <el-input autocomplete="off" v-model="data.repositoryPicture"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
            <el-switch v-model="data.isEnabled"></el-switch>
        </el-form-item>
        <el-form-item label="是否开启邮件" v-if="data.catalogType=='catalog'">
            <el-switch v-model="data.isMailEnabled"></el-switch>
        </el-form-item>
        <el-form-item label="说明">
            <el-input type="textarea" v-model="data.description"></el-input>
        </el-form-item>
        <el-divider></el-divider>
        <p :style="{textIndent:'2em'}"><i class="element-icons el-custom-files"></i>(分类)：表示该目录类型下还可以添加子分类和目录，不能挂知识文档</p>
        <p :style="{textIndent:'2em'}"><i class="element-icons el-custom-file"></i>(目录)：表示该目录类型下不能再添加子目录和分类了，能够挂知识文档</p>
        <el-button type="primary" :style="{float:'right',marginTop:'-10px'}" @click="submitForm">保存</el-button>
    </el-form>
</template>

<script>
    import _ from 'lodash'
    export default {
        name: "Basic",
        props:{
            settings:{
                type: Object
            },
            formData:{
                type:Object,
                default: {
                    name:"",
                    catalogType:"",
                    associatedForm:"",
                    labelClassification:"",
                    viewSort:0,
                    secrectLevel:"internal",
                    repositoryPicture:"",
                    isEnabled:false,
                    isMailEnabled:"",
                    description:""
                }
            }
        },
        data(){
            return {
                data: _.cloneDeep(this.formData),
                rules: {
                    name: [
                        {required: true, message: "请输入名称", trigger: "blur"}
                    ],
                    viewSort: [
                        {required: true, message: "请输入显示顺序", trigger: "blur"},
                        {type: 'number', message: '请输入整数', trigger: 'blur'}
                    ]
                }
            }
        },
        watch:{
            formData:{
                handler(newVal,oldVal){
                    this.data = _.cloneDeep(newVal);
                },
                deep:true
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
        }
    }
</script>

<style scoped>

</style>