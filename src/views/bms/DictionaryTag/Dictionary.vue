<template>
    <DictionaryTag :rootUrl="url" :category="type"></DictionaryTag>
</template>

<script>
    import DictionaryTag from "./DictionaryTag";
    export default {
        name: "Dictionary",
        components:{
            DictionaryTag
        },
        data(){
            return {
                url:'/api/dictionary/',
                type:'dictionary'
            }
        }
    }
</script>

<style scoped>

</style>