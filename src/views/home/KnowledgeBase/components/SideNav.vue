<template>
  <el-card>
    <span slot="header">
      <i class="fa fa-database"></i> {{ knowledgeBase.name }}
    </span>
    <div class="tree-container" v-loading="categoriesLoading">
      <cs-tree
        :data="categories"
        :treeOptions="treeOptions"
        @treeNodeClick="handleTreeNodeClick"
      >
      </cs-tree>
    </div>
  </el-card>
</template>

<script>
import { getCategoryTree, getLablesTree } from '@/api/knowledge'
import { unflatTree } from '@/utils/tree.js'
import _ from 'lodash'

export default {
  name: 'KnowledgeBaseSideNav',
  props: {
    knowledgeBase: Object
  },
  data () {
    return {
      categories: [],
      treeOptions: {
        showCount: true
      },
      categoriesLoading: false
    }
  },
  watch: {
    knowledgeBase () {
      if (!this.knowledgeBase || !this.knowledgeBase.id) return
      this.categoriesLoading = true
      getCategoryTree({ id: this.knowledgeBase.id }).then(res => {
        let data = res.data
        this.categories = (unflatTree(data, 0))[0].children
        this.categoriesLoading = false
      })
    }
  },
  methods: {
    handleTreeNodeClick ({ data }) {
      this.$emit('selectCategory', _.pick(data, ['id', 'name', 'type']))
    }
  }
}
</script>

<style scoped>
</style>
