<template>
    <div class="box">
        <div class="top-nav">
            <div>
                <img src="@/assets/img/bms/logo.png"/>
            </div>
            <div>
                <el-badge is-dot class="item nav-badge">
                    <i class="el-icon-message-solid nav-icon"></i>
                </el-badge>
                <el-dropdown >
                    <el-button type="text" class="nav-btn">
                        <i class="el-icon-s-custom nav-icon"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item>双皮奶</el-dropdown-item>
                        <el-dropdown-item>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="body">
            <div class="sidebar">
                <div class="sidebar-content">
                    <cs-sidebar :default-active="defaultActive" :items="items" :basePath="basePath"></cs-sidebar>
                </div>
            </div>
            <div class="main">
                <div class="top">
                    <cs-breadcrumb :style="{marginTop:'8px',marginBottom:'8px'}"></cs-breadcrumb>
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
    import {sidebar} from "@/router/module/sidebar"

    export default {
        name: "LayOut",
        data(){
            return {
                defaultActive:this.$route.name,
                basePath:sidebar.path,
                items:sidebar.items
            };
        }
    }
</script>

<style scoped>
    @import './style.less';
</style>