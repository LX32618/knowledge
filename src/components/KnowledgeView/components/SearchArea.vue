<template>
  <div>
    <dynamic-form ref="dynamic-form" :data="searchOption" :formConfig="formConfig" :fields="fields" @submit="handleSumbit">
      <!-- 功能按钮组 -->
      <el-form-item class="button-area">
        <el-button type="success" icon="el-icon-search" @click="handleSearch">查询</el-button>
        <el-button type="info" icon="el-icon-refresh" @click="handleReset">重置</el-button>
        <template v-if="selectedCategory.type === 2">
          <el-button type="danger" icon="el-icon-circle-plus" @click="handleAdd">添加</el-button>
          <el-button @click="handleSubscribe" :type="isSubscribe ? 'warning' : 'primary'">
            <template v-if="isSubscribe">
              <i class="el-icon-s-release"></i> 取消订阅
            </template>
            <template v-else> <i class="el-icon-s-claim"></i> 订阅 </template>
          </el-button>
        </template>
      </el-form-item>
    </dynamic-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { subscribe, cancelSubscribe } from '@/api/knowledgeSubscribe'
import DynamicForm from './DynamicForm'
import KnowledgeLabelsInput from '@/components/Input/KnowledgeLabelsInput'

export default {
  name: 'KnowledgeBaseSearchArea',
  components: {
    DynamicForm,
    KnowledgeLabelsInput
  },
  props: {
    selectedCategory: {
      type: Object,
      default: () => ({})
    },
    currentKnowledgeBase: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      searchOption: {
        labels: []
      }, // 查询选项
      formConfig: {
        span: 12,
        fieldHeight: 60,
        labelPosition: 'right',
        labelWidth: 100,
        size: 'small'
      },
      fields: [
        {
          type: 'input',
          name: '知识名称',
          key: 'name',
          options: {}
        },
        {
          type: 'input',
          name: '知识编号',
          key: 'code',
          options: {}
        },
        {
          type: 'input',
          name: '关键字',
          key: 'keyword',
          options: {}
        },
        {
          type: 'datePicker',
          name: '创建日期',
          key: 'createDate',
          options: {
            type: 'daterange'
          }
        }
      ],
      labels: [],
      isLoading: false,
      isSubscribe: false,
      labelAreaShow: true
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    selectedCategory (val) {
      this.searchOption = {
        labels: []
      }
      this.isSubscribe = val.isSubscribe
      if (val.type === 2 && val.labelInfo && val.labelInfo.length > 0) {
        const labelInputConfig = {
          type: 'knowledgeLabelsInput',
          name: '标签选择',
          key: 'labels',
          span: 24,
          options: {
            options: val.labelInfo
          }
        }
        const index = this.fields.findIndex(field => field.key === 'labels')
        this.$nextTick(() => {
          index >= 0 ? this.fields.splice(index, 1, labelInputConfig) : this.fields.push(labelInputConfig)
        })
      } else {
        const index = this.fields.findIndex(field => field.key === 'labels')
        index >= 0 && this.fields.splice(index, 1)
      }
    }
  },
  methods: {
    // 点击查询按钮，触发表单提交
    handleSearch () {
      this.$refs['dynamic-form'].submitForm()
    },
    // 表单提交，向上传递查询事件
    handleSumbit (val) {
      this.$emit('search', val)
    },
    // 重置
    handleReset () {
      this.searchOption = {}
      this.$refs['dynamic-form'].resetForm()
    },
    // 新增
    handleAdd () {
      // const routeData = this.$router.resolve({
      //   name: "knowledgeForm",
      //   params: {
      //     id: this.currentKnowledgeBase.id,
      //     classification: this.selectedCategory.id
      //   }
      // })
      // window.open(routeData.href, '_blank')
      this.$router.push({
        name: "knowledgeForm",
        params: {
          id: this.currentKnowledgeBase.id,
          classification: this.selectedCategory.id
        }
      })
    },
    // 订阅 / 取消订阅目录
    handleSubscribe () {
      const id = this.selectedCategory.id
      const userId = this.userInfo.id
      const text = `${this.isSubscribe ? '取消' : ''}订阅`
      if (this.isSubscribe) {
        cancelSubscribe({
          ids: `${id}-0`,
          userId
        }).then(() => {
          this.isSubscribe = false
          this.$emit('subscribeChange', {
            id: this.selectedCategory.id
          })
          this.$success(`${text}成功`)
        }).catch(() => {
          this.$error(`${text}失败`)
        })
      } else {
        subscribe({
          id,
          userId,
          type: '0'
        }).then(() => {
          this.isSubscribe = true
          this.$emit('subscribeChange', {
            id: this.selectedCategory.id
          })
          this.$success(`${text}成功`)
        }).catch(() => {
          this.$error(`${text}失败`)
        })
      }
    },
    // 知识标签选择树图标显示
    labelIconClass (node) {
      if (node.isBranch) {
        return node.isExpanded ? 'fa-folder-open' : 'fa-folder'
      }
      return 'fa-bookmark'
    },
    handleLabelsLoad (data) {
      if (!data || data.length == 0) {
        this.labelAreaShow = false
      }
    }
  }
}
</script>

<style scoped>
.button-area {
  text-align: center;
}
</style>