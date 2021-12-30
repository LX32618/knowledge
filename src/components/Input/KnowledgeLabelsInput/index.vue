<template>
  <div>
    <treeselect
      v-model="model"
      multiple
      :options="labels"
      placeholder="请选择知识标签"
      noResultsText="未找到标签"
      noOptionsText="未找到标签"
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
import { getLabelesTree } from '@/api/docCategory'
import { unflatTree, walkTree } from '@/utils/tree'

export default {
  name: 'KnowledgeLabelsInput',
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 知识库目录
    classificationid: {
      type: [String, Number],
      default: '0'
    },
    // 标签数据
    data: {
      type: Array,
      default: () => ({})
    }
  },
  data() {
    return {
      model: this.convertStringToIdArray(this.value),
      labels: this.convertLabelTree(this.data),
      isLoading: false
    }
  },
  watch: {
    value(val) {
      this.model = val
    },
    model: {
      handler(val) {
        this.$emit('input', val)
      },
      immediate: true
    },
    // 根据知识库目录生成可选标签集
    classificationid: {
      handler(val) {
        if (!val || val === '0') {
          return
        }
        this.isLoading = true
        getLabelesTree({ id: this.classificationid }).then(res => {
          this.labels = this.convertLabelTree(res.content.labelInfo)
          this.$emit('loadingSuccess', this.labels) // 向上发出加载成功事件
          this.isLoading = false
        })
      },
      immediate: true
    },
    data() {
      if (this.classificationid) {
        return
      }
      this.labels = this.convertLabelTree(this.data)
    }
  },
  methods: {
    // 转化为id数组
    convertStringToIdArray(objArray) {
      if (!objArray || objArray.length === 0) {
        return []
      }
      return objArray.map(item => item.id)
    },
    // 知识标签选择树图标显示
    labelIconClass(node) {
      if (node.isBranch) {
        return node.isExpanded ? 'fa-folder-open' : 'fa-folder'
      }
      return 'fa-bookmark'
    },
    // 转化标签树
    convertLabelTree(data) {
      if (data.length === 0) {
        return data
      }
      const result = data.slice(0)
      result.forEach(item => {
        item.label = item.name
        item.children = item.datas
        if (item.children) {
          item.children.forEach(subItem => {
            subItem.label = subItem.name
          })
        }
      })
      return result
    }
  }
}
</script>
