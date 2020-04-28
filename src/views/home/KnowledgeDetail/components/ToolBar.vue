<template>
  <div class="tool-bar">
    <el-button-group>
      <el-button type="success" icon="el-icon-s-home" @click="handleHomeClick"
        >首页</el-button
      >
      <el-button type="warning" icon="el-icon-star-off">收藏</el-button>
      <el-button type="primary" icon="el-icon-s-claim">订阅</el-button>
      <el-button type="danger" icon="el-icon-document-add">新建版本</el-button>
      <el-button type="info" icon="el-icon-document-copy">历史版本</el-button>
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  methods: {
    handleHomeClick () {
      this.$router.push('/')
    }
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
