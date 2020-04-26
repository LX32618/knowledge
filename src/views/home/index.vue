<template>
  <div>
    <home-header :isCategoriesLoading="isLoading"></home-header>
    <router-view />
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
  data () {
    return {
      isLoading: false,
      categories: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'docCategories'
    ])
  },
  methods: {
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  },
  async mounted () {
    this.isLoading = true
    await this.$store.dispatch('docCategory/fetchCategories')
    this.isLoading = false
  }
}
</script>

<style scoped>
</style>
