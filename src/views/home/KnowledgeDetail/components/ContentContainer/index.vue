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
            <el-button type="success" icon="fa fa-save" @click="save" :loading="saveButtonLoading"
              >&nbsp;保存</el-button
            >
            <el-button type="danger" icon="el-icon-share" @click="cancel"
              >取消</el-button
            >
          </template>
        </el-button-group>
        <form-making upload preview generate-code generate-json clearable>
          <template slot="action">
          </template>
        </form-making>
        <!-- 基础信息表 -->
        <!-- <dynamic-form
          v-if="showBase"
          ref="baseForm"
          :config="baseFormConfig2"
          :formData="baseData"
          :isViewMode="isViewMode"
          @save="handleSubFormSave"
        ></dynamic-form> -->
        <!-- 主表 -->
        <!-- <dynamic-form
          ref="mainForm"
          :config="convertUpperFieldName(formConfig)"
          :formData="formData.mainForm || {}"
          :isViewMode="isViewMode"
          @save="handleSubFormSave"
        ></dynamic-form> -->
        <!-- 子表 -->
        <!-- <html-form></html-form> -->
        <!-- <dynamic-form
          v-for="subForm of formConfig.subForm"
          :key="subForm.id"
          :ref="`Form-${subForm.id}`"
          :config="convertUpperFieldName(subForm)"
          :formData="getSubFormDataById(subForm.formId)"
          :isViewMode="isViewMode"
          @save="handleSubFormSave"
        ></dynamic-form> -->
        <form-generate :data="widgetForm" :value="baseData" :edit="!isViewMode"></form-generate>
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
import { saveData, saveFormData } from '@/api/knowledgeData'
import KnowledgePush from './components/KnowledgePush'
import DynamicForm from '@/components/Form/DynamicForm'
import HtmlForm from '@/components/Form/HtmlForm'
import DynamicInput from '@/components/Input/DynamicInput'
import KnowledgeShareForm from './components/KnowledgeShareForm'

export default {
  name: 'KnoweledgeDetailContentContainer',
  components: {
    KnowledgePush,
    KnowledgeShareForm,
    DynamicForm,
    HtmlForm,
    DynamicInput
  },
  props: {
    formConfig: Object,
    showBase: Boolean,
    baseData: Object,
    formData: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      isViewMode: true, // ture: 查看视图  false：编辑视图
      dialogShow: false,
      editFormData: {},
      saveButtonLoading: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        },
      },
    }
  },
  computed: {
    ...mapGetters([
      'baseFormConfig',
      'baseFormConfig2',
      'userInfo'
    ])
  },
  methods: {
    convertUpperFieldName (config) {
      if (!config || !config.datas) {
        return config
      }
      config.datas.forEach(field => {
        field.fieldName = field.fieldName.toUpperCase()
      })
      return config
    },
    getSubFormDataById (id) {
      const subFormData = this.formData.subForm.find(item => {
        return item.ID === id
      })
      return subFormData || {}
    },
    edit () {
      this.editFormData = {} // 将所有表单验证状态设置为 false
      this.isViewMode = false
    },
    createKnowledgeModel () {
      const knowledgeModel = {
        knowledgeBase: {
          id: this.$route.params.id,
          creator: this.userInfo.id
        },
        mainFormData: {},
        associatedFormData: []
      }
      Object.keys(this.editFormData).forEach(key => {
        const value = this.editFormData[key]
        if (key === '0') {
          value.labels = value.labelsEnt.join(',')
          knowledgeModel.knowledgeBase = value
        } else if (key === this.formConfig.id) {
          knowledgeModel.mainFormData = {
            formId: key,
            datas: value
          }
        } else {
          knowledgeModel.associatedFormData.push({
            formId: key,
            datas: value
          })
        }
      })
      return knowledgeModel
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
      this.saveButtonLoading = true
      const knowledgeModel = this.createKnowledgeModel()
      const saveHandler = this.showBase ? saveData : saveFormData
      saveHandler(knowledgeModel).then(res => {
        this.$success('保存成功')
        this.isViewMode = true
        this.saveButtonLoading = false
        this.$emit('saveSuccess')
      }).catch(() => {
        this.saveButtonLoading = false
      })
    },
    cancel () {
      // 重置基础信息表
      // if (this.showBase) {
      //   this.$refs.baseForm.resetView()
      // }
      // 重置主表
      // this.$refs.mainForm.resetView()
      // 重置子表
      // this.formConfig.subForm.forEach(subForm => {
      //   const refs = this.$refs[`Form-${subForm.id}`]
      //   if (refs && refs.length > 0) {
      //     refs[0].resetView()
      //   }
      // })
      this.isViewMode = true
    },
    share () {
      this.dialogShow = true
    },
    handleSubFormSave (data) {
      this.editFormData[data.key] = data.value
    }
  },
  mounted () {
    this.widgetForm.list = this.baseFormConfig
  }
}
</script>

<style scoped>
.content-container {
  width: 1200px;
  margin: 40px auto;
}
</style>
