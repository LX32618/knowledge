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
            <el-button v-if="this.selectedFolder.isLeaf" class="btn-icon" type="danger" icon="el-icon-delete" circle @click="deleteNode"></el-button>
          </div>
          <el-tree
            lazy
            node-key="id"
            :data="collectTreeData"
            :props="treeProps"
            :expand-on-click-node="false"
            :load="loadNode"
            :default-expanded-keys="expandKeys"
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
              <el-button type="success" icon="el-icon-folder" @click="moveCollect(scope.row)">移动</el-button>
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
    <el-dialog :visible.sync="dialogShow" title="节点编辑">
      <dynamic-form ref="dynamic-form" :data="nodeModel" :formConfig="formConfig" :fields="fields" @submit="handleSubmit"></dynamic-form>
      <span slot="footer">
        <el-button type="success" icon="el-icon-check" @click="submitForm">确定</el-button>
        <el-button type="danger" icon="el-icon-close" @click="dialogShow = false">取消</el-button>
      </span>
    </el-dialog>
    <collect-dialog :show.sync="moveShow" :knowledge="selectedKnowledge" @success="moveSuccess"></collect-dialog>
  </el-container>
</template>

<script>
import CollectDialog from '@/components/Input/CollectDialog'
import { fetchCollectTree, saveTreeNode, deleteTreeNode } from '@/api/treeRest'
import { fetchCollectKnowledgeCount, fetchCollectKnowledge, deleteCollect } from '@/api/knowledgeCollect'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'MyCollect',
  components: {
    CollectDialog
  },
  data () {
    return {
      isLoading: false,
      rootId: '890BEB90712B474BA32EAF69399CB986',
      selectedFolder: {},
      selectedNode: {},
      selectedKnowledge: {},
      nodeModel: {},
      treeProps: {
        id: 'id',
        label: 'name',
        children: 'datas',
        isLeaf: 'isLeaf'
      },
      collectTreeData: [],
      collectCount: null,
      knowledges: [],
      columns: [
        {
          key: 'NAME',
          label: '名称'
        },
        {
          key: 'CATEGORYNAME',
          label: '知识目录'
        },
        {
          key: 'CREATOR',
          label: '创建人'
        },
        {
          key: 'option',
          label: '操作',
          width: 200
        }
      ],
      dialogShow: false,
      moveShow: false,
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
          type: 9,
          name: '描述',
          key: 'describe',
          options: {}
        },
        {
          type: 2,
          name: '排序',
          key: 'sort',
          options: {
            defaultValue: 0
          }
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
      ],
      rows: 10,
      total: 0,
      page: 1,
      expandKeys: []
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
    handleNodeClick (data, node) {
      this.selectedFolder = data
      this.selectedNode = node
      this.updateKnowledge()
    },
    // 取消收藏
    cancelCollect (row) {
      deleteCollect({
        knowledgeId: row.id,
        dictId: this.selectedFolder.id
      }).then(() => {
        this.updateKnowledge()
        this.$success('取消收藏成功')
      })
    },
    moveCollect (row) {
      this.selectedKnowledge = row
      this.moveShow = true
    },
    // 更新收藏夹中知识列表
    updateKnowledge () {
      this.isLoading = true
      fetchCollectKnowledge({
        typeId: this.selectedFolder.id,
        userId: this.userInfo.id
      }).then(res => {
        this.knowledges = res.content.datas
        this.total = res.content.total
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
        callback(res)
      })
    },
    loadNode (node, resolve) {
      fetchCollectTree({
        id: node.data.id || this.rootId,
        userId: this.userInfo.id
      }).then(res => {
        this.selectedFolder = res.content[0]
        resolve(res.content[0].datas)
      })
    },
    openDialog (type) {
      this.nodeModel = type === 'add' ? {
        pid: this.selectedFolder.id,
        pName: this.selectedFolder.name
      } : {
        id: this.selectedFolder.id,
        pid: this.selectedFolder.pid,
        name: this.selectedFolder.name,
        ...this.selectedFolder.data
      }
      this.dialogShow = true
    },
    submitForm () {
      if (!this.$refs['dynamic-form']) {
        return
      }
      this.$refs['dynamic-form'].submitForm()
    },
    handleSubmit (model) {
      const node = {
        id: this.nodeModel.id || '',
        name: model.name,
        pid: this.nodeModel.pid,
        data: {
          ...model,
          sort: `${model.sort}`
        }
      }
      saveTreeNode(node).then((res) => {
        this.updateCollectTree((res) => {
          this.isLoading = false
          this.$success('保存成功')
          this.dialogShow = false
          this.expandKeys = [node.pid]
        })
      })
    },
    pageChange () {
      this.updateKnowledge()
    },
    deleteNode () {
      this.$confirm('删除目录会取消收藏目录下所有知识，是否继续？', '警告', { type: 'warning' }).then(() => {
        deleteTreeNode({ id: this.selectedFolder.id }).then(() => {
          this.updateCollectTree((res) => {
            this.isLoading = false
            this.$success('删除成功')
            this.dialogShow = false
            this.expandKeys = [this.selectedFolder.pid]
          })
        })
      }).catch(() => {})
    },
    moveSuccess () {
      this.updateKnowledge()
      this.$success('移动知识收藏成功')
    }
  },
  mounted () {
    fetchCollectKnowledgeCount({
      userId: this.userInfo.id
    }).then(res => {
      this.collectCount = res.content
    })
    this.updateCollectTree(() => {
      this.selectedFolder = this.collectTreeData[0]
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
