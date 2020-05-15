<template>
    <el-form :model="data" :rules="rules" ref="basicForm" label-width="100px"  >
        <el-form-item label="显示名称" prop="displayName">
            <el-input autocomplete="off" placeholder="请输入显示名称" v-model="data.displayName"></el-input>
        </el-form-item>
        <el-form-item label="字段名称">
            <el-input autocomplete="off" placeholder="请输入字段名称" v-model="data.fieldName"></el-input>
        </el-form-item>
        <el-form-item label="显示类型">
            <el-select placeholder="--请选择--" v-model="data.htmlTypeId">
                <el-option label="文本框" value="0"></el-option>
                <el-option label="单选框" value="1"></el-option>
                <el-option label="复选框" value="2"></el-option>
                <el-option label="下拉列表" value="3"></el-option>
                <el-option label="附件" value="4"></el-option>
                <el-option label="图片" value="5"></el-option>
                <el-option label="浏览按钮单选" value="6"></el-option>
                <el-option label="浏览按钮多选" value="7"></el-option>
                <el-option label="复选框组" value="8"></el-option>
                <el-option label="多行文本" value="9"></el-option>
                <el-option label="富文本" value="10"></el-option>
                <el-option label="日期" value="11"></el-option>
                <el-option label="超链接" value="13"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="字段类型">
            <el-select placeholder="--请选择--"><!--编辑或者子表新增时不能修改-->
                <el-option label="文本" value="0"></el-option>
                <el-option label="整数" value="1"></el-option>
                <el-option label="小数" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="字段长度">
            <el-input autocomplete="off"  v-model="data.fieldLength"></el-input>
        </el-form-item>
        <el-form-item label="是否可多选">
            <el-switch v-model="data.isMulti"  active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="默认高度">
            <el-input autocomplete="off"  v-model="data.height"></el-input>
        </el-form-item>
        <el-form-item label="默认宽度">
            <el-input autocomplete="off"  v-model="data.width"></el-input>
        </el-form-item>
        <el-form-item label="字段验证">
            <el-input autocomplete="off"  v-model="data.fieldCheck"></el-input>
        </el-form-item>
        <el-button type="primary" class="saveBtn"  @click="submitForm">保存</el-button>
    </el-form>
</template>

<script>
    export default {
        name: "Field",
        data(){
            return {
                data:{}
            }
        },
        methods:{
            submitForm(){

            }
        }
    }
</script>

<style scoped>

</style>