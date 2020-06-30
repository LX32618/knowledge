<template>
  <el-card v-loading="isLoading">
    <span slot="header"><i class="fa fa-list"></i> 搜索条件</span>
    <!-- 搜索条件表单 -->
    <search-area
      :selectedCategory="selectedCategory"
      :currentKnowledgeBase="currentKnowledgeBase"
      @search="handleSearch"
      v-on="$listeners"
    ></search-area>
    <!-- 知识显示列表 -->
    <div>
      <cs-table :settings="tableOptions" :tableData="knowledges">
        <!-- 操作列 -->
        <template slot="prefix-column">
          <el-table-column label="操作" width="200" fixed>
            <template v-slot="{ row, $index }">
              <el-button
                size="mini"
                icon="el-icon-view"
                @click="handleView(row)"
                type="success"
                >查看</el-button
              >
              <el-button
                size="small"
                @click="handleSubscribe(row, $index)"
                :type="row.isSubscribe ? 'warning' : 'primary'"
              >
                <template v-if="row.isSubscribe">
                  <i class="el-icon-s-release"></i> 取消订阅
                </template>
                <template v-else>
                  <i class="el-icon-s-claim"></i> 订阅
                </template>
              </el-button>
            </template>
          </el-table-column>
          <!-- 标签列 -->
        </template>
        <template slot="suffix-column">
          <el-table-column label="标签" prop="labels">
            <template v-slot="{ row }">
              {{ handleLabelsShow(row.labelsEnt) }}
            </template>
          </el-table-column>
        </template>
      </cs-table>
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
// import { fetchKnowledges } from '@/api/knowledge'
import { mapGetters } from 'vuex'
import { getKnowledgeByClassifications } from '@/api/docCategory'
import { subscribe, cancelSubscribe } from '@/api/knowledgeSubscribe'
import SearchArea from './components/SearchArea'
import { dateTime } from '@/filters'

export default {
  name: 'KnowledgeBaseDetailArea',
  inheritAttrs: false,
  components: {
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
    }
  },
  data () {
    return {
      knowledges: [], // 知识列表
      isLoading: false,
      page: 1,
      rows: 10,
      total: 0,
      tableOptions: { // 表格选项
        fields: [{
          label: '知识名称',
          prop: 'name'
        }, {
          label: '知识编号',
          prop: 'code'
        }, {
          label: '目录',
          prop: 'classificationName'
        }, {
          label: '创建人',
          prop: 'creatorName'
        }, {
          label: '创建时间',
          prop: 'createDate',
          width: 100,
          formatter (index, row) {
            return dateTime(row.createDate)
          }
        }, {
          label: '关键字',
          prop: 'keyword'
        }]
      },
      searchOption: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
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
        this.knowledges = res.content.datas.map(item => {
          const result = item.knowledgeBase || {}
          result.classificationName = result.classificationEnt ? result.classificationEnt.categoryname : ''
          result.creatorName = result.creatorEnt ? result.creatorEnt.username : ''
          result.isSubscribe = item.isSubscribe
          if (!result.id) {
            result.id = item.knowledgeId
          }
          return result
        })
        this.total = res.content.total
        this.isLoading = false
      })
    },
    // 标签显示
    handleLabelsShow (labels) {
      if (!labels || !Array.isArray(labels)) {
        return ''
      }
      return labels.map(item => item.name).join(',')
    },
    // 查询知识
    handleSearch (searchOption) {
      this.searchOption = searchOption
      this.updateKnowledges()
    },
    // 查看知识详情
    handleView (row) {
      const routeData = this.$router.resolve({
        name: "knowledgeDetail",
        params: {
          id: row.id,
        }
      });
      window.open(routeData.href, '_blank')
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

<style scoped>
</style>
