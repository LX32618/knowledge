<template>
  <header class="header">
    <el-row class="header-content">
      <el-col :span="2">
        <img class="header-logo" src="@/assets/img/home/LOGO.png" />
      </el-col>
      <el-col :span="3" class="search-select">
        <!-- 搜索库筛选 -->
        <el-select v-model="searchFilter" placeholder="知识库" size="large">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
      </el-col>
      <el-col :span="9" class="search-input">
        <!-- 搜索框 -->
        <el-input
          v-model="searchStr"
          placeholder="请输入你想搜索的内容"
          size="large"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2" :offset="2">
        <a href="#" class="header-help">帮助</a>
        <!-- <el-link class="header-help">帮助</el-link> -->
        <el-tooltip placement="bottom">
          <el-badge value="+0">
            <i class="el-icon-bell header-bell"></i>
          </el-badge>
          <div slot="content">
            <i class="el-icon-warning"></i>
            +0条消息
          </div>
        </el-tooltip>
      </el-col>
      <!-- 用户头像 -->
      <el-col :span="2">
        <img class="user-avator" src="@/assets/img/home/head.jpg" />
      </el-col>
      <!-- 用户名下拉菜单 -->
      <el-col :span="3">
        <el-dropdown class="user-name" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ userInfo.name }}<i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="manage"
              ><i class="el-icon-menu"></i>后台管理</el-dropdown-item
            >
            <el-dropdown-item command="center"
              ><i class="el-icon-user" />个人中心</el-dropdown-item
            >
            <el-dropdown-item command="logout"
              ><i class="el-icon-back"></i>退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HomeHeader',
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  data () {
    return {
      searchStr: '',
      searchFilter: ''
    }
  },
  methods: {
    async handleCommand (cmd) {
      switch (cmd) {
        case 'manage':
          this.$router.push('/bms')
          break
        case 'logout':
          await this.$store.dispatch('user/logout')
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  width: 100%;
  min-width: 1200px;
  height: 70px;
  top: 0px;
  left: 0px;
  background: #fff;
  z-index: 9;
}
.header-content {
  width: 1200px;
  height: 70px;
  margin: 0 auto;
}
.header-logo {
  margin-top: 12px;
}
.search-select {
  margin: 15px 0 0 20px;
}
.search-input {
  margin: 15px 0 0;
}
.header-help {
  font-size: 18px;
  height: 100%;
  line-height: 70px;
  position: relative;
  margin-right: 20px;
}
.header-bell {
  font-size: 18px;
  height: 100%;
  cursor: pointer;
  position: relative;
}
.user-avator {
  width: 46px;
  height: 46px;
  line-height: 70px;
  border-radius: 50%;
  margin: 10px 20px 0;
}
.user-name {
  line-height: 70px;
}
.el-dropdown-link {
  cursor: pointer;
}
</style>
