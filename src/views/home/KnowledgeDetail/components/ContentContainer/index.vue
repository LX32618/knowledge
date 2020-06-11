<template>
  <el-row class="content-container">
    <el-col :span="19">
      <el-card>
        <!-- 功能按钮 -->
        <el-button-group>
          <template v-if="isViewMode">
            <el-button type="primary" icon="el-icon-share" @click="share"
              >分享</el-button
            >
            <el-button type="warning" icon="el-icon-edit" @click="edit"
              >编辑</el-button
            >
          </template>
          <template v-else>
            <el-button type="success" icon="fa fa-save" @click="save"
              >&nbsp;保存</el-button
            >
            <el-button type="danger" icon="el-icon-share" @click="cancel"
              >取消</el-button
            >
          </template>
        </el-button-group>
        <!-- 基础信息表 -->
        <dynamic-form
          v-if="showBase"
          ref="baseForm"
          :config="baseFormConfig"
          :formData="baseData"
          :isViewMode="isViewMode"
          @save="handleSubFormSave"
        ></dynamic-form>
        <!-- 主表 -->
        <dynamic-form
          ref="mainForm"
          :config="formConfig"
          :formData="formData.mainForm"
          :isViewMode="isViewMode"
          @save="handleSubFormSave"
        ></dynamic-form>
        <!-- 子表 -->
        <dynamic-form
          v-for="subForm of formConfig.subForm"
          :key="subForm.id"
          :ref="`Form-${subForm.id}`"
          :config="subForm"
          :isViewMode="isViewMode"
          @save="handleSubFormSave"
        ></dynamic-form>
      </el-card>
    </el-col>
    <el-col :offset="1" :span="4">
      <knowledge-push />
    </el-col>
    <!-- 分享对话框 -->
    <el-dialog :visible.sync="dialogShow" title="知识分享">
      <knowledge-share-form></knowledge-share-form>
    </el-dialog>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import KnowledgePush from './components/KnowledgePush'
import DynamicForm from '@/components/Form/DynamicForm'
import KnowledgeShareForm from './components/KnowledgeShareForm'

export default {
  name: 'KnoweledgeDetailContentContainer',
  components: {
    KnowledgePush,
    KnowledgeShareForm,
    DynamicForm
  },
  props: {
    formConfig: Object,
    showBase: Boolean,
    baseData: Object,
    formData: Object
  },
  data () {
    return {
      isViewMode: true, // ture: 查看视图  false：编辑视图
      dialogShow: false,
      editFormData: {},
    }
  },
  computed: {
    ...mapGetters([
      'baseFormConfig'
    ])
  },
  methods: {
    edit () {
      this.editFormData = {} // 将所有表单验证状态设置为 false
      this.isViewMode = false
    },
    save () {
      // 提交基础信息表
      if (this.showBase) {
        this.$refs.baseForm.save()
      }
      // 提交主表
      this.$refs.mainForm.save()
      // 提交子表
      this.formConfig.subForm.forEach(subForm => {
        const refs = this.$refs[`Form-${subForm.id}`]
        if (refs && refs.length > 0) {
          refs[0].save()
        }
      })
      for (let key of Object.keys(this.editFormData)) {
        if (!this.editFormData[key]) {
          this.$error('输入有误，请检查')
          return
        }
      }
      this.$success('保存成功')
      this.isViewMode = true
    },
    cancel () {
      // 重置基础信息表
      if (this.showBase) {
        this.$refs.baseForm.resetView()
      }
      // 重置主表
      this.$refs.mainForm.resetView()
      // 重置子表
      this.formConfig.subForm.forEach(subForm => {
        const refs = this.$refs[`Form-${subForm.id}`]
        if (refs && refs.length > 0) {
          refs[0].resetView()
        }
      })
      this.isViewMode = true
    },
    share () {
      this.dialogShow = true
    },
    handleSubFormSave (data) {
      this.editFormData[data.key] = data.value
    }
  }
}
</script>

<style scoped>
.content-container {
  width: 1200px;
  margin: 40px auto;
}
</style>
