<script>
import request from '@/utils/request'
import KnowledgeLabelsInput from '@/components/Input/KnowledgeLabelsInput'
import DictSelect from '@/components/Input/DictSelect'
import _ from 'lodash'

export default {
  name: 'DynamicFormItem',
  components: {
    DictSelect,
    KnowledgeLabelsInput
  },
  render(h) {
    return (
      <el-form-item
        vLoading={this.isLoading}
        class={{
          'dynamic-form-item': true
        }}
        label={this.field.name}
        prop={this.field.key}
      >
        {this.renderComponent(h)}
      </el-form-item>
    )
  },
  props: {
    data: Object,
    field: Object
  },
  data() {
    return {
      dataModel: this.data[this.field.key],
      isLoading: false,
      options: []
    }
  },
  computed: {},
  watch: {
    dataModel: {
      handler(val) {
        this.data[this.field.key] = val
        this.$emit('update:data', {
          ...this.data,
          [this.field.key]: val
        })
      },
      deep: true
    },
    data: {
      handler(val) {
        this.dataModel = val[this.field.key]
      },
      deep: true
    }
  },
  methods: {
    renderComponent(h) {
      switch (this.field.type) {
        case 0:
          return this.renderInput(h)
        case 9:
          return this.renderTextArea(h)
        case 2:
          return this.renderInputNumber(h)
        case 'switch':
          return this.renderSwitch(h)
        case 1:
        case 3:
        case 8:
          return this.renderDictSelect(h)
        case 'timePicker':
          return this.renderTimePicker(h)
        case 11:
          return this.renderDatePicker(h)
        case 'knowledgeLabelsInput':
          return this.renderKnowledgeLabelsInput(h)
      }
    },
    renderInput(h) {
      return <el-input vModel={this.dataModel}></el-input>
    },
    renderTextArea(h) {
      return <el-input vModel={this.dataModel} type="textarea"></el-input>
    },
    renderInputNumber(h) {
      return (
        <el-input-number
          vModel={this.dataModel}
          controls={this.field.options.controls !== 'none'}
          controls-position={this.field.options.controls}
        ></el-input-number>
      )
    },
    renderSwitch(h) {
      return <el-switch vModel={this.dataModel}></el-switch>
    },
    renderRadio(h) {
      return (
        <el-radio-group vModel={this.dataModel}>
          {this.options.map(option => {
            return <el-radio label={option.value}>{option.label}</el-radio>
          })}
        </el-radio-group>
      )
    },
    renderCheckbox(h) {
      return (
        <el-checkbox-group vModel={this.dataModel}>
          {this.options.map(option => {
            return (
              <el-checkbox label={option.value}>{option.label}</el-checkbox>
            )
          })}
        </el-checkbox-group>
      )
    },
    renderDictSelect(h) {
      let type
      if (this.field.type === 1) {
        type = 'radio'
      } else if (this.field.type === 8) {
        type = 'checkbox'
      }
      return (
        <dict-select
          vModel={this.dataModel}
          dictId={this.field.fieldInfo.id}
          type={type}
        ></dict-select>
      )
    },
    renderTimePicker(h) {
      return <el-time-picker vModel={this.dataModel}></el-time-picker>
    },
    renderDatePicker(h) {
      return (
        <el-date-picker
          vModel={this.dataModel}
          type={this.field.options.type}
          style="width: 100%"
        ></el-date-picker>
      )
    },
    renderKnowledgeLabelsInput(h) {
      return (
        <knowledge-labels-input
          vModel={this.dataModel}
          data={this.field.options.options}
        ></knowledge-labels-input>
      )
    }
  },
  created() {
    if (
      this.field.type === 'radio' ||
      this.field.type === 'checkbox' ||
      this.field.type === 'select'
    ) {
      // 远程获取选项数据
      if (this.field.options.remote) {
        const options = this.field.options
        const params = {}
        options.requestParams.forEach(item => {
          // 提出键值为空的参数
          if (item.key && (item.value !== null || item.value !== undefined)) {
            params[item.key] = item.value
          }
        })
        request({
          url: options.remoteUrl,
          methods: 'get',
          params
        }).then(res => {
          this.isLoading = false
          const paths = options.responsePath.split('.')
          let data = res
          paths.forEach(path => {
            data && (data = data[path])
          })
          data = data.map(item => {
            return {
              label: item[options.props.label],
              value: item[options.props.value]
            }
          })
          this.options = data
        })
      } else {
        this.options = _.cloneDeep(this.field.options.options)
      }
    }
  }
}
</script>

<style scoped></style>
