<template>
    <div>
        <span style="font-size:17px">模板信息：<el-button type="primary" icon="el-icon-plus" circle @click="dialogVisible=true"></el-button></span>

        <el-dialog :visible.sync="dialogVisible" :fullscreen="true" :show-close="false" title="">
            <!-- <form-making :preview="true" :generateCode="true" :generateJson="true" :upload="true" :clearable="true"></form-making>-->
            <form-making style="height:100vh;margin-top: -50px" initial preview generate-json close save clearable @closeFormMaking="closeFormMaking" >
                <template slot="action">
                </template>
            </form-making>
        </el-dialog>
       <!-- <dict-select :type="'radio'" :dict-id="'76ACF600189647489831436CA030D2F4'" ></dict-select>-->
    </div>
</template>

<script>

    import FmLink from "@/components/FormMaking/Link"
    import DictSelect from "../../../../components/Input/DictSelect/index";

    export default {
        name: "Template",
        data(){
            return{
                dialogVisible:false,
                tagData:[]
            }
        },
        methods:{
            closeFormMaking(){
                this.dialogVisible = false;
            },
            tagClick(tag){
                console.log(tag)
            }
        },
        components:{
            DictSelect,
            FmLink
        }
    }
</script>

<style scoped>

</style>
