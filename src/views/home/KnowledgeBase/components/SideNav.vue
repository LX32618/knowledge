<template>
  <el-card>
    <span slot="header">
      <i class="fa fa-database"></i>
      <span class="base-name" @click="handleTitleClick">
        {{ knowledgeBase.categoryName }}</span
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
import { mapGetters } from 'vuex'
import { getCategoryTree, getLablesTree } from '@/api/knowledge'
import _ from 'lodash'

export default {
  name: 'KnowledgeBaseSideNav',
  props: {
    knowledgeBase: Object,
    categories: Array,
    categoriesLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      treeOptions: {
        showCount: true
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  // watch: {
  //   knowledgeBase () {
  //     // 如果知识库id为空不更新树
  //     if (!this.knowledgeBase || !this.knowledgeBase.id) return
  //     // 更新树数据
  //     this.categoriesLoading = true
  //     fetchCategoryTreeAndNum({
  //       id: this.knowledgeBase.id,
  //       userId: this.userInfo.id
  //     }).then(res => {
  //       let data = res.content
  //       data = (unflatTree(data, this.knowledgeBase.id))
  //       // 类型为2的节点为叶子节点
  //       walkTree(data, item => {
  //         if (item.type === 2) {
  //           item.isLeaf = true
  //         }
  //       })
  //       this.categories = data
  //       this.categoriesLoading = false
  //     })
  //   }
  // },
  methods: {
    // 树节点被点击
    handleTreeNodeClick ({ data }) {
      this.$emit('selectCategory', _.pick(data, ['id', 'name', 'type', 'labelInfo', 'isSubscribe']))
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
