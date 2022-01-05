<template>
  <el-row class="content-container">
    <el-col :span="19">
      <el-card>
        <!-- 功能按钮 -->
        <el-button-group>
          <template v-if="!isHistory">
            <template v-if="!isEdit">
              <el-button type="primary" icon="el-icon-share" @click="share"
                >分享</el-button
              >
              <el-button
                v-if="auditStatus !== '-1' && editPermission"
                type="warning"
                icon="el-icon-edit"
                @click="edit"
                >编辑</el-button
              >
              <el-popconfirm title="确定要删除知识?" @onConfirm="handleDelete">
                <el-button
                  slot="reference"
                  v-if="
                    auditStatus !== '-1' &&
                      auditStatus !== '-2' &&
                      baseData.creator === userInfo.id
                  "
                  type="danger"
                  icon="el-icon-delete"
                  :loading="deleteLoading"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
            <template v-else>
              <el-button
                type="success"
                icon="fa fa-save"
                @click="save"
                :loading="saveButtonLoading"
                >&nbsp;保存</el-button
              >
              <el-button type="danger" icon="el-icon-share" @click="cancel"
                >取消</el-button
              >
            </template>
          </template>
        </el-button-group>
        <!-- 基础信息表 -->
        <form-generate
          v-if="showBase"
          ref="baseForm"
          :data="widgetForm"
          :value="baseData"
          :edit="isEdit"
        ></form-generate>
        <!-- 实体表单 -->
        <form-generate
          ref="mainForm"
          :data="mainFormConfig"
          :value="formModel"
          :edit="isEdit"
        >
        </form-generate>
      </el-card>
    </el-col>
    <el-col :offset="1" :span="4">
      <!-- <knowledge-push /> -->
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
import { knowledgeDelete, fetchProcessId } from '@/api/flow'
import { deleteKnowledge } from '@/api/knowledgeBase'
import _ from 'lodash'

export default {
  name: 'KnoweledgeDetailContentContainer',
  components: {
    KnowledgePush,
    KnowledgeShareForm
  },
  provide() {
    return {
      contentContainer: this
    }
  },
  props: {
    formConfig: Object,
    showBase: Boolean,
    baseData: Object,
    editType: Number,
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    isHistory: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean, // ture: 查看视图  false：编辑视图
      default: false
    },
    editPermission: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogShow: false,
      editFormData: {},
      saveButtonLoading: false,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        }
      },
      mainValue: {},
      deleteLoading: false,
      auditStatus: null
    }
  },
  computed: {
    ...mapGetters(['baseFormConfig', 'userInfo']),
    mainFormConfig() {
      return this.convertFormConfig(this.formConfig)
    },
    formModel() {
      let model = {}
      const mainForm = this.formData.mainForm
      const subForm = this.formData.subForm
      const omitArray = [
        'BASEID',
        'CREATEDATE',
        'CREATERID',
        'ISDELETE',
        'PORDER',
        'VER'
      ]
      if (mainForm && mainForm.datas) {
        model = {
          ..._.omit(mainForm.datas, omitArray)
        }
      }
      if (subForm) {
        subForm.forEach(item => {
          model[`table_${item.formId}`] = item.data
            ? item.data.map(subData => _.omit(subData, omitArray))
            : []
        })
      }
      model.knowledgeId = this.baseData.id
      return model
    }
  },
  watch: {
    'baseData.auditStatus': {
      handler(val) {
        this.auditStatus = val
      },
      immediate: true
    }
  },
  methods: {
    convertFormConfig(config) {
      if (
        config &&
        config.datas &&
        config.datas[0] &&
        config.datas[0].content
      ) {
        return JSON.parse(config.datas[0].content)
      }
      return {}
    },
    getSubFormDataById(id) {
      const subFormData = this.formData.subForm.find(item => {
        return item.ID === id
      })
      return subFormData || {}
    },
    edit() {
      this.editFormData = {} // 将所有表单验证状态设置为 false
      this.updateEditStatus(true)
    },
    async handleDelete() {
      const id = this.$route.params.id
      this.deleteLoading = true
      try {
        const { content } = await fetchProcessId(id, 'remove')
        if (!content) {
          const { content, message } = await deleteKnowledge({ id })
          if (content) {
            this.$success(message)
            this.$router.push('/')
          }
          return
        }
        const res = await knowledgeDelete(content.processDefId, id)
        const { success, msg } = res
        if (success) {
          this.auditStatus = '-2'
          this.$success(msg)
        }
      } catch (err) {
        this.$error(err)
      } finally {
        this.deleteLoading = false
      }
    },
    createKnowledgeModel() {
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
            creator: this.baseData.creator,
            lastupdUser: this.userInfo.id,
            ...value
          }
        } else {
          knowledgeModel.mainFormData = {
            formId: this.formConfig.id,
            datas: {}
          }
          Object.keys(value).forEach(valueKey => {
            if (valueKey.startsWith('table_') && valueKey.length === 38) {
              const subFormKey = valueKey.slice(6)
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
    async save() {
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
      this.saveButtonLoading = true
      const knowledgeModel = this.createKnowledgeModel()
      // const saveHandler = this.showBase ? saveData : saveFormData
      const saveHandler = saveData
      saveHandler(knowledgeModel)
        .then(res => {
          this.$success('保存成功')
          this.updateEditStatus(false)
          this.saveButtonLoading = false
          this.$emit('saveSuccess')
        })
        .catch(() => {
          this.saveButtonLoading = false
        })
    },
    cancel() {
      // 重置基础信息表
      if (this.showBase) {
        this.$refs.baseForm.reset()
      }
      // 重置主表
      this.$refs.mainForm.reset()
      this.updateEditStatus(false)
    },
    share() {
      this.dialogShow = true
    },
    handleSubFormSave(data) {
      this.editFormData[data.key] = data.value
    },
    updateEditStatus(status) {
      this.$emit('updateEditStatus', status)
    }
  },
  mounted() {
    this.widgetForm.list = this.baseFormConfig
    if (this.editType) {
      this.updateEditStatus(true)
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
