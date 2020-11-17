<template>
  <div>
    <el-form
      ref="dynamic-form"
      :model="models"
      :rules="rules"
      :label-position="formConfig.labelPosition"
      :label-width="`${formConfig.labelWidth}px`"
      :size="formConfig.size">
      <el-row :gutter="10">
        <el-col
          v-for="field of fields"
          :key="field.id"
          :span="field.span ? field.span : formConfig.span"
          :style="colStyle(formConfig, field)">
          <dynamic-form-item
            :field="field"
            :data.sync="models"></dynamic-form-item>
        </el-col>
      </el-row>
      <slot></slot>
    </el-form>
  </div>
</template>

<script>
import DynamicFormItem from './DynamicFormItem'
import _ from 'lodash'

export default {
  name: 'DynamicForm',
  components: {
    DynamicFormItem
  },
  props: {
    data: Object,
    formConfig: Object,
    fields: Array
  },
  data () {
    return {
      models: {},
      rules: {}
    }
  },
  watch: {
    data: {
      handler (val) {
        this.generateModels()
      },
      immediate: true
    }
  },
  methods: {
    // 列样式
    colStyle (formConfig, field) {
      return {
        // height: `${formConfig.fieldHeight}px`
      }
    },
    // 生成表单模型
    generateModels () {
      this.models = {}
      for (const field of this.fields) {
        if (this.data && Object.keys(this.data).indexOf(field.key) >= 0) {
          this.models[field.key] = _.cloneDeep(this.data[field.key])
          continue
        }
        this.models[field.key] = _.cloneDeep(field.options.defaultValue)
      }
    },
    // 提交表单
    submitForm () {
      this.$refs['dynamic-form'].validate(valid => {
        if (!valid) {
          return
        }
        this.$emit('submit', this.models)
      })
    },
    // 重置表单
    resetForm () {
      this.generateModels()
      this.$emit('reset')
    },
    // 生成验证
    generateRules () {
      const rules = {}
      for (const field of this.fields) {
        if (field.options.required) {
          rules[field.key] = [{ required: true, message: `${field.name}不能为空`, trigger: 'blur' }]
        }
      }
      this.rules = rules
    }
  },
  created () {
    this.generateModels()
    this.generateRules()
  }
}
</script>
