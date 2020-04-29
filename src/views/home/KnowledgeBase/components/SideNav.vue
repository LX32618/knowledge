<template>
  <el-card>
    <span slot="header">
      <i class="fa fa-database"></i>
      <span class="base-name" @click="handleTitleClick">
        {{ knowledgeBase.name }}</span
      >
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
        let data = res.content
        this.categories = (unflatTree(data, 0))[0].children
        this.categoriesLoading = false
      })
    }
  },
  methods: {
    // 树节点被点击
    handleTreeNodeClick ({ data }) {
      this.$emit('selectCategory', _.pick(data, ['id', 'name', 'type']))
    },
    // 标题被点击
    handleTitleClick () {
      this.$emit('selectCategory', this.knowledgeBase)
    }
  }
}
</script>

<style scoped>
.base-name {
  cursor: pointer;
}
</style>
