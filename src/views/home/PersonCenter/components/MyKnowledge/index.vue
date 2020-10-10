<template>
  <el-container>
    <el-header height="50">
      <el-tabs type="card">
        <el-tab-pane @tab-click="handleTabClick">
          <span slot="label" index="0">已发布</span>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" index="1">待审核</span>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" index="2">审核未通过</span>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" index="3">待发布</span>
        </el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main>
      <el-row :gutter="10" v-loading="isLoading">
        <el-col :span="6" class="tree-area">
          <cs-tree
            :data="treeData"
            :treeOptions="{}"
            @treeNodeClick="handleTreeNodeClick"
          >
          </cs-tree
        ></el-col>
        <el-col :span="18">{{ selectedCategoryId }}</el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { fetchCategoryTreeAndNum } from '@/api/docCategory'
import { unflatCategoryTree } from '@/utils/tree'
import { mapGetters } from 'vuex'

export default {
  name: 'MyKnowledge',
  data () {
    return {
      isLoading: false,
      treeData: [],
      tableData: [],
      selectedCategoryId: '',
      selectedTab: '0'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'rootCategoryId'
    ])
  },
  methods: {
    handleTreeNodeClick ({ data }) {
      this.selectedCategoryId = data.id
    },
    handleTabClick () { }
  },
  async mounted () {
    this.isLoading = true
    const data = await fetchCategoryTreeAndNum({
      id: this.rootCategoryId,
      userId: this.userInfo.id
    })
    this.treeData = unflatCategoryTree(data.content, this.rootCategoryId, true)
    this.selectedCategoryId = this.rootCategoryId
    this.isLoading = false
  }
}
</script>

<style scoped>
.tree-area {
  height: 615px;
  overflow-y: auto;
}
</style>
