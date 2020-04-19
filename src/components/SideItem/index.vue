<template>
    <div v-if="item.children">
        <el-submenu :index="item.name">
            <template slot="title"><i v-if="item.icon" :class="item.icon"></i>{{item.meta.title}}</template>
            <cs-sideitem v-for="child in item.children" :item="child" :basePath="basePath"></cs-sideitem>
        </el-submenu>
    </div>

    <router-link v-else :to="resolvePath(item.path)"><el-menu-item :index="item.name">{{item.meta.title}}</el-menu-item></router-link>
</template>

<script>
    import path from 'path'
    import url from 'url'
    export default {
        name: "SideItem",
        props:{
            basePath:{type:String,default:''},
            item:{type:Object,required:true}},
        data(){
            return {
            };
        },
        methods:{
            resolvePath(routePath){
                return path.join(this.basePath,routePath);
            }
        }
    }
</script>

<style scoped>
    a{
        text-decoration:none
    }
    .router-link-exact-active>li
    {
        color:#409eff
    }
</style>