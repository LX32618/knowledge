<template>
  <div>
    <!-- 分享知识列表 -->
    <dynamic-table v-loading="isLoading" :data="sharedKnowledge" :columns="columns">
      <template v-slot:docName="{ scope }">
        <el-link class="table-knowledge-link" type="primary" size="sm" @click="viewDetail(scope.row.id)">{{ scope.row.docName }}</el-link>
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
      isLoading: false,
      sharedKnowledge: [],
      columns: [
        {
          label: '名称',
          key: 'docName'
        },
        {
          label: '目录',
          key: 'categoryName'
        },
        {
          label: '分享时间',
          key: 'time',
          formatter (row) {
            return dateTime(row.time)
          }
        },
        {
          label: '分享对象',
          key: 'auditperson'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    pageChange () {
      this.updateSharedKnowledge()
    },
    updateSharedKnowledge () {
      this.isLoading = true
      getSharedKnowledge({
        page: this.page,
        rows: this.rows,
        status: '99',
        share: 'share',
        shareId: this.userInfo.id
      }).then(res => {
        this.isLoading = false
        this.sharedKnowledge = res.content.datas
        this.total = res.content.total
      })
    },
    viewDetail (id) {
      const routeData = this.$router.resolve({
        name: 'knowledgeDetail',
        params: {
          id
        }
      })
      window.open(routeData.href, '_blank')
    }
  },
  mounted () {
    this.updateSharedKnowledge()
  }
}
</script>

<style scoped>
</style>
