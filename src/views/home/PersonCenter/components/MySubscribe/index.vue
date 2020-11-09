<template>
  <div>
    <!-- 按钮工具条 -->
    <el-form inline>
      <el-form-item>
        <el-button type="primary" icon="el-icon-collection" @click="cancelSubscribe" :loading="isLoading">取消订阅</el-button>
      </el-form-item>
    </el-form>
    <!-- 订阅知识列表 -->
    <dynamic-table v-loading="isLoading" ref="table" :props="{ checkbox: true }" :data="subscribeKnowledge" :columns="columns">
      <template v-slot:NAME="{ scope }">
        <router-link :to="{ path: `/knowledgeDetail/${scope.row.id}`}">{{ scope.row.NAME }}</router-link>
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
import { getSubscribedKnowledge, cancelSubscribe } from '@/api/knowledgeSubscribe'

export default {
  name: 'MySubscribe',
  components: {
    DynamicTable
  },
  data () {
    return {
      page: 1,
      rows: 10,
      total: 0,
      isLoading: false,
      subscribeKnowledge: [],
      columns: [
        {
          label: '名称',
          key: 'NAME'
        },
        {
          label: '类型',
          key: 'typeName'
        },
        {
          label: '订阅时间',
          key: 'CREATEDATE'
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
    cancelSubscribe () {
      const selection = this.$refs.table.getSelection()
      const ids = selection.map(item => `${item.ID}-${item.OBJTYPE}`).join(',')
      this.isLoading = true
      cancelSubscribe({
        ids,
        userId: this.userInfo.id
      }).then(() => {
        this.$success('取消订阅成功')
        this.updateSubscribedKnowledge()
      }).catch(() => {
        this.$error('取消订阅失败')
        this.isLoading = false
      })
    },
    pageChange () {
      this.updateSubscribedKnowledge()
    },
    updateSubscribedKnowledge () {
      this.isLoading = true
      getSubscribedKnowledge({
        page: this.page,
        rows: this.rows,
        userId: this.userInfo.id
      }).then(res => {
        this.isLoading = false
        this.subscribeKnowledge = res.content.datas
        this.total = res.content.total
      })
    }
  },
  mounted () {
    this.updateSubscribedKnowledge()
  }
}
</script>

<style scoped>
</style>
