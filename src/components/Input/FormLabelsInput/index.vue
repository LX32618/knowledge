<template>
  <cs-cat-tree-select
    ref="tree-select"
    v-bind="$attrs"
    v-model="model"
    :data="labels"
    :props="props"
    multiple
  ></cs-cat-tree-select>
</template>

<script>
import { getLabelesTree } from '@/api/docCategory'
import { unflatTree, walkTree } from '@/utils/tree'

export default {
  name: 'FormLabelsInput',
  props: {
    value: String,
    // 知识库目录
    classificationId: String,
  },
  data () {
    return {
      model: [],
      isLoading: false,
      labels: [],
      props: {
        key: 'id'
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        if (!val || typeof val !== 'string') {
          this.model = []
          return
        }
        this.model = val.split(',')
      },
      immediate: true
    },
    model (val) {
      if (val.length === 0) {
        this.$emit('input', '')
        return
      }
      this.$emit('input', val.join(','))
    },
    // 根据知识库目录生成可选标签集
    classificationId: {
      handler (val) {
        if (!val || val === '0') {
          return
        }
        this.isLoading = true;
        getLabelesTree({ id: this.classificationId }).then(res => {
          this.labels = this.convertLabelTree(res.content.labelInfo)
          this.$emit('loadingSuccess', this.labels)// 向上发出加载成功事件
          this.$refs['tree-select'].updateCheckedNodes()
          this.isLoading = false
        })
      },
      immediate: true
    }
  },
  methods: {
    // 转化标签树
    convertLabelTree (data) {
      if (data.length === 0) {
        return data
      }
      const result = data.slice(0)
      result.forEach(item => {
        item.label = item.name
        item.children = item.data
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