<template>
    <div style="margin-top: 20px;min-height: 100vh">
        <span>是否开启知识推送：</span>
        <el-switch v-model="pushSwitch">
        </el-switch>

        <el-divider content-position="left">规则权重配置</el-divider>
        <div>
            <el-row type="flex" class="row-bg">
                <el-col :span="6">知识名称：<el-input-number v-model="name" :step="0.01" :min="0"></el-input-number></el-col>
                <el-col :span="6">知识描述：<el-input-number v-model="describe" :step="0.01" :min="0"></el-input-number></el-col>
                <el-col :span="6">附件：<el-input-number v-model="attach_text" :step="0.01" :min="0"></el-input-number></el-col>
                <el-col :span="6">知识编码：<el-input-number v-model="keyword" :step="0.01" :min="0"></el-input-number></el-col>
            </el-row>
        </div>
        <br>
        <el-button type="primary" size="mini" style="float:right;margin-right: 50px" @click="saveEvent">保存</el-button>
    </div>
</template>

<script>

    import {fetchPushSwitch,updatePushSwitch} from "@/api/pushManagement.js"

    export default {
        name: "PushManagement",
        data(){
            return{
                pushSwitch:false,
                name:0,
                describe:0,
                attach_text:0,
                keyword:0
            }
        },
        methods:{
            async saveEvent(){
                let pushSwitch = this.pushSwitch?"true":"false";
                let name = this.name;
                let describe = this.describe;
                let attach_text = this.attach_text;
                let keyword = this.keyword;

                let option = [
                    {id:"pushSwitch",pushValue:pushSwitch},
                    {id:"name",pushValue:name},
                    {id:"describe",pushValue:describe},
                    {id:"attach_text",pushValue:attach_text},
                    {id:"keyword",pushValue:keyword},
                ];
                
                let resp = await updatePushSwitch(option);
                if(resp.status == "success")
                {
                    this.$success("保存成功");
                }
            }
        },
        async mounted() {
            let option = {id:""};
            let resp = await fetchPushSwitch(option);

            let pushSwitchList = resp.content.filter(r=>{
                return r.id == "pushSwitch";
            });
            this.pushSwitch = pushSwitchList[0].pushValue == "true";

            let nameList = resp.content.filter(r=>{
                return r.id == "name";
            });
            this.name = parseFloat(nameList[0].pushValue);

            let keywordList = resp.content.filter(r=>{
                return r.id == "keyword";
            });
            this.keyword = parseFloat(keywordList[0].pushValue);

            let describeList = resp.content.filter(r=>{
                return r.id == "describe";
            });
            this.describe = parseFloat(describeList[0].pushValue);

            let attachTextList = resp.content.filter(r=>{
                return r.id == "attach_text";
            });
            this.attach_text = parseFloat(attachTextList[0].pushValue);
        }
    }
</script>

<style scoped>

</style>
