<template>
  <div class="container">
    <tool-bar />
    <div v-loading="isLoading">
      <el-tabs v-if="formConfig" type="card">
        <!-- 实体表单 -->
        <template v-if="formConfig.formType">
          <el-tab-pane>
            <span slot="label">{{ formConfig.formName }}</span>
            <content-container
              :formConfig="formConfig"
              :showBase="true"
              :baseData="baseData"
            />
          </el-tab-pane>
        </template>
        <!-- 虚拟表单 每个关联表单都有Tab页 -->
        <template v-else>
          <el-tab-pane
            v-for="(relationForm, index) of formConfig.relationForms"
            :key="relationForm.id"
          >
            <span slot="label">{{ relationForm.formName }}</span>
            <!-- 虚拟表单第一个Tab页显示基础信息表单 -->
            <content-container
              :formConfig="relationForm"
              :showBase="index === 0"
              :baseData="baseData"
            />
          </el-tab-pane>
        </template>
        <!-- 知识评论 -->
        <el-tab-pane>
          <span slot="label">知识评论</span>
          <knowledge-comment></knowledge-comment>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { fetchKnowledgeDetail } from '@/api/knowledge'
import ToolBar from './components/ToolBar'
import ContentContainer from './components/ContentContainer'
import KnowledgeComment from './components/KnowledgeComment'

export default {
  name: 'KnowledgeDetail',
  components: {
    ToolBar,
    ContentContainer,
    KnowledgeComment
  },
  props: {
    id: String
  },
  data () {
    return {
      isLoading: false,
      baseData: {},
      formConfig: undefined
    }
  },
  mounted () {
    this.isLoading = true
    fetchKnowledgeDetail({ id: this.id }).then(res => {
      this.baseData = res.content.baseData
      this.formConfig = res.content.formConfig
      this.isLoading = false
    })
  }
}
</script>

<style scoped>
.container {
  margin: 40px 5px;
}
</style>
