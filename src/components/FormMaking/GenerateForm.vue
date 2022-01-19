<template>
  <div class="generateForm">
    <el-form
      ref="generateForm"
      label-suffix=":"
      :size="data.config && data.config.size"
      :model="models"
      :rules="rules"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
    >
      <template v-for="item in data.list">
        <template v-if="item.type == 'grid'">
          <el-row
            :key="item.key"
            type="flex"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
          >
            <el-col
              v-for="(col, colIndex) in item.columns"
              :key="colIndex"
              :span="item.options.rowConfig == 'span' ? col.span : undefined"
              :style="{ width: rowPercent(item, col.scale) }"
            >
              <template v-for="citem in col.list">
                <el-form-item
                  v-if="citem.type == 'blank'"
                  :label="citem.name"
                  :prop="citem.model"
                  :key="citem.key"
                >
                  <slot :name="citem.model" :model="models"></slot>
                </el-form-item>
                <genetate-form-item
                  v-else
                  :key="citem.key"
                  :models.sync="models"
                  :remote="remote"
                  :rules="rules"
                  :widget="citem"
                  :edit="edit"
                  :preview="preview"
                  @input-change="onInputChange"
                  :options="options"
                >
                </genetate-form-item>
              </template>
            </el-col>
          </el-row>
        </template>

        <template v-else-if="item.type == 'table'">
          <el-form-item :key="item.key" :label="item.name" :prop="item.model">
            <div class="form-table">
              <el-table :data="models[item.model]" border>
                <span slot="empty"></span>
                <el-table-column label="#" width="50" fixed>
                  <template slot-scope="{ $index }">
                    <div
                      @mouseenter="hoverIndex = item.key + $index"
                      @mouseleave="hoverIndex = ''"
                      style="width: 100%;"
                    >
                      <i
                        v-if="hoverIndex === item.key + $index"
                        class="el-icon-remove delete-icon"
                        @click="models[item.model].splice($index, 1)"
                      ></i>
                      <span v-else>{{ $index + 1 }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="column in item.tableColumns"
                  :key="column.key"
                  :label="column.name"
                  :prop="column.model"
                  :width="column.options.width"
                >
                  <template slot-scope="{ row }">
                    <genetate-form-item
                      :table="true"
                      :models.sync="row"
                      :widget="column"
                      :edit="edit"
                    ></genetate-form-item>
                  </template>
                </el-table-column>
              </el-table>
              <el-button
                v-if="edit"
                type="text"
                icon="el-icon-plus"
                @click="handleRowAppend(item)"
                >添加</el-button
              >
            </div>
          </el-form-item>
        </template>

        <template v-else-if="item.type == 'blank'">
          <el-form-item :label="item.name" :prop="item.model" :key="item.key">
            <slot :name="item.model" :model="models"></slot>
          </el-form-item>
        </template>

        <template v-else>
          <genetate-form-item
            :key="item.key"
            :models.sync="models"
            :rules="rules"
            :widget="item"
            :edit="edit"
            :preview="preview"
            @input-change="onInputChange"
            :remote="remote"
            :options="options"
          >
          </genetate-form-item>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>
import GenetateFormItem from './GenerateFormItem'

export default {
  name: 'fm-generate-form',
  components: {
    GenetateFormItem
  },
  props: ['data', 'remote', 'value', 'insite', 'edit', 'preview'],
  data() {
    return {
      models: {},
      rules: {},
      options: {},
      hoverIndex: ''
    }
  },
  created() {
    this.generateModle(this.data.list)
  },
  mounted() {},
  methods: {
    generateModle(genList) {
      this.options.classification = this.value.classification
      this.options.knowledgeId = this.value.knowledgeId
      if (!genList) return
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach(item => {
            this.generateModle(item.list)
          })
        } else if (genList[i].type === 'text') {
          continue
        } else if (
          genList[i].type === 'imgupload' ||
          genList[i].type === 'upload'
        ) {
          this.models[genList[i].model] = this.value[genList[i].model] || ''
        } else if (genList[i].type === 'table') {
          if (
            this.value &&
            Object.keys(this.value).indexOf(genList[i].model) >= 0
          ) {
            this.models[genList[i].model] = this.value[genList[i].model]
          } else {
            this.models[genList[i].model] = []
          }
        } else if (genList[i].type === 'viewBtn') {
          const value = this.value[genList[i].model]
          this.models[genList[i].model] = value ? JSON.parse(value) : null
        } else if(genList[i].type === 'link')
        {
          const value = this.value[genList[i].model];
          this.models[genList[i].model] = value ? JSON.parse(value) : {url:"",title:""};
        }
        else {
          if (
            this.value &&
            Object.keys(this.value).indexOf(genList[i].model) >= 0
          ) {
            this.models[genList[i].model] = this.value[genList[i].model]
          } else {
            if (genList[i].type === 'blank') {
              this.$set(
                this.models,
                genList[i].model,
                genList[i].options.defaultType === 'String'
                  ? ''
                  : genList[i].options.defaultType === 'Object'
                  ? {}
                  : []
              )
            }
            else {
              this.models[genList[i].model] = genList[i].options.defaultValue
            }
          }
          if (this.rules[genList[i].model]) {
            this.rules[genList[i].model] = [
              ...this.rules[genList[i].model],
              ...genList[i].rules.map(item => {
                if (item.pattern) {
                  return { ...item, pattern: eval(item.pattern) }
                } else {
                  return { ...item }
                }
              })
            ]
          } else {
            this.rules[genList[i].model] = [
              ...genList[i].rules.map(item => {
                if (item.pattern) {
                  return { ...item, pattern: eval(item.pattern) }
                } else {
                  return { ...item }
                }
              })
            ]
          }
        }
      }
      // 传入类别以生成标签选择器
      // console.log(this.value.labelsEnt)
      // if (this.models.labels || this.models.labels === []) {
      //   console.log(1)
      //   this.models.classification = this.value.classification
      // }
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.$refs.generateForm.validate(valid => {
          if (valid) {
            resolve(this.models)
          } else {
            reject(new Error('表单数据校验失败').message)
          }
        })
      })
    },
    reset() {
      this.$refs.generateForm.resetFields()
      this.generateModle(this.data.list)
    },
    onInputChange(value, field) {
      this.$emit('on-change', field, value, this.models)
    },
    refresh() {},
    handleRowAppend(config) {
      const row = {}
      for (let i = 0; i < config.tableColumns.length; ++i) {
        const key = config.tableColumns[i].model
        row[key] = config.tableColumns[i].options.defaultValue
      }
      this.models[config.model].push(row)
    }
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.generateModle(val.list)
      }
    },
    value: {
      deep: true,
      handler(val) {
        // console.log(JSON.stringify(val))
        this.models = { ...this.models, ...val }
      }
    }
  },
  computed: {
    rowPercent(element, scale) {
      return function(element, scale) {
        if (element.type == 'grid') {
          if (element.options.rowConfig == 'scale') {
            let total =
              element.options.blank +
              element.columns.reduce((s, d) => {
                return s + d.scale
              }, 0)
            return (scale / total) * 100 + '%'
          } else {
            return undefined
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '../styles/cover.scss';
.delete-icon {
  color: #f56c6c;
  font-size: 20px;
}
</style>

<style>
.form-table .el-table__empty-block {
  display: none;
}
.generateForm .el-input.is-disabled .el-input__inner {
  background-color: white;
  border-color: #dcdfe6;
  color: #606266;
}
.generateForm .el-textarea.is-disabled .el-textarea__inner {
  background-color: white;
  border-color: #dcdfe6;
  color: #606266;
}
.generateForm .is-disabled {
  cursor: not-allowed;
}
</style>
