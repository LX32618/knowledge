<template>
  <div class="page">
    <div class="message-box">
      <h3>设备或人员秘级验证失败：无法访问信息资源库系统</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoPermission'
}
</script>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.message-box {
  color: red;
  text-align: center;
}
</style>
