<template>
  <div>
    <!-- 按钮工具条 -->
    <el-form inline>
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh-right" @click="handleBack">还原</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" icon="el-icon-delete" @click="handleDelete">删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 删除知识列表 -->
    <dynamic-table v-loading="isLoading" ref="table" :props="{ checkbox: true }" :data="recycleKnowledge" :columns="columns"></dynamic-table>
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
import { getRecycleKnowledge } from '@/api/knowledgeBase'

export default {
  name: 'RecycleBin',
  components: {
    DynamicTable
  },
  data () {
    return {
      recycleKnowledge: [],
      columns: [
        {
          label: '名称',
          key: 'name'
        },
        {
          label: '知识分类',
          key: 'classificationName'
        },
        {
          label: '描述',
          key: 'describe'
        },
        {
          label: '创建时间',
          key: 'createDate'
        }
      ],
      rows: 10,
      page: 1,
      total: 0,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    pageChange () {
      this.updateRecycleKnowledge()
    },
    updateRecycleKnowledge () {
      this.isLoading = true
      getRecycleKnowledge({
        rows: this.rows,
        page: this.page,
        userId: this.userInfo.id
      }).then(res => {
        this.recycleKnowledge = res.content.datas
        this.total = res.content.total
        this.isLoading = false
      })
    },
    handleBack () {
      const selection = this.$refs.table.getSelection()
      console.log(selection)
    },
    handleDelete () {
      const selection = this.$refs.table.getSelection()
    }
  },
  mounted () {
    this.updateRecycleKnowledge()
  }
}
</script>

<style scoped>
</style>
