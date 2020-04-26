<template>
    <div class="dict box">
        <div class="dict sidebar">

        </div>
        <div class="dict main">

        </div>

    </div>
</template>

<script>
    export default {
        name: "DictionaryData",
        data(){
            return{

            }
        },
        methods:{
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .dict.box{
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
    }
    .dict.sidebar{
        flex-basis: 15%;
    }
    .dict.main{
        flex-basis:85%;
    }
    .el-tabs--border-card{
        width:100%;
        border:0px;
    }
</style>