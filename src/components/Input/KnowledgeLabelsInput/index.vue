<template>
  <div>
    <treeselect
      v-model="model"
      multiple
      :options="labels"
      placeholder="请选择知识标签"
      noResultsText="未找到目录"
      :disabled="disabled"
      disable-branch-nodes
      show-count
      v-loading="isLoading"
    >
      <span slot="option-label" slot-scope="{ node, count, shouldShowCount }"
        ><i class="fa" :class="labelIconClass(node)"></i>
        {{ node.label }}
        <span v-if="shouldShowCount"> ({{ count }})</span></span
      ></treeselect
    >
  </div>
</template>

<script>
import { getLablesTree } from '@/api/knowledge'
import { unflatTree, walkTree } from '@/utils/tree'

export default {
  name: 'KnowledgeLabelsInput',
  props: {
    value: {
      type: Array,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 知识库目录
    classificationid: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      model: this.convertObjectToId(this.value),
      labels: [],
      isLoading: false
    }
  },
  watch: {
    value (val) {
      this.model = val
    },
    model (val) {
      this.$emit('input', val)
    },
    // 根据知识库目录生成可选标签集
    classificationid: {
      handler (val) {
        if (!val) {
          return
        }
        this.isLoading = true
        getLablesTree({ classificationid: this.classificationid }).then(res => {
          let data = res.content
          data = unflatTree(data, 0) // 生成树
          // 格式化节点
          walkTree(data, item => {
            if (!item.children || item.children.length === 0) {
              item.children = undefined
            }
            return item
          })
          this.labels = data
          this.isLoading = false
        })
      },
      immediate: true
    },
  },
  methods: {
    // 转化为id数组
    convertObjectToId (objArray) {
      return objArray.map(item => item.id)
    },
    // 知识标签选择树图标显示
    labelIconClass (node) {
      if (node.isBranch) {
        return node.isExpanded ? 'fa-folder-open' : 'fa-folder'
      }
      return 'fa-bookmark'
    }
  }
}
</script>
