<template>
    <div class="header-content" v-if="userInfo">
        <h2 style="color:white;margin-left:20px">信息资源库</h2>
        <div class="user-info">
<!--            <el-tooltip class="header-tool-tip" placement="bottom">
                <el-badge value="+0">
                    <i class="el-icon-bell header-bell"></i>
                </el-badge>
                <div slot="content">
                    <i class="el-icon-warning"></i>
                    +0条消息
                </div>
            </el-tooltip>-->
            <el-avatar class="user-avator" :size="40" icon="el-icon-user-solid"></el-avatar>
            <el-dropdown class="user-name" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ userInfo.name }}<i class="el-icon-caret-bottom"></i>
                    </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="home" >
                        <i class="el-icon-s-home"></i>主页</el-dropdown-item>
                    <el-dropdown-item command="center">
                        <i class="el-icon-user" />个人中心
                    </el-dropdown-item>
                    <el-dropdown-item command="logout">
                        <i class="fa fa-reply" />退出登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Header",
        data(){
            return {
                avatar_url:require("@/assets/img/home/head.jpg")
            };
        },
        computed: {
            ...mapGetters([
                'userInfo'
            ])
        },
        methods: {
            async handleCommand(cmd) {
                switch (cmd) {
                    // 进入后台管理
                    case 'home':
                        this.$router.push('/');
                        break;
                    case  'center':
                        this.$router.push('/personCenter');
                        break;
                    // 登出
                    case 'logout':
                        this.$store.commit('user/REMOVE_TOKEN')
                        window.location.href=`http://glaway.soft.net/cas/logout?ssologin=${window.location.href}/knowledge`
                }
            }
        }
    }
</script>

<style scoped>
    .header-content{
        display: flex;
        justify-content:space-between;
        width:100%;
    }
    .header-logo{
        margin-top: 5px;
        margin-left: 10px;
        margin-bottom: 5px;
    }
    .user-info{
        display: flex;
        justify-content:space-between;
        align-items: center;
        margin-right: 10px;
    }
    .header-tool-tip{
        color:white;
        margin-right: 30px;
    }
    .header-bell{
        cursor: pointer;
        font-size: 20px;
    }
    .header-avatar{
        margin-right: 10px;
    }
    .user-name{
        cursor: pointer;
        color:white;
    }
</style>
