<template>
    <DictionaryTag :rooturl="url" :category="category"></DictionaryTag>
</template>

<script>
    import DictionaryTag from "./DictionaryTag";
    export default {
        name: "Tag",
        components:{
            DictionaryTag
        },
        data(){
            return {
                url:'/api/tag/',
                category:'tag'
            }
        }
    }
</script>

<style scoped>
    .tag.box{
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
    }
    .tag.sidebar{
        flex-basis: 15%;
    }
    .tag.main{
        flex-basis:85%;
        margin-top:20px;
    }
    .el-tabs--border-card{
        width:100%;
        border:0px;
    }
</style>