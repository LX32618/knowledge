<template>
  <el-card v-loading="isLoading">
    <span slot="header"><i class="fa fa-list"></i> 搜索条件</span>
    <!-- 搜索条件表单 -->
    <search-area
      :selectedCategory="selectedCategory"
      :currentKnowledgeBase="currentKnowledgeBase"
      :searchColumns="searchColumns"
      :preView="preView"
      @search="handleSearch"
      v-on="$listeners"
    ></search-area>
    <!-- 知识显示列表 -->
    <div>
      <dynamic-table :data="knowledges" :columns="columns" :props="props" border>
        <!-- 序号列 -->
        <template v-slot:index="{ scope }">{{ scope.$index + 1 }}</template>
        <!-- 操作列 -->
        <template v-slot:option="{ scope }">
          <el-button size="mini" icon="el-icon-view" @click="handleView(scope.row)" type="success">查看</el-button>
          <el-button size="small" @click="handleSubscribe(scope.row, scope.$index)" :type="scope.row.isSubscribe ? 'warning' : 'primary'">
            <template v-if="scope.row.isSubscribe">
              <i class="el-icon-s-release"></i> 取消订阅
            </template>
            <template v-else>
              <i class="el-icon-s-claim"></i> 订阅
            </template>
          </el-button>
        </template>
      </dynamic-table>
      <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        :page-size="rows"
        :total="total"
        :current-page.sync="page"
        @size-change="sizeChange"
        @current-change="pageChange"
        layout="total, prev, pager, next, sizes, jumper"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getKnowledgeByClassifications } from '@/api/docCategory'
import { subscribe, cancelSubscribe } from '@/api/knowledgeSubscribe'
import SearchArea from './components/SearchArea'
import DynamicTable from './components/DynamicTable'
import { dateTime } from '@/filters'

export default {
  name: 'KnowledgeView',
  inheritAttrs: false,
  components: {
    DynamicTable,
    SearchArea
  },
  props: {
    selectedCategory: {
      type: Object,
      default: () => ({})
    },
    currentKnowledgeBase: {
      type: Object,
      default: () => ({})
    },
    preView: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      knowledges: [], // 知识列表
      isLoading: false,
      page: 1,
      rows: 10,
      total: 0,
      columns: [],
      props: {
        index: true
      },
      searchOption: {},
      searchColumns: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'baseColumnsConfig'
    ])
  },
  watch: {
    selectedCategory (newValue) {
      if (!newValue || !newValue.id) {
        return
      }
      this.searchOption = {}
      this.page = 1
      this.rows = 10
      this.updateKnowledges()
    }
  },
  methods: {
    // 更新知识
    updateKnowledges () {
      this.isLoading = true
      getKnowledgeByClassifications({
        id: this.selectedCategory.id,
        userId: this.userInfo.id,
        ...this.searchOption,
        rows: this.rows,
        page: this.page
      }).then(res => {
        // 处理知识列表配置
        const model = res.content.model
        const fieldMap = {} // 字段映射关系
        this.searchColumns = [] // 可搜索字段
        // 如果选中的是知识库或分类，则显示固定模板
        if (this.selectedCategory.type !== 2) {
          this.columns = this.baseColumnsConfig
        } else {
          this.columns = this.baseColumnsConfig.slice(0, 2)
          console.log(model)
          // 基础知识配置生成
          const sortedBaseConfig = model.base.sort((a, b) => a.pOrder - b.pOrder)
          this.columns.push(...sortedBaseConfig.map(this.handleBadeColumnConfig))
          // 主表知识配置生成
          const formData = model.formData
          formData.forEach(mainForm => {
            fieldMap[mainForm.formId] = []
            this.columns.push(...mainForm.fieldData.map(item => {
              const result = {
                ...item,
                key: `${item.formId}_${item.fieldInfo.fieldName}`,
                label: item.showName,
                width: item.colWidth
              }
              fieldMap[mainForm.formId].push(item.fieldInfo.fieldName)
              if (item.isSearch) {
                this.searchColumns.push({
                  key: `${item.formId}_${item.fieldInfo.fieldName}`,
                  name: item.showName
                })
              }
              return result
            }))
          })
        }
        // 预览状态不处理列表数据
        if (this.preView) {
          this.knowledges = []
          this.isLoading = false
          return
        }
        // 处理知识列表数据
        this.knowledges = res.content.datas.map(item => {
          const result = item.knowledgeBase || {}
          result.classificationName = result.classificationEnt ? result.classificationEnt.categoryname : ''
          result.creatorName = result.creatorEnt ? result.creatorEnt.username : ''
          result.isSubscribe = item.isSubscribe
          if (!result.id) {
            result.id = item.knowledgeId
          }
          Object.keys(fieldMap).forEach(key => {
            const fields = fieldMap[key]
            const mainFormData = item.formData.find(mainForm => mainForm.formId === key)
            fields.forEach(field => {
              result[`${key}_${field}`] = mainFormData ? mainFormData[field] : null
            })
          })
          return result
        })
        this.total = res.content.total
        this.isLoading = false
      })
    },
    // 转化基础知识配置
    handleBadeColumnConfig (item) {
      const result = {
        ...item,
        key: item.fieldName,
        label: item.showName,
        width: item.colWidth,
        sortable: item.isOrder
      }
      if (result.key === 'labelsEnt') {
        result.key = 'labels'
        result.formatter = (row, index) => {
          const labels = row.labelsEnt
          if (!labels || !Array.isArray(labels)) {
            return ''
          }
          return labels.map(item => item.name).join(',')
        }
      } else if (result.key === 'creator') {
        result.key = 'creatorName'
      } else if (result.key === 'category') {
        result.key = 'classificationName'
      } else if (result.key === 'createDate') {
        result.formatter = (row, index) => {
          return dateTime(row.createDate)
        }
      }
      return result
    },
    // 查询知识
    handleSearch (searchOption) {
      this.searchOption = searchOption
      this.updateKnowledges()
    },
    // 查看知识详情
    handleView (row) {
      this.$router.push({
        name: "knowledgeDetail",
        params: {
          id: row.id,
        }
      })
    },
    // 订阅 / 取消订阅知识
    handleSubscribe (row, index) {
      const id = row.id
      const userId = this.userInfo.id
      const text = `${row.isSubscribe ? '取消' : ''}订阅`
      if (row.isSubscribe) {
        cancelSubscribe({
          ids: `${row.id}-1`,
          userId
        }).then(() => {
          row.isSubscribe = false
          this.knowledges.splice(index, 1, row)
          this.$success(`${text}成功`)
        }).catch(() => {
          this.$error(`${text}失败`)
        })
      } else {
        subscribe({
          id,
          userId
        }).then(() => {
          row.isSubscribe = true
          this.knowledges.splice(index, 1, row)
          this.$success(`${text}成功`)
        }).catch(() => {
          this.$error(`${text}失败`)
        })
      }
    },
    // 每页数量变化
    sizeChange (rows) {
      this.rows = rows
      this.updateKnowledges()
    },
    // 当前页面变化
    pageChange (page) {
      this.page = page
      this.updateKnowledges()
    }
  }
}
</script>