<template>
  <div>
    <el-form ref="KnowledgeForm" :model="model">
      <!-- 表单标题 -->
      <el-form-item>
        <h3>{{ config.formName }}</h3>
      </el-form-item>
      <el-form-item>
        <!-- 表单域 -->
        <el-col
          v-for="field in config.fields"
          :key="field.fieldName"
          :span="field.span ? field.span : 12"
        >
          <el-form-item :label="field.displayName" label-width="100px">
            <!-- 视图模式 -->
            <template v-if="isViewMode">
              <template v-if="field.htmlType === -1"></template>
              <template v-else-if="field.htmlType === 10"
                >{{ model[field.fieldName] | dateFormat(field.fieldType) }}
              </template>
              <!-- 密级显示 -->
              <template v-else-if="field.htmlType === 98">
                {{ secretLevels[model[field.fieldName] / 10 - 1].label }}
              </template>
              <!-- 默认显示 -->
              <template v-else>
                {{ model[field.fieldName] }}
              </template>
            </template>
            <!-- 编辑模式 -->
            <template v-else>
              <!-- 文本编辑框 -->
              <template v-if="field.htmlType === 0">
                <!-- 字段类型整数 -->
                <template v-if="field.fieldType === 'int'">
                  <el-input-number
                    v-model="model[field.fieldName]"
                    :disabled="Boolean(field.fieldfixed)"
                  />
                </template>
                <!-- 字段类型浮点数 -->
                <template v-else-if="field.fieldType === 'float'">
                  <el-input-number
                    v-model="model[field.fieldName]"
                    :disabled="Boolean(field.fieldfixed)"
                  />
                </template>
                <!-- 字段类型文本 -->
                <template v-else>
                  <el-input
                    v-model="model[field.fieldName]"
                    :disabled="Boolean(field.fieldfixed)"
                  ></el-input>
                </template>
              </template>
              <!-- 多行文本编辑框 -->
              <template v-else-if="field.htmlType === 9">
                <el-input
                  type="textarea"
                  v-model="model[field.fieldName]"
                  :disabled="Boolean(field.fieldfixed)"
                />
              </template>
              <!-- 日期时间选择框 -->
              <template v-else-if="field.htmlType === 10">
                <el-date-picker
                  type="datetime"
                  v-model="model[field.fieldName]"
                  :disabled="Boolean(field.fieldfixed)"
                />
              </template>
              <!-- 密级选择框 -->
              <template v-else-if="field.htmlType === 98">
                <secret-level-input v-model="model[field.fieldName]" />
              </template>
              <!-- 标签选择框 -->
              <template v-else-if="field.htmlType === 99">
                <knowledge-labels-input
                  v-model="model[field.fieldName]"
                  :classificationid="model.baseid"
                ></knowledge-labels-input>
              </template>
            </template>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import KnowledgeLabelsInput from '@/components/Input/KnowledgeLabelsInput'
import SecretLevelInput from '@/components/Input/SecretLevelInput'

export default {
  name: 'DynamicForm',
  components: {
    KnowledgeLabelsInput,
    SecretLevelInput
  },
  props: {
    config: Object,
    formData: {
      type: Object,
      default: () => ({})
    },
    isViewMode: Boolean
  },
  data () {
    return {
      model: _.clone(this.formData),
    }
  },
  computed: {
    ...mapGetters([
      'secretLevels'
    ])
  },
  methods: {
    save () {
      console.log('save')
    },
    resetView () {
      this.model = _.clone(this.formData)
    }
  }
}
</script>

<style scoped>
</style>
