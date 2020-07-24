<template>
    <el-tabs v-model="activeName"  type="border-card" :style="{height:'100%'}" @tab-click="tabClick">
        <el-tab-pane :key="0" label="基本信息" name="basic" >
            <basic :formData="formData" @submitSuccess="basicSubmitSuccess"></basic>
        </el-tab-pane>
        <el-tab-pane :key="1" label="表单配置" name="config" v-if="formData.formType==0" :disabled="formData.id==''">
            <config ref="configForm"></config>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import _ from 'lodash'
    import Basic from "./Basic";
    import Config from "./Config";

    export default {
        name: "Form",
        props:["formData"],
        data(){
            return{
                activeName:"basic",
                data:_.cloneDeep(this.formData),
            }
        },
        methods:{
            tabClick(tab){
                if(tab.name == "config")
                {
                    this.$refs.configForm.loadData(this.data.id);
                }
            },
            basicSubmitSuccess(val){

                this.$emit("submitSuccess",val);
            }

        },
        watch:{
            formData:{
                handler(newVal){
                    console.log(newVal);
                    this.data = _.cloneDeep(this.formData);
                    this.activeName = "basic";
                },
                deep:true
            }
        },
        components:{
            Basic,
            Config
        }
    }
</script>

<style scoped>
    .associatedForm{
        top:40px;
        left:-1px;
        z-index:999;
        max-height: 500px;
        border: 1px solid #E4E7ED;
        background-color:#fff
    }
    .el-input{
        width: 203px;
    }
    .operationNav{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .search{
        display: flex;
        margin:5px 5px 5px 0px;
    }
</style>
