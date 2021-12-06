<template>
    <div style="margin-top: 20px;min-height: 100vh">
        <span>是否开启知识推送：</span>
        <el-switch v-model="pushFlag">
        </el-switch>
        <el-button type="primary" size="mini" style="margin-left: 30px;" @click="saveEvent">保存</el-button>
    </div>
</template>

<script>

    import {fetchPushSwitch,updatePushSwitch} from "@/api/pushManagement.js"

    export default {
        name: "PushManagement",
        data(){
            return{
                pushFlag:false
            }
        },
        methods:{
            async saveEvent(){
                let pushValue = this.pushFlag?"true":"false";
                let option = {id:"pushSwitch",pushValue:pushValue};
                let resp = await updatePushSwitch(option);
                if(resp.status == "success")
                {
                    this.$success("保存成功");
                }
            }
        },
        async mounted() {
            let option = {id:"pushSwitch"};
            let resp = await fetchPushSwitch(option);
            this.pushFlag = resp.content.pushValue == "true";
            console.log(resp);
        }
    }
</script>

<style scoped>

</style>
