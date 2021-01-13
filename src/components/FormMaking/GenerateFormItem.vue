<template>
  <el-form-item
    :label="table || widget.type == 'text' ? '' : widget.name"
    :prop="widget.model"
    :label-width="table ? '0px' : undefined"
    :style="{
      'margin-bottom': table ? 0 : '18px'
    }">
    <template v-if="widget.type == 'input'" >
      <el-input
        v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
        type="number"
        v-model.number="dataModel"
        :placeholder="widget.options.placeholder"
        :style="{width: widgetWidth}"
        :disabled="isDisabled"
      ></el-input>
      <el-input
        v-else
        :type="widget.options.dataType"
        v-model="dataModel"
        :disabled="isDisabled"
        :placeholder="widget.options.placeholder"
        :style="{width: widgetWidth}"
      ></el-input>
    </template>

    <template v-if="widget.type == 'textarea'">
      <el-input type="textarea" :rows="5"
        v-model="dataModel"
        :disabled="isDisabled"
        :placeholder="widget.options.placeholder"
        :style="{width: widgetWidth}"
      ></el-input>
    </template>

    <template v-if="widget.type == 'number'">
      <el-input-number
        v-model="dataModel"
        :style="{width: widgetWidth}"
        :step="widget.options.step"
        controls-position="right"
        :disabled="isDisabled"
      ></el-input-number>
    </template>


    <template v-if="widget.type == 'radio'">
      <dict-select v-model="dataModel"
                   :type="'radio'"
                   :dict-id="widget.options.dictId"
                   :disabled="isDisabled"
                   :style="{width: widget.options.width}"></dict-select>
    </template>

    <template v-if="widget.type == 'checkbox'">
      <dict-select v-model="dataModel"
                   :type="'checkbox'"
                   :dict-id="widget.options.dictId"
                   :disabled="isDisabled"
                   :style="{width: widget.options.width}"></dict-select>
    </template>

    <template v-if="widget.type == 'select'">
      <dict-select v-model="dataModel"
                   :type="'select'"
                   :dict-id="widget.options.dictId"
                   :disabled="isDisabled"
                   :clearable="widget.options.clearable"
                   :placeholder="widget.options.placeholder"
                   :filterable="widget.options.filterable"
                   :style="{width: widget.options.width}"></dict-select>
    </template>


<!--    <template v-if="widget.type == 'radio'">
      <el-radio-group v-model="dataModel"
        :style="{width: widgetWidth}"
        :disabled="isDisabled"
      >
        <el-radio
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="index"
        >
          <template v-if="widget.options.remote">{{item.label}}</template>
          <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
        </el-radio>
      </el-radio-group>
    </template>-->

<!--    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group v-model="dataModel"
        :style="{width: widgetWidth}"
        :disabled="isDisabled"
      >
        <el-checkbox

          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value" v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="index"
        >
          <template v-if="widget.options.remote">{{item.label}}</template>
          <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
        </el-checkbox>
      </el-checkbox-group>
    </template>-->

    <template v-if="widget.type == 'time'">
      <el-time-picker
        v-model="dataModel"
        :is-range="widget.options.isRange"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="isDisabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :arrowControl="widget.options.arrowControl"
        :value-format="widget.options.format"
        :style="{width: widgetWidth}"
      >
      </el-time-picker>
    </template>

    <template v-if="widget.type=='date'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="isDisabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.format"
        :format="widget.options.format"
        :style="{width: widgetWidth}"
      >
      </el-date-picker>
    </template>

    <template v-if="widget.type =='rate'">
      <el-rate v-model="dataModel"
        :max="widget.options.max"
        :disabled="isDisabled"
        :allow-half="widget.options.allowHalf"
      ></el-rate>
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker
        v-model="dataModel"
        :disabled="isDisabled"
        :show-alpha="widget.options.showAlpha"
      ></el-color-picker>
    </template>

<!--    <template v-if="widget.type == 'select'">
      <el-select
        v-model="dataModel"
        :disabled="isDisabled"
        :multiple="widget.options.multiple"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widgetWidth}"
        :filterable="widget.options.filterable"
      >
        <el-option v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="item.value" :value="item.value" :label="widget.options.showLabel || widget.options.remote?item.label:item.value"></el-option>
      </el-select>
    </template>-->

    <template v-if="widget.type=='switch'">
      <el-switch
        v-model="dataModel"
        :disabled="isDisabled"
        :active-value="1"
        :inactive-value="0"
      >
      </el-switch>
    </template>

    <template v-if="widget.type=='slider'">
      <el-slider
        v-model="dataModel"
        :min="widget.options.min"
        :max="widget.options.max"
        :disabled="isDisabled"
        :step="widget.options.step"
        :show-input="widget.options.showInput"
        :range="widget.options.range"
        :style="{width: widgetWidth}"
      ></el-slider>
    </template>

    <template v-if="widget.type=='imgupload'">
      <fm-upload
        v-model="dataModel"
        :disabled="isDisabled"
        :style="{'width': widgetWidth}"
        :width="widget.options.size.width"
        :height="widget.options.size.height"
        :token="widget.options.token"
        :domain="widget.options.domain"
        :multiple="widget.options.multiple"
        :length="widget.options.length"
        :is-qiniu="widget.options.isQiniu"
        :is-delete="widget.options.isDelete"
        :min="widget.options.min"
        :is-edit="widget.options.isEdit"
        :action="widget.options.action"
      >
      </fm-upload>
    </template>

    <template v-if="widget.type=='upload'">
      <file-upload
        v-model="dataModel"
        :auto-upload="!preview"
        :btnTitle="widget.options.btnTitle"
        :upload-url="widget.options.uploadUrl"
        :accept="widget.options.accept"
        :limit="widget.options.limit"
        :multiple="widget.options.multiple"
        :tips="widget.options.tips"
        :disabled="isDisabled"
        :edit="edit"
        :knowledge-id="options.knowledgeId">
      </file-upload>
    </template>

    <template v-if="widget.type == 'viewBtn'">
      {{dataModel}}
      <fm-view-btn
              :tagData.sync="dataModel"
              :multiple="widget.options.multiple"
              :disabled="isDisabled"
              :edit="edit">
      </fm-view-btn>
    </template>

    <template v-if="widget.type == 'link'">
      <fm-link
              :linkData.sync="dataModel"
              :type="widget.options.type"
              :blank="widget.options.blank"
              :underline="widget.options.underline"
              :disabled="isDisabled"
              :edit="edit">
      </fm-link>
    </template>

    <template v-if="widget.type == 'editor'">
      <vue-editor
        v-model="dataModel"
        :style="{width: widgetWidth}"
      >
      </vue-editor>
    </template>

    <template v-if="widget.type == 'cascader'">
      <el-cascader
        v-model="dataModel"
        :disabled="isDisabled"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widgetWidth}"
        :options="widget.options.remoteOptions"
      >
      </el-cascader>
    </template>

    <template v-if="widget.type == 'text'">
      <h2>{{widget.name}}</h2>
    </template>

    <template v-if="widget.type == 'secrectSelect'">
      <secretLevel-input
        v-model="dataModel"
        :disabled="isDisabled"></secretLevel-input>
    </template>

    <template v-if="widget.type == 'labelSelect'">
      <form-labels-input
        v-model="dataModel"
        :classificationId="options.classification"
        :disabled="isDisabled"
      ></form-labels-input>
    </template>
  </el-form-item>
</template>

<script>
import FmUpload from './Upload'
import FileUpload from './FileUpload'
import FmViewBtn from './ViewBtn'
import FmLink from './Link'
import DictSelect from "../Input/DictSelect"
import SecretLevelInput from '@/components/Input/SecretLevelInput'
import FormLabelsInput from '@/components/Input/FormLabelsInput'

export default {
  props: ['widget', 'models', 'rules', 'remote', 'edit', 'table', 'preview','options'],
  components: {
    FmUpload,
    FileUpload,
    FmViewBtn,
    FmLink,
    DictSelect,
    SecretLevelInput,
    FormLabelsInput
  },
  data () {
    return {
      dataModel: this.models[this.widget.model]
    }
  },
  computed: {
    isDisabled () {
      return this.widget.options.disabled || !this.edit
    },
    widgetWidth () {
      return this.table ? undefined : this.widget.options.width
    }
  },
  created () {
    if (this.widget.options.remote && this.remote[this.widget.options.remoteFunc]) {
      this.remote[this.widget.options.remoteFunc]((data) => {
        this.widget.options.remoteOptions = data.map(item => {
          return {
            value: item[this.widget.options.props.value],
            label: item[this.widget.options.props.label],
            children: item[this.widget.options.props.children]
          }
        })
      })
    }

    if (this.widget.type === 'imgupload' && this.widget.options.isQiniu) {
      this.remote[this.widget.options.tokenFunc]((data) => {
        this.widget.options.token = data
      })
    }
  },
  methods: {
  },
  watch: {
    dataModel: {
      deep: true,
      handler (val) {
        this.models[this.widget.model] = val
        this.$emit('update:models', {
          ...this.models,
          [this.widget.model]: val
        })
        this.$emit('input-change', val, this.widget.model)
      }
    },
    models: {
      deep: true,
      handler (val) {
        this.dataModel = val[this.widget.model];
        //.log(this.widget.model);
        //console.log(this.dataModel);
      }
    }
  }
}
</script>
