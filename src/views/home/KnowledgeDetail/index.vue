<template>
  <div v-if="viewPermission" class="container">
    <tool-bar :baseData="knowledge.baseData" />
    <KnowledgeTabs :id="id" :knowledge="knowledge" :editType="editType" />
  </div>
  <div v-loading="permissionLoading" class="no-permission" v-else>
    <div v-show="!permissionLoading" class="box">
      <h2>没有权限浏览该知识</h2>
      <el-button type="success" icon="el-icon-s-home" @click="handleHomeClick">返回首页</el-button>
      <el-button type="primary" icon="el-icon-reading" @click="handleApply">申请权限</el-button>
    </div>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar'
import KnowledgeTabs from './KnowledgeTabs'
import { getModelAndData } from '@/api/knowledgeData'
import { hasKnowledgePermission } from '@/api/authorityConfig'
import { handleGetKnowledgeModelAndDataResponse } from '@/utils/responseHelper'

export default {
  name: 'KnowledgeDetail',
  components: {
    ToolBar,
    KnowledgeTabs
  },
  props: {
    id: String
  },
  data () {
    return {
      knowledge: {
        baseData: {}
      },
      editType: undefined,
      viewPermission: false,
      permissionLoading: false
    }
  },
  methods: {
    handleApply () {
      this.$info('申请已提交，请等待管理员审批')
    },
    handleHomeClick () {
      this.$router.push('/')
    }
  },
  mounted () {
    const { editType } = this.$route.query
    this.editType = parseInt(editType)
    getModelAndData({ id: this.id }).then(res => {
      this.knowledge = handleGetKnowledgeModelAndDataResponse(res.content)
    })
    this.permissionLoading = true
    hasKnowledgePermission(this.id).then(res => {
      this.viewPermission = res.content.hasPermission
      this.permissionLoading = false
    })
  }
}
</script>

<style scoped>
.container {
  margin: 40px 5px;
}
.no-permission {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  text-align: center;
}
</style>
