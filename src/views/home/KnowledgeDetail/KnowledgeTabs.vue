<template>
  <el-tabs
    v-loading="isLoading"
    v-if="formConfig && !isLoading"
    :type="isHistory ? 'border-card' : 'card'"
  >
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
          :isEdit="isEdit"
          @saveSuccess="handleSaveSuccess"
          @updateEditStatus="updateEditStatus"
          v-bind="$attrs"
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
          :isEdit="isEdit"
          @saveSuccess="handleSaveSuccess"
          @updateEditStatus="updateEditStatus"
          v-bind="$attrs"
        />
      </el-tab-pane>
    </template>
    <!-- 知识评论 -->
    <el-tab-pane v-if="!isHistory">
      <span slot="label">知识评论</span>
      <knowledge-comment></knowledge-comment>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { getModelAndData } from '@/api/knowledgeData'
import ContentContainer from './components/ContentContainer'
import { handleGetKnowledgeModelAndDataResponse } from '@/utils/responseHelper'
import KnowledgeComment from './components/KnowledgeComment.vue'

export default {
  name: 'KnowledgeTabs',
  components: {
    ContentContainer,
    KnowledgeComment
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
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
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
      handler(val) {
        if (!val) {
          return
        }
        this.setData(val)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleSaveSuccess() {
      // location.reload()
      this.update()
    },
    update(ver) {
      this.isLoading = true
      getModelAndData({ id: this.id, ver }).then(res => {
        const data = handleGetKnowledgeModelAndDataResponse(res.content)
        this.setData(data)
        // const { baseData } = data
        this.$emit('updateBaseData', data)
        this.isLoading = false
      })
    },
    setData(val) {
      const { baseData, formData, formConfig } = val
      this.baseData = baseData
      this.formData = formData
      this.formConfig = formConfig
    },
    updateEditStatus(status) {
      this.$emit('update:isEdit', status)
    }
  },
  mounted() {
    if (this.$route.query.edit) {
      this.updateEditStatus(true)
    }
    if (this.editType) {
      this.updateEditStatus(true)
    }
  }
}
</script>
