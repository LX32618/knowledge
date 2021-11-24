<template>
<!--    <div class="box">
        <div class="top-nav">
            <v-header></v-header>
        </div>
        <div class="body" style="width: 100vw">
            <div class="sidebar">
                <div class="sidebar-content">
                    <cs-sidebar :default-active="defaultActive" :items="items" :basePath="basePath"></cs-sidebar>
                </div>
            </div>
            <div class="main">
                <div class="top">
                    <cs-breadcrumb></cs-breadcrumb>
                </div>
                <div class="content">
                    <transition name="el-fade-in">
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>
    </div>-->
    <el-container>
        <el-header style="background-color: #438EB9;">
            <v-header></v-header>
        </el-header>
        <el-container>
            <el-aside width="250px" style="border-right: 1px solid #DCDFE6;">
                <cs-sidebar :default-active="defaultActive" :items="items" :basePath="basePath"></cs-sidebar>
            </el-aside>
            <el-container style="height: 100vh; border-left: 1px solid #DCDFE6;">
                <el-header style="height: 20px;background-color: #F5F5F5;border-bottom: 1px solid #DCDFE6;">
                    <cs-breadcrumb></cs-breadcrumb>
                </el-header>
                <el-main style="padding: 0px;width: 100%">
                    <transition name="el-fade-in">
                        <router-view></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </el-container>

</template>

<script>
    //import {sidebar} from "@/router/module/sidebar"
    import vHeader from "./components/Header"

    export default {
        name: "LayOut",
        data(){
            return {
                defaultActive:this.$route.name,
                basePath:this.$store.state.routerMenu.sidebar.path,
                items:this.$store.state.routerMenu.sidebar.children
            };
        },
        components:{
            vHeader
        },
        mounted() {
            //console.log(this.$store.state.routerMenu.sidebar.children);
        }
    }
</script>

<style scoped>
    @import './style.less';


/*    .sidebar>div:first-child{
        border-right: 1px solid #DCDFE6;
        height:100%
    }*/


    .el-menu{
        border-right:0px !important;
    }
</style>
