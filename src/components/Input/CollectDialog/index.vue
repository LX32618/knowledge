<template>
  <el-dialog :visible.sync="visible" title="知识收藏" width="35%">
    <el-form label-width="100px" size="small">
      <el-form-item label="知识名称">
        <el-input v-model="knowledge.NAME" disabled></el-input>
      </el-form-item>
      <el-form-item label="目标文件夹">
        <el-input v-model="selectedFolder.name" disabled></el-input>
      </el-form-item>
    </el-form>
    <div class="tool-bar">
      <el-button class="btn-icon" type="success" icon="el-icon-plus" size="mini" circle @click="openDialog('add')"></el-button>
      <el-button class="btn-icon" type="warning" icon="el-icon-edit" size="mini" circle @click="openDialog('edit')"></el-button>
      <el-button v-if="this.selectedFolder.isLeaf" class="btn-icon" size="mini" type="danger" icon="el-icon-delete" circle @click="deleteNode"></el-button>
    </div>
    <el-tree
      v-loading="isLoading"
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
    <el-dialog :visible.sync="dialogShow" title="编辑文件夹" append-to-body width="25%" top="30vh">
      <el-form :model="nodeModel" label-width="100px" :rules="rules">
        <el-form-item label="创建位置">
          <el-input v-model="selectedFolder.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="文件夹名称" prop="name">
          <el-input v-model="nodeModel.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="success" icon="el-icon-check" @click="submitNodeForm">确定</el-button>
        <el-button type="danger" icon="el-icon-close" @click="dialogShow = false">取消</el-button>
      </span>
    </el-dialog>
    <span slot="footer">
      <el-button type="success" icon="el-icon-check" @click="submitMove">确定</el-button>
      <el-button type="danger" icon="el-icon-close" @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { fetchCollectTree, saveTreeNode, deleteTreeNode } from '@/api/treeRest'
import { saveCollect } from '@/api/knowledgeCollect'
import { mapGetters } from 'vuex'

export default {
  name: 'CollectDialog',
  props: {
    show: Boolean,
    knowledge: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      rootId: '890BEB90712B474BA32EAF69399CB986',
      visible: this.show,
      collectTreeData: [],
      selectedFolder: {},
      treeProps: {
        id: 'id',
        label: 'name',
        children: 'datas',
        isLeaf: 'isLeaf'
      },
      isLoading: false,
      dialogShow: false,
      nodeModel: {},
      expandKeys: [],
      rules: {
        name: [{ required: true, message: '目录名不能为空', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    show (val) {
      this.visible = val
    },
    visible (val) {
      this.$emit('update:show', val)
    }
  },
  methods: {
    nodeIcon (node) {
      return node.expanded ? 'el-icon-folder-opened' : 'el-icon-folder'
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
        resolve(node.level === 0 ? res.content : res.content[0].datas)
      })
    },
    handleNodeClick (data) {
      this.selectedFolder = data
    },
    openDialog (type) {
      this.nodeModel = type === 'add' ? {
        pid: this.selectedFolder.id,
      } : {
        id: this.selectedFolder.id,
        pid: this.selectedFolder.pid,
        name: this.selectedFolder.name,
        ...this.selectedFolder.data
      }
      this.dialogShow = true
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
    // 提交节点编辑表单
    submitNodeForm () {
      const node = {
        id: this.nodeModel.id || '',
        name: this.nodeModel.name,
        pid: this.nodeModel.pid,
        data: {
          ...this.nodeModel,
          sort: `${this.nodeModel.sort}`
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
    // 提交文件夹移动
    submitMove () {
      saveCollect({
        userId: this.userInfo.id,
        id: this.knowledge.ID,
        knowledgeId: this.knowledge.KNOWLEDGE_ID,
        dictId: this.selectedFolder.id
      }).then(() => {
        this.$emit('success')
        this.visible = false
      }).catch(() => {
        this.$emit('error')
      })
    }
  }
}
</script>

<style scoped>
.el-tree {
  height: 200px;
  overflow-y: auto;
}
.tool-bar {
  margin-bottom: 20px;
  margin-left: 20px;
}
.btn-icon {
  margin-left: 10px;
}
</style>