<template>
  <div v-if="viewPermission" class="container">
    <tool-bar
      :baseData="knowledge.baseData"
      :isEdit="isEdit"
      @updateStauts="handleStatusChange"
    />
    <!-- <AreaInput v-model="test" /> {{ test }} -->
    <KnowledgeTabs
      :id="id"
      :knowledge="knowledge"
      :isEdit.sync="isEdit"
      :editType="editType"
      :editPermission="editPermission"
      @updateBaseData="handleBaseDataChange"
    />
  </div>
  <div v-loading="permissionLoading" class="no-permission" v-else>
    <div v-show="!permissionLoading" class="box">
      <h2>没有权限浏览该知识</h2>
      <el-button type="success" icon="el-icon-s-home" @click="handleHomeClick"
        >返回首页</el-button
      >
      <el-button type="primary" icon="el-icon-reading" @click="handleApply"
        >申请权限</el-button
      >
    </div>
    <ApplyDialog :visible.sync="applyDialogShow" :oid="id" />
  </div>
</template>

<script>
import ToolBar from './components/ToolBar'
import KnowledgeTabs from './KnowledgeTabs'
import AreaInput from '@/components/Input/AreaInput'
import { getModelAndData } from '@/api/knowledgeData'
import { hasKnowledgePermission } from '@/api/authorityConfig'
import { handleGetKnowledgeModelAndDataResponse } from '@/utils/responseHelper'
import ApplyDialog from '@/components/Input/ApplyDialog'
import { isApply } from '@/api/sysRole'

export default {
  name: 'KnowledgeDetail',
  components: {
    ToolBar,
    KnowledgeTabs,
    AreaInput,
    ApplyDialog
  },
  props: {
    id: String
  },
  data() {
    return {
      knowledge: {
        baseData: {}
      },
      editType: undefined,
      viewPermission: false,
      editPermission: false,
      permissionLoading: false,
      applyDialogShow: false,
      isEdit: false
    }
  },
  methods: {
    async handleApply() {
      let res = await isApply(this.id)
      if (res.content) {
        this.$info(res.message)
        return
      }
      this.applyDialogShow = true
    },
    handleHomeClick() {
      this.$router.push('/')
    },
    handleBaseDataChange(baseData) {
      // this.$nextTick(() => {
      //   this.knowledge.baseData = baseData
      // })
      this.knowledge = baseData
      // this.knowledge.baseData.auditStatus = baseData.auditStatus
      // this.knowledge.baseData.ver = baseData.ver
    },
    handleStatusChange(auditStatus) {
      this.knowledge.baseData.auditStatus = auditStatus
    }
  },
  async mounted() {
    this.permissionLoading = true
    let res = await hasKnowledgePermission(this.id)
    this.viewPermission = res.content.hasPermission.view
    this.editPermission = res.content.hasPermission.edit
    this.permissionLoading = false
    if (!this.viewPermission) return
    const { editType } = this.$route.query
    this.editType = parseInt(editType)
    res = await getModelAndData({ id: this.id })
    this.knowledge = handleGetKnowledgeModelAndDataResponse(res.content)
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
