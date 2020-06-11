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
          v-for="field in config.datas"
          :key="field.fieldName"
          :span="field.span ? field.span : 12"
        >
          <el-form-item
            :label="field.displayName"
            label-width="100px"
            class="field-container"
          >
            <!-- 视图模式 -->
            <template v-if="isViewMode">
              <template v-if="field.htmlType === -1"></template>
              <!-- 字典类型显示（单选框，复选框，下拉框） -->
              <template
                v-else-if="
                  field.htmlType === 1 ||
                    field.htmlType === 3 ||
                    field.htmlType === 8
                ">
                <!-- <dict-display
                  :value="model[field.fieldName]"
                  :dictId="field.fieldType"
                /> -->
              </template>
              <!-- 布尔显示 -->
              <template v-else-if="field.htmlType === 2">
                {{ model[field.fieldName] ? "是" : "否" }}
              </template>
              <!-- 时间显示 -->
              <template v-else-if="field.htmlType === 11"
                >{{ model[field.fieldName] | dateTime }}
              </template>
              <!-- 密级显示 -->
              <template v-else-if="field.htmlType === 98">
                {{ secretLevels[model[field.fieldName] / 10 - 1].label }}
              </template>
              <!-- 标签显示 -->
              <template v-else-if="field.htmlType === 99">
                <!-- {{ showArray(model[field.fieldName], "label") }} -->
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
                <template v-if="field.fieldType === '1'">
                  <el-input-number
                    v-model="model[field.fieldName]"
                    :disabled="Boolean(field.fieldfixed)"
                    step-strictly
                  />
                </template>
                <!-- 字段类型浮点数 -->
                <template v-else-if="field.fieldType === '2'">
                  <el-input-number
                    v-model="model[field.fieldName]"
                    :disabled="Boolean(field.fieldfixed)"
                    :precision="field.precision"
                    :step="1 / Math.pow(10, field.precision)"
                    step-strictly
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
              <!-- 单选框 -->
              <template v-else-if="field.htmlType === 1">
                <dict-select
                  v-model="model[field.fieldName]"
                  :dictId="field.fieldType"
                  type="radio"
                />
              </template>
              <!-- 布尔框 -->
              <template v-else-if="field.htmlType === 2">
                <el-checkbox v-model="model[field.fieldName]"></el-checkbox>
              </template>
              <!-- 复选框 -->
              <template v-else-if="field.htmlType === 8">
                <dict-select
                  v-model="model[field.fieldName]"
                  :dictId="field.fieldType"
                  type="checkbox"
                />
              </template>
              <!-- 下拉菜单 -->
              <template v-else-if="field.htmlType === 3">
                <dict-select
                  v-model="model[field.fieldName]"
                  :dictId="field.fieldType"
                />
              </template>
              <!-- 多行文本编辑框 -->
              <template v-else-if="field.htmlType === 9">
                <el-input
                  type="textarea"
                  v-model="model[field.fieldName]"
                  :disabled="Boolean(field.fieldfixed)"
                  resize="none"
                  rows="3"
                />
              </template>
              <!-- 日期时间选择框 -->
              <template v-else-if="field.htmlType === 11">
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
                <!-- <knowledge-labels-input
                  v-model="model[field.fieldName]"
                  :classificationid="model.baseid"
                ></knowledge-labels-input> -->
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
import DictSelect from '@/components/Input/DictSelect'
import DictDisplay from '@/components/DictDisplay'

export default {
  name: 'DynamicForm',
  components: {
    KnowledgeLabelsInput,
    SecretLevelInput,
    DictSelect,
    DictDisplay
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
      this.$refs.KnowledgeForm.validate(valid => {
        const data = valid ? this.model : false
        this.$emit('save', { key: this.config.id, value: data })
      })
    },
    resetView () {
      this.model = _.clone(this.formData)
    },
    // 数组显示
    showArray (arr, key = 'name') {
      return arr.map(item => item[key]).join(', ')
    }
  }
}
</script>

<style scoped>
/* .field-container {
  border: 0.5px solid #000;
} */
.el-form {
  margin: 0;
}
</style>
