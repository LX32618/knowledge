<template>
  <el-tabs v-loading="isLoading" v-if="formConfig && !isLoading" :type="isHistory ? 'border-card' : 'card'">
    <!-- 实体表单 -->
    <template v-if="formConfig.formType === 0">
      <el-tab-pane>
        <span slot="label">{{ formConfig.formName }}</span>
        <content-container
          :isHistory="isHistory"
          :formConfig="formConfig"
          :showBase="true"
          :baseData="baseData"
          :formData="formData[0]"
          :editType="editType"
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
          :isHistory="isHistory"
          :formConfig="relationForm"
          :showBase="index === 0"
          :baseData="baseData"
          :formData="formData[index]"
          :editType="editType"
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
</template>

<script>
import { getModelAndData } from '@/api/knowledgeData'
import ContentContainer from './components/ContentContainer'
import { handleGetKnowledgeModelAndDataResponse } from '@/utils/responseHelper'

export default {
  name: 'KnowledgeTabs',
  components: {
    ContentContainer
  },
  props: {
    id: String,
    editType: Number,
    isHistory: {
      type: Boolean,
      default: false
    },
    knowledge: {
      type: Object
    }
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
  watch: {
    knowledge: {
      handler (val) {
        this.setData(val)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleSaveSuccess () {
      // location.reload()
      this.update()
    },
    update (ver) {
      this.isLoading = true
      getModelAndData({ id: this.id, ver }).then(res => {
        this.setData(handleGetKnowledgeModelAndDataResponse(res.content))
        this.isLoading = false
      })
    },
    setData (val) {
      const { baseData, formData, formConfig } = val
      this.baseData = baseData
      this.formData = formData
      this.formConfig = formConfig
    }
  }
}
</script>
