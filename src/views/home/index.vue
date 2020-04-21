<template>
  <div>
    <h1>Home</h1>
    <router-link to="bms">后台管理</router-link>
    <el-button @click="logout">登出</el-button>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
