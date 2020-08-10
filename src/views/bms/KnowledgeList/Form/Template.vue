<template>
    <div>
        <div v-for="form in formData">
            <el-divider content-position="left">{{form.formName}}</el-divider>
            <span>模板：<el-button type="primary" icon="el-icon-s-platform" circle @click="openModel(form.id)"></el-button></span>
        </div>
        <el-divider></el-divider>
        <el-dialog :visible.sync="dialogVisible" :fullscreen="true" :show-close="false" title="">
            <!-- <form-making :preview="true" :generateCode="true" :generateJson="true" :upload="true" :clearable="true"></form-making>-->
            <form-making :model-data="modelData" style="height:100vh;margin-top: -50px" initial preview generate-json close save clearable @closeFormMaking="closeFormMaking" >
                <template slot="action">
                </template>
            </form-making>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: "Template",
        props:["formData"],
        data(){
            return{
                dialogVisible:false,
                modelData:{}
            }
        },
        methods:{
            closeFormMaking(){
                this.dialogVisible = false;
            },
            openModel(id){
              this.modelData =  this.formData.find(f=>f.id==id);
              this.dialogVisible = true;
            }
        },
        components:{

        }
    }
</script>

<style scoped>

</style>
