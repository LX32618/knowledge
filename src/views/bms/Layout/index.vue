<template>
    <div class="box">
        <div class="top-nav">
            <v-header></v-header>
        </div>
        <div class="body">
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
    </div>
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
            console.log(this.$store.state.routerMenu.sidebar.children);
        }
    }
</script>

<style scoped>
    @import './style.less';
</style>
