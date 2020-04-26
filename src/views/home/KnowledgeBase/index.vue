<template>
  <div class="container" v-if="currentKnowledgeBase" v-loading="isLoading">
    <div class="nav-container">
      <i class="el-icon-location"> </i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{
          this.currentKnowledgeBase.categoryName
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { errorMsg } from '@/utils/msg'
export default {
  name: 'KnowledgeBase',
  props: {
    id: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      currentKnowledgeBase: {},
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'docCategories'
    ])
  },
  async mounted () {
    this.isLoading = true
    await this.$store.dispatch('docCategory/fetchCategories')
    this.isLoading = false
    this.currentKnowledgeBase = this.docCategories.find(item => item.id == this.id)
    if (!this.currentKnowledgeBase) {
      this.$router.push('/')
      errorMsg('知识库不存在，请刷新再尝试')
      return
    }
    document.title = `${this.currentKnowledgeBase.categoryName} | 知识工程`
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: #ecf0f1;
  margin-top: 90px;
}
.nav-container {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 5px 0;
}
.el-breadcrumb {
  display: inline-block;
}
</style>