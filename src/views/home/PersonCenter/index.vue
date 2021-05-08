<template>
  <div class="container">
    <div class="wrapper">
      <!-- 面包屑导航条 -->
      <div class="nav-container">
        <i class="el-icon-location"></i> 当前位置：
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }" class="breadcurmb-text"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item class="breadcurmb-text"
            >个人中心</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>

      <el-row :gutter="20">
        <!-- 侧边栏 -->
        <el-col :span="6">
          <el-card>
            <!-- 头像、名称信息 -->
            <div class="sidebar-info">
              <el-avatar icon="el-icon-user-solid" :size="76"></el-avatar>
              <div class="info-wrapper">
                <p class="user-name">{{ userInfo.realName }}</p>
                <!-- <p class="user-department">
                  所属部门：{{ userInfo.department }}
                </p> -->
              </div>
            </div>
            <!-- 侧边栏菜单 -->
            <el-menu router :default-active="$route.path">
              <el-menu-item
                v-for="route in routes"
                :key="route.name"
                :index="`/personCenter/${route.path}`"
              >
                <i class="fa" :class="`fa-${route.meta.icon}`"></i>
                <span slot="title"> {{ route.meta.title }}</span>
              </el-menu-item>
            </el-menu>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card class="main-card">
            <router-view />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { personCenterRouter } from '@/router/module/home'

export default {
  name: 'PersonCenter',
  data () {
    return {
      headUrl: require('../../../assets/img/home/head.jpg'),
      routes: personCenterRouter
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: #ecf0f1;
  margin-top: 70px;
}
.wrapper {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 10px 0;
  font-size: 14px;
  line-height: 1;
  font-family: "PingFang SC";
}
.el-breadcrumb {
  display: inline-block;
}
.nav-container {
  margin-bottom: 10px;
}
.sidebar-info {
  height: 233px;
  text-align: center;
  background: url(../../../assets/img/home/user_background2.png) no-repeat;
  border-radius: 8px;
}
.el-avatar {
  margin-top: 40px;
  font-size: 36px;
}
.el-menu {
  width: 100%;
  text-align: center;
}
.info-wrapper {
  color: #fff;
  margin-top: 20px;
}
.user-name {
  font-size: 16px;
  font-weight: 600;
}
.user-department {
  font-size: 14px;
}
.main-card {
  height: 665px;
}
</style>
