<template>
  <div>
    <home-header :isCategoriesLoading="isLoading"></home-header>
    <knowledge-catalog></knowledge-catalog>
    <div>
      <div class="home-content">
        <home-knowledge-list></home-knowledge-list>
        <div class="right-area">
          <home-person-center></home-person-center>
          <home-history></home-history>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HomeHeader from './components/Header'
import KnowledgeCatalog from './components/KnowledgeCatalog'
import HomeKnowledgeList from './components/KnowledgeListWrapper'
import HomePersonCenter from './components/PersonCenter'
import HomeHistory from './components/History'

export default {
  name: 'HomePage',
  components: {
    HomeHeader,
    KnowledgeCatalog,
    HomeKnowledgeList,
    HomePersonCenter,
    HomeHistory
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
.home-content {
  width: 1200px;
  height: auto;
  margin: 40px auto;
}
.right-area {
  width: 346px;
  float: right;
}
</style>
