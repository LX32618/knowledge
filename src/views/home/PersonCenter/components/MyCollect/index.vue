<template>
  <el-container>
    <el-header>
      <p class="collect-title">共收藏 {{ collectCount }} 条知识</p>
    </el-header>
    <el-main>
      <el-row :gutter="10" v-loading="isLoading">
        <el-col :span="6" class="tree-area">
          <div class="tool-bar">
            <el-button class="btn-icon" type="success" icon="el-icon-plus" circle @click="openDialog('add')"></el-button>
            <el-button class="btn-icon" type="warning" icon="el-icon-edit" circle @click="openDialog('edit')"></el-button>
            <el-button class="btn-icon" type="danger" icon="el-icon-delete" circle></el-button>
          </div>
          <el-tree
            :data="collectTreeData"
            :props="treeProps"
            :expand-on-click-node="false"
            @node-click="handleNodeClick">
            <span slot-scope="{ node }">
              <span>
                <i :class="nodeIcon(node)"></i> {{ node.label }}
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="18">
          <dynamic-table :data="knowledges" :columns="columns">
            <template v-slot:name="{ scope }">
              <router-link :to="{ path: `/knowledgeDetail/${scope.row.id}`}">{{ scope.row.name }}</router-link>
            </template>
            <template v-slot:option=" { scope }">
              <el-button type="primary" icon="el-icon-remove" @click="cancelCollect(scope.row)">取消收藏</el-button>
              <el-button type="success" icon="el-icon-folder" @click="cancelCollect(scope.row)">移动</el-button>
            </template>
          </dynamic-table>
          <!-- <el-pagination
            :page-size="rows"
            :total="total"
            :current-page.sync="page"
            @current-change="pageChange"
            layout="total, prev, pager, next, jumper">
          </el-pagination> -->
        </el-col>
      </el-row>
    </el-main>
    <el-dialog :visible.sync="dialogShow" title="节点编辑">
      <dynamic-form ref="dynamic-form" :data="nodeModel" :formConfig="formConfig" :fields="fields" @submit="handleSumbit"></dynamic-form>
    </el-dialog>
  </el-container>
</template>

<script>
import { fetchCollectTree, saveTreeNode } from '@/api/treeRest'
import { fetchCollectKnowledgeCount, fetchCollectKnowledge } from '@/api/knowledgeCollect'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'MyCollect',
  data () {
    return {
      isLoading: false,
      rootId: '890BEB90712B474BA32EAF69399CB986',
      selectdFolder: {},
      nodeModel: {},
      treeProps: {
        label: 'name',
        children: 'datas'
      },
      collectTreeData: [],
      collectCount: null,
      knowledges: [],
      columns: [
        {
          key: 'name',
          label: '名称'
        },
        {
          key: 'classificationName',
          label: '知识目录'
        },
        {
          key: 'creator',
          label: '创建人'
        },
        {
          key: 'option',
          label: '操作',
          width: 200
        }
      ],
      dialogShow: false,
      formConfig: {
        span: 24,
        labelPosition: 'left',
        labelWidth: 100,
        size: 'small'
      },
      fields: [
        {
          type: 0,
          name: '知识名称',
          key: 'name',
          options: {
            required: true
          }
        },
        {
          type: 0,
          name: '描述',
          key: 'describe',
          options: {}
        },
        {
          type: 0,
          name: '排序',
          key: 'sort',
          options: {}
        },
        {
          type: 0,
          name: '预留字段1',
          key: 'field_900',
          options: {}
        },
        {
          type: 0,
          name: '预留字段2',
          key: 'field_901',
          options: {}
        },
        {
          type: 0,
          name: '预留字段3',
          key: 'field_902',
          options: {}
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
    nodeIcon (node) {
      return node.expanded ? 'el-icon-folder-opened' : 'el-icon-folder'
    },
    handleNodeClick (data) {
      this.selectdFolder = data
      this.updateKnowledge()
    },
    cancelCollect (row) {},
    // 更新收藏夹中知识列表
    updateKnowledge () {
      this.isLoading = true
      fetchCollectKnowledge({
        typeId: this.selectdFolder.id,
        userId: this.userInfo.id
      }).then(res => {
        this.knowledges = res.content.datas
        this.isLoading = false
      })
    },
    // 更新收藏目录树
    updateCollectTree (callback) {
      this.isLoading = true
      fetchCollectTree({
        id: this.rootId,
        userId: this.userInfo.id
      }).then(res => {
        this.collectTreeData = res.content
        callback()
      })
    },
    openDialog (type) {
      this.nodeModel = type === 'add' ? {} : _.cloneDeep(this.selectdFolder)
      this.dialogShow = true
    },
    handleSumbit () {}
  },
  mounted () {
    fetchCollectKnowledgeCount({
      userId: this.userInfo.id
    }).then(res => {
      this.collectCount = res.content
    })
    this.updateCollectTree(() => {
      this.selectdFolder = this.collectTreeData[0]
      this.updateKnowledge()
    })
  }
}
</script>

<style scoped>
.collect-title {
  font-size: 14px;
  float: left;
  color: #1e282f;
  line-height: 50px;
  margin-left: 10px;
  font-weight: bold
}
.tool-bar {
  margin-bottom: 20px;
}
.btn-icon {
  margin-left: 10px;
}
</style>
