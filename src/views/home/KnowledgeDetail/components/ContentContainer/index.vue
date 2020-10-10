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
        <!-- 基础信息表 -->
        <form-generate 
          v-if="showBase"
          ref="baseForm"
          :data="widgetForm"
          :value="baseData"
          :edit="!isViewMode"></form-generate>
         <!-- 实体表单 -->
         <form-generate
          ref="mainForm"
          :data="mainFormConfig"
          :value="formModel"
          :edit="!isViewMode">
         </form-generate>
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
import KnowledgeShareForm from './components/KnowledgeShareForm'
import _ from 'lodash'

export default {
  name: 'KnoweledgeDetailContentContainer',
  components: {
    KnowledgePush,
    KnowledgeShareForm,
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
      mainValue: {}
    }
  },
  computed: {
    ...mapGetters([
      'baseFormConfig',
      'userInfo'
    ]),
    mainFormConfig () {
      return this.convertFormConfig(this.formConfig)
    },
    formModel () {
      let model = {}
      const mainForm = this.formData.mainForm
      const subForm = this.formData.subForm
      const omitArray = ['BASEID', 'CREATEDATE', 'CREATERID', 'ISDELETE', 'PORDER', 'VER']
      if (mainForm && mainForm.datas) {
        model = {
          ..._.omit(mainForm.datas, omitArray)
        }
      }
      if (subForm) {
        subForm.forEach(item => {
          model[`table_${item.formId}`] = item.data.map(subData => _.omit(subData, omitArray))
        })
      }
      return model
    }
  },
  methods: {
    convertFormConfig (config) {
      if (config && config.datas && config.datas[0] && config.datas[0].content) {
        return JSON.parse(config.datas[0].content)
      }
      return {}
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
        knowledgeBase: {},
        mainFormData: {},
        subForms: []
      }
      Object.keys(this.editFormData).forEach(key => {
        const value = _.cloneDeep(this.editFormData[key])
        if (key === 'base') {
          knowledgeModel.knowledgeBase = {
            id: this.$route.params.id,
            creator: this.userInfo.id,
            ...value
          }
        } else {
          knowledgeModel.mainFormData = {
            formId: this.formConfig.id,
            datas: {}
          }
          Object.keys(value).forEach(valueKey => {
            if (valueKey.startsWith("table_") && valueKey.length === 38) {
              const subFormKey = valueKey.split('_')[1]
              const subFormData = {
                formId: subFormKey,
                datas: value[valueKey]
              }
              knowledgeModel.subForms.push(subFormData)
            } else {
              knowledgeModel.mainFormData.datas[valueKey] = value[valueKey]
            }
          })
        }
      })
      return knowledgeModel
    },
    async save () {
      this.editFormData = {
        base: {},
        main: {}
      }
      // 提交基础信息表
      if (this.showBase) {
        this.editFormData.base = await this.$refs.baseForm.getData()
      }
      // 提交主表
      this.editFormData.main = await this.$refs.mainForm.getData()
      console.log(this.editFormData)
      this.saveButtonLoading = true
      const knowledgeModel = this.createKnowledgeModel()
      console.log(knowledgeModel)
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
      if (this.showBase) {
        this.$refs.baseForm.reset()
      }
      // 重置主表
      this.$refs.mainForm.reset()
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
