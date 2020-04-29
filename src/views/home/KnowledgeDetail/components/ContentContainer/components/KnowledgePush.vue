<template>
  <el-card>
    <span slot="header">知识推送</span>
    <ul v-loading="isLoading">
      <li v-for="item of pushList" :key="item.id">
        <el-link @click="handleLinkClick(item.id)">{{ item.name }}</el-link>
      </li>
    </ul>
  </el-card>
</template>

<script>
import { fetchPushList } from '@/api/knowledge'

export default {
  name: 'KnowledgePush',
  data () {
    return {
      pushList: [],
      isLoading: false
    }
  },
  methods: {
    handleLinkClick (id) {
      const routeData = this.$router.resolve({
        name: "knowledgeDetail",
        params: {
          id,
        }
      });
      window.open(routeData.href, '_blank');
    }
  },
  mounted () {
    this.isLoading = true
    fetchPushList({ id: this.$route.params.id }).then(res => {
      const data = res.content
      this.pushList = data
      this.isLoading = false
    })
  }
}
</script>

<style scoped>
</style>
