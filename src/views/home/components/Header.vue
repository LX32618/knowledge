<template>
  <header class="header">
    <el-row class="header-content">
      <el-col :span="2">
        <img class="header-logo" src="@/assets/img/home/LOGO.png" />
      </el-col>
      <el-col :span="3" class="search-select">
        <!-- 搜索库筛选 -->
        <el-select
          v-model="searchFilter"
          placeholder="知识库"
          size="large"
          v-loading="isCategoriesLoading"
          value-key="id"
        >
          <el-option
            v-for="category of docCategories"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          ></el-option>
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
        <!-- <a href="#" class="header-help">帮助</a> -->
        <span class="header-placeholder"></span>
        <!-- 帮助 -->
        <el-tooltip placement="bottom">
          <i class="el-icon-help header-icon" @click="handleHelpIconClick"></i>
          <div slot="content">帮助</div>
        </el-tooltip>
        <!-- 全屏显示 -->
        <!-- <el-tooltip placement="bottom">
          <i class="el-icon-rank header-icon" @click="handleFullScreen"></i>
          <div slot="content">{{ fullScreen ? "取消全屏" : "全屏" }}</div>
        </el-tooltip> -->
        <!-- 消息提示 -->
        <el-tooltip placement="bottom" :disabled="toolTipDisable">
          <el-badge :value="`+${messages.length}`">
            <i class="el-icon-bell header-icon"></i>
          </el-badge>
          <div slot="content">
            <i class="el-icon-warning"></i>
            +{{ messages.length }}条消息 <br />
            <div
              class="message-content"
              v-for="(message, index) of messages"
              :key="message.id"
              @click="handleMessageClick(index, message)"
            >
              <i class="el-icon-message"></i>
              {{ message.title }}
            </div>
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
              ><i class="fa fa-reply" />退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <!-- 消息对话框 -->
    <el-dialog
      id="message-dialog"
      :visible.sync="dialogShow"
      :title="currentMessage.title"
    >
      <div>{{ currentMessage.createDate | dateTime }}</div>
      <div>{{ currentMessage.content }}</div>
      <span slot="footer">
        <el-button type="primary" @click="dialogShow = false"> 确定</el-button>
      </span>
    </el-dialog>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchMessages } from '@/api/user'
export default {
  name: 'HomeHeader',
  props: {
    isCategoriesLoading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'docCategories'
    ])
  },
  data () {
    return {
      searchStr: '',
      searchFilter: '',
      fullScreen: false, // 是否全屏,
      messages: [],
      dialogShow: false,
      currentMessage: {},
      toolTipDisable: false
    }
  },
  methods: {
    async handleCommand (cmd) {
      switch (cmd) {
        // 进入后台管理
        case 'manage':
          this.$router.push('/bms')
          break
        // 登出
        case 'logout':
          await this.$store.dispatch('user/logout')
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    },
    // 进入帮助页面
    handleHelpIconClick () {
      const routeData = this.$router.resolve({
        name: 'Working'
      })
      window.open(routeData.href, '_blank')
    },
    // 全屏事件（兼容各浏览器版本）
    handleFullScreen () {
      const element = document.documentElement
      if (this.fullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.fullScreen = !this.fullScreen
    },
    handleMessageClick (index, message) {
      // this.toolTipDisable = true
      // this.currentMessage = message
      // this.messages.splice(index, 1)
      // this.toolTipDisable = false
      // this.dialogShow = true
    }
  },
  mounted () {
    fetchMessages({ id: this.userInfo.id }).then(res => {
      this.messages = res.content
    })
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
.header-placeholder {
  height: 100%;
  line-height: 70px;
  position: relative;
}
.header-icon {
  font-size: 20px;
  height: 100%;
  cursor: pointer;
  position: relative;
  margin-left: 20px;
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
.message-content {
  margin-top: 10px;
  cursor: pointer;
}
</style>
