<template>
    <div>
        <div v-for="form in formData">
            <el-divider content-position="left">{{form.formName}}</el-divider>
            <span>模板：<el-button type="primary" icon="el-icon-s-platform" circle @click="openModel(form.id)"></el-button></span>
        </div>
        <el-divider></el-divider>
        <el-dialog :visible.sync="dialogVisible" :fullscreen="true" :show-close="false" title="">
            <!-- <form-making :preview="true" :generateCode="true" :generateJson="true" :upload="true" :clearable="true"></form-making>-->
            <form-making ref="formMaking" :model-data="modelData" :category-id="categoryId"  class="formMaking" initial preview generate-json close save clearable @closeFormMaking="closeFormMaking" >
                <template slot="action">
                </template>
            </form-making>
        </el-dialog>
    </div>
</template>

<script>
    import _ from "lodash"

    export default {
        name: "Template",
        props:["formData","categoryId"],
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
              console.log(this.formData);
              this.modelData =  _.cloneDeep(this.formData.find(f=>f.id==id));
              this.dialogVisible = true;
            }
        },
        components:{

        },
        watch:{
            dialogVisible(val){
                this.$nextTick(()=>{
                    if(val)
                        this.$refs.formMaking.initialModelData();
                })
            }
        }
    }
</script>

<style scoped>
    .formMaking{
        height:100vh;
        margin-top: -50px;
    }
</style>
