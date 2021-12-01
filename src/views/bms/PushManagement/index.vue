<template>
   <!-- <div style="display: flex;flex-direction: row;justify-content: center;height:100%;min-height: 100vh">
        <div style="display:flex;flex-direction: column;justify-content: center">
           <div>
               <span>是否开启知识推送：</span>
               <el-switch v-model="pushFlag">
               </el-switch>
               <el-button type="primary" size="mini" style="float:right">保存</el-button>
           </div>
            <div>

            </div>
        </div>
    </div>-->
    <div style="margin-top: 20px;min-height: 100vh">
        <span>是否开启知识推送：</span>
        <el-switch v-model="pushFlag">
        </el-switch>
        <el-button type="primary" size="mini" style="margin-left: 30px;">保存</el-button>
    </div>
</template>

<script>
    export default {
        name: "PushManagement",
        data(){
            return{
                pushFlag:false
            }
        }
    }
</script>

<style scoped>

</style>
