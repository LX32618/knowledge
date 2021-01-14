<template>
  <div class="container">
    <tool-bar :isSubscribe.sync="isSubscribe" :baseData="baseData" />
    <!-- <form-making upload preview generate-code generate-json clearable></form-making> -->
    <div v-loading="isLoading">
      <el-tabs v-if="formConfig" type="card">
        <!-- 实体表单 -->
        <template v-if="formConfig.formType === 0">
          <el-tab-pane>
            <span slot="label">{{ formConfig.formName }}</span>
            <content-container
              :formConfig="formConfig"
              :showBase="true"
              :baseData="baseData"
              :formData="formData[0]"
              @saveSuccess="handleSaveSuccess"
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
              :formData="formData[index]"
              @saveSuccess="handleSaveSuccess"
            />
          </el-tab-pane>
        </template>
        <!-- 知识评论 -->
        <!-- <el-tab-pane>
          <span slot="label">知识评论</span>
          <knowledge-comment></knowledge-comment>
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getModelAndData } from '@/api/knowledgeData'
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
      formData: [],
      formConfig: undefined,
      isSubscribe: false
    }
  },
  methods: {
    handleSaveSuccess () {
      // location.reload()
      this.update
    },
    update () {
      this.isLoading = true
      getModelAndData({ id: this.id }).then(res => {
        const baseData = res.content.knowledgeData.knowledgeBase
        baseData.classificationName = baseData.classificationEnt.categoryname
        if (baseData.creatorEnt) {
          baseData.creatorName = baseData.creatorEnt.username
        }
        this.baseData = baseData
        this.formData = res.content.knowledgeData.formData
        const formConfig = res.content.knowledgeModel.formModel
        this.formConfig = Array.isArray(formConfig) ? {
          formType: 1,
          relationForms: formConfig
        } : formConfig
        this.isLoading = false
      })
    }
  },
  mounted () {
    this.update()
  }
}
</script>

<style scoped>
.container {
  margin: 40px 5px;
}
</style>
