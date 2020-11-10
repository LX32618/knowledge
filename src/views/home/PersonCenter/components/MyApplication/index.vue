<template>
  <div>
    <el-tabs v-model="currentTab" type="card" @tab-click="handleTab">
      <el-tab-pane v-for="tab of tabs" :key="tab.name" :name="tab.name" :label="tab.label"></el-tab-pane>
    </el-tabs>
    <!-- 申请知识列表 -->
    <dynamic-table v-loading="isLoading" :data="applicationKnowledge" :columns="columns">
      <template v-slot:docName="{ scope }">
        <router-link :to="{ path: `/knowledgeDetail/${scope.row.id}`}">{{ scope.row.docName }}</router-link>
      </template>
    </dynamic-table>
    <el-pagination
      :page-size="rows"
      :total="total"
      :current-page.sync="page"
      @current-change="pageChange"
      layout="total, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
import DynamicTable from '@/components/KnowledgeView/components/DynamicTable'
import { mapGetters } from 'vuex'
import { getSharedKnowledge } from '@/api/sysRole'
import { dateTime } from '@/filters'

export default {
  name: 'MyShare',
  components: {
    DynamicTable
  },
  data () {
    return {
      page: 1,
      rows: 10,
      total: 0,
      currentTab: 'all',
      tabs: [
        { name: 'all', label: '全部'},
        { name: '0', label: '待审核'},
        { name: '3', label: '未通过'},
        { name: '1', label: '通过'}
      ],
      isLoading: false,
      applicationKnowledge: [],
      columns: [
        {
          label: '名称',
          key: 'docName'
        },
        {
          label: '知识目录',
          key: 'categoryName'
        },
        {
          label: '申请时间',
          key: 'time',
          formatter (row) {
            return dateTime(row.time)
          }
        },
        {
          label: '申请天数',
          key: 'days'
        },
        {
          label: '审批人',
          key: 'auditperson'
        },
        {
          label: '状态',
          key: 'status'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    currentTabValue () {
      return this.currentTab === 'all' ? undefined : this.currentTab
    }
  },
  methods: {
    pageChange () {
      this.updateApplicationKnowledge()
    },
    updateApplicationKnowledge () {
      this.isLoading = true
      getSharedKnowledge({
        page: this.page,
        rows: this.rows,
        shareId: this.userInfo.id,
        status: this.currentTabValue
      }).then(res => {
        this.isLoading = false
        this.applicationKnowledge = res.content.datas
        this.total = res.content.total
      })
    },
    handleTab () {
      this.updateApplicationKnowledge()
    }
  },
  mounted () {
    this.updateApplicationKnowledge()
  }
}
</script>

<style scoped>
</style>
