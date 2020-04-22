<template>
  <div>
    <home-header></home-header>
    <router-link to="bms">后台管理</router-link>
    <el-button @click="logout">登出</el-button>
    {{ userInfo }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HomeHeader from './components/Header'

export default {
  name: 'HomePage',
  components: {
    HomeHeader
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
