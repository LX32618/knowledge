<template>
  <el-container>
    <el-header height="50">
      <el-tabs type="card" v-model="selectedTab" @tab-click="handleTab">
        <el-tab-pane v-for="tab of tabs" :key="tab.name" :name="tab.name" :label="tab.label"></el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main>
      <el-row :gutter="10" v-loading="isLoading">
        <el-col :span="6" class="tree-area">
          <cs-tree
            :data="treeData"
            :treeOptions="{}"
            @treeNodeClick="handleTreeNodeClick">
          </cs-tree
        ></el-col>
        <el-col :span="18">
          <el-button type="primary" icon="el-icon-s-promotion" v-if="selectedTab === 'toPublish'">发布</el-button>
          <dynamic-table :data="knowledges" :columns="columns" :props="tableProps">
            <template v-slot:NAME="{ scope }">
              <router-link :to="{ path: `/knowledgeDetail/${scope.row.id}`}">{{ scope.row.NAME }}</router-link>
            </template>
            <template v-slot:reason="{ scope }">
              <el-tooltip effect="light" :content="scope.row.reason" placement="bottom" popper-class="popper-tip">
                <div>{{ sliceReason(scope.row.reason) }}</div>
              </el-tooltip>
            </template>
            <template v-slot:option=" { scope }">
              <el-button v-if="selectedTab === 'published'" size="mini" type="primary" icon="el-icon-delete" @click="applyDelete(scope.row)">申请删除</el-button>
            </template>
          </dynamic-table>
          <el-pagination
            :page-size="rows"
            :total="total"
            :current-page.sync="page"
            @current-change="pageChange"
            layout="total, prev, pager, next, jumper">
          </el-pagination>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import DynamicTable from '@/components/KnowledgeView/components/DynamicTable'
import { fetchCategoryTreeAndNum } from '@/api/docCategory'
import { findKnowledges } from '@/api/knowledgeBase'
import { unflatCategoryTree } from '@/utils/tree'
import { mapGetters } from 'vuex'

export default {
  name: 'MyKnowledge',
  components: {
    DynamicTable
  },
  data () {
    return {
      page: 1,
      rows: 10,
      total: 0,
      isLoading: false,
      treeData: [],
      tableData: [],
      selectedCategoryId: '',
      selectedTab: 'published',
      isLoading: false,
      knowledges: [],
      tabs: [
        { name: 'published', label: '已发布' },
        { name: 'toAudit', label: '待审核' },
        { name: 'noPass', label: '审核未通过' },
        { name: 'toPublish', label: '待发布' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'rootCategoryId'
    ]),
    tableProps () {
      return {
        checkbox: this.selectedTab === 'toPublish'
      }
    },
    condition () {
      const conditionConfig = {
        published: {
          auditing: '1',
          isApplyDel: 'applydel'
        },
        toAudit: {
          auditing: '-1,0',
          knowledgeLock: 'lock'
        },
        noPass: {
          auditing: '-2,3',
          knowledgeLock: 'lock'
        },
        toPublish: {
          auditing: '-3',
          knowledgeLock: 'lock'
        }
      }
      return conditionConfig[this.selectedTab]
    },
    columns () {
      const columnConfig = {
        published: [
          {
            key: 'NAME',
            label: '名称'
          },
          {
            key: 'CATEGORYNAME',
            label: '知识目录'
          },
          {
            key: 'CREATORNAME',
            label: '创建人'
          },{
            key: 'option',
            label: '操作'
          }
        ],
        toAudit: [
          {
            key: 'NAME',
            label: '名称',
            width: 120
          },
          {
            key: 'CATEGORYNAME',
            label: '知识目录'
          },
          {
            key: 'audits',
            label: '审核状态'
          },
          {
            key: 'auditor',
            label: '审核人'
          },
          {
            key: 'CREATORNAME',
            label: '创建人'
          },
          {
            key: 'option',
            label: '操作'
          }
        ],
        noPass: [
          {
            key: 'NAME',
            label: '名称'
          },
          {
            key: 'CATEGORYNAME',
            label: '知识目录'
          },
          {
            key: 'reason',
            label: '审核未通过原因'
          },
          {
            key: 'CREATORNAME',
            label: '创建人'
          }
        ],
        toPublish: [
          {
            key: 'NAME',
            label: '名称'
          },
          {
            key: 'CATEGORYNAME',
            label: '知识目录'
          },
          {
            key: 'CREATORNAME',
            label: '创建人'
          },{
            key: 'option',
            label: '操作'
          }
        ]
      }
      return columnConfig[this.selectedTab]
    }
  },
  methods: {
    pageChange () {
      this.updateKnowledge()
    },
    handleTreeNodeClick ({ data }) {
      this.selectedCategoryId = data.id
      this.updateKnowledge()
    },
    updateKnowledge () {
      this.isLoading = true
      findKnowledges({
        page: this.page,
        rows: this.rows,
        ...this.condition,
        typeId: this.selectedCategoryId,
        creator: this.userInfo.id
      }).then(res => {
        this.knowledges = res.content.datas
        this.total = res.content.total
        this.isLoading = false
      })
    },
    handleTab () {
      this.updateKnowledge()
    },
    sliceReason (text) {
      return (!text || text.length < 10) ? text : `${text.slice(0, 8)}...`
    },
    applyDelete (row) {}
  },
  async mounted () {
    this.isLoading = true
    const data = await fetchCategoryTreeAndNum({
      id: this.rootCategoryId,
      userId: this.userInfo.id
    })
    this.treeData = unflatCategoryTree(data.content, this.rootCategoryId, true)
    this.selectedCategoryId = this.rootCategoryId
    this.updateKnowledge()
  }
}
</script>

<style scoped>
.tree-area {
  height: 615px;
  overflow-y: auto;
}
.popper-tip {
  width: 200px;
}
</style>
