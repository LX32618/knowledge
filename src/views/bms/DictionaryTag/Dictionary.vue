<template>
    <DictionaryTag :get-url="getUrl" :edit-url="editUrl" :category="type"></DictionaryTag>
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
                getUrl:'/api2/dicTree/',
                editUrl:'/api2/treeNode/',
                type:'dictionary'
            }
        }
    }
</script>

<style scoped>

</style>