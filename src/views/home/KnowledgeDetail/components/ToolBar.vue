<template>
  <div class="tool-bar">
    <el-button-group>
      <el-button type="success" icon="el-icon-s-home" @click="handleHomeClick"
        >首页</el-button
      >
      <el-button type="warning" icon="el-icon-star-off">收藏</el-button>
      <el-button type="primary" icon="el-icon-s-claim" @click="handleSubscribe">{{ isSubscribe ? '取消订阅' : '订阅'}}</el-button>
      <el-button type="danger" icon="el-icon-document-add">新建版本</el-button>
      <el-button type="info" icon="el-icon-document-copy">历史版本</el-button>
    </el-button-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { subscribe, cancelSubscribe } from '@/api/knowledgeSubscribe'

export default {
  name: 'ToolBar',
  props: {
    isSubscribe: Boolean
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    handleHomeClick () {
      this.$router.push('/')
    },
    // 订阅 / 取消订阅目录
    handleSubscribe () {
      const id = this.$route.params.id
      const userId = this.userInfo.id
      const text = `${this.isSubscribe ? '取消' : ''}订阅`
      if (this.isSubscribe) {
        cancelSubscribe({
          ids: `${id}-0`,
          userId
        }).then(() => {
          this.isSubscribe = false
          this.$success(`${text}成功`)
        }).catch(() => {
          this.$error(`${text}失败`)
        })
      } else {
        subscribe({
          id,
          userId,
          type: '0'
        }).then(() => {
          this.isSubscribe = true
          this.$success(`${text}成功`)
        }).catch(() => {
          this.$error(`${text}失败`)
        })
      }
    },
  },
  mounted () { }
}
</script>

<style scoped>
.tool-bar {
  position: absolute;
  top: 5px;
  left: 5px;
}
</style>
