<template>
    <el-upload :action="uploadUrl"
               :accept="acceptFiles"
               :limit="limit"
               :disabled="disabled"
               :file-list="fileList"
               :multiple="multiple"
               :auto-upload="autoUpload"
               :on-preview="handlePreview"
               :on-success="handleSuccess"
               :on-error="handleError"
               :on-remove="handleRemove"
               :before-remove="beforeRemove">
        <el-button size="small" type="primary" :disabled="disabled">{{btnTitle}}</el-button>
        <div slot="tip" class="el-upload__tip">{{tips}}</div>
    </el-upload>
</template>

<script>
    export default {
        name: "FileUpload",
        props:{
            uploadUrl: {
                type: String,
                default:""
            },
            accept:{
                type:Array,
                default:()=>[]
            },
            defaultAccept:{
                type:Array,
                default:()=>[]
            },
            limit:{
                type:Number,
                default:1
            },
            disabled:{
                type:Boolean,
                default:false
            },
            autoUpload:{
                type:Boolean,
                default:false
            },
            fileList:{
                type:Array,
                default:()=>[]
            },
            multiple:{
                type:Boolean,
                default:true
            },
            tips:{
              type:String,
              default:""
            },
            btnTitle:{
              type:String,
              default:""
            }
        },
        data(){
            return {

            }
        },
        computed:{
            acceptFiles(){
                return this.accept.map(a=>"."+a).join(",");
            }
        },
        methods:{
            handlePreview(file){//点击下载
                console.log("onPreview");
                console.log(file);
            },
            handleRemove(file, fileList){
                console.log(file, fileList);
            },
            beforeRemove(file, fileList){
                return this.$confirm(`确定移除${ file.name }？`);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择${this.limit}个文件，本次选择了 ${files.length}个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleSuccess(response, file, fileList){//上传成功
                console.log("onSuccess");
                console.log(response);
                console.log(file);
                console.log(fileList);
            },
            handleError(err, file, fileList){
                console.log("onError");
                console.log(err);
                console.log(file);
                console.log(fileList);
            },

        }
    }
</script>

<style scoped>

</style>
