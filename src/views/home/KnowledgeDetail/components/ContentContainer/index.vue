<template>
  <el-row class="content-container">
    <el-col :span="19">
      <el-card>
        <!-- 功能按钮 -->
        <el-button-group>
          <template v-if="isViewMode">
            <el-button type="primary" icon="el-icon-share">分享</el-button>
            <el-button
              type="warning"
              icon="el-icon-edit"
              @click="isViewMode = false"
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
        ></dynamic-form>
        <!-- 主表 -->
        <dynamic-form
          ref="mainForm"
          :config="formConfig"
          :isViewMode="isViewMode"
        ></dynamic-form>
        <!-- 子表 -->
        <dynamic-form
          v-for="subForm of formConfig.subForms"
          :key="subForm.id"
          :ref="`Form-${subForm.id}`"
          :config="subForm"
          :isViewMode="isViewMode"
        ></dynamic-form>
      </el-card>
    </el-col>
    <el-col :offset="1" :span="4">
      <knowledge-push />
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import KnowledgePush from './components/KnowledgePush'
import DynamicForm from '@/components/Form/DynamicForm'

export default {
  name: 'KnoweledgeDetailContentContainer',
  components: {
    KnowledgePush,
    DynamicForm
  },
  props: {
    formConfig: Object,
    showBase: Boolean,
    baseData: Object
  },
  data () {
    return {
      isViewMode: true // ture: 查看视图  false：编辑视图
    }
  },
  computed: {
    ...mapGetters([
      'baseFormConfig'
    ])
  },
  methods: {
    save () {
      // 提交基础信息表
      if (this.showBase) {
        this.$refs.baseForm.save()
      }
      // 提交主表
      this.$refs.mainForm.save()
      // 提交子表
      this.formConfig.subForms.forEach(subForm => {
        const refs = this.$refs[`Form-${subForm.id}`]
        if (refs && refs.length > 0) {
          refs[0].save()
        }
      })
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
      this.formConfig.subForms.forEach(subForm => {
        const refs = this.$refs[`Form-${subForm.id}`]
        if (refs && refs.length > 0) {
          refs[0].resetView()
        }
      })
      this.isViewMode = true
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
