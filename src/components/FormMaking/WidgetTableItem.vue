<template>
  <div class="widget-table-view" :style="{
      width: element.options.width
    }"
    :class="{active: selectWidget.key == element.key, 'is_req': element.options.required}"
    @click.stop="handleSelectWidget(index)">
    <el-table :data="[{}]" size="large" row-class-name="widget-table-row">
      <el-table-column :label="element.name">
        <slot>
          <span>
             <template v-if="element.type == 'input'">
              <el-input
                v-model="element.options.defaultValue"
                :placeholder="element.options.placeholder"
                :disabled="element.options.disabled"
              ></el-input>
            </template>

            <template v-if="element.type == 'textarea'">
              <el-input type="textarea" :rows="5"
                v-model="element.options.defaultValue"
                :disabled="element.options.disabled"
                :placeholder="element.options.placeholder"
              ></el-input>
            </template>

            <template v-if="element.type == 'number'">
              <el-input-number
                v-model="element.options.defaultValue"
                :disabled="element.options.disabled"
                :controls-position="element.options.controlsPosition"
              ></el-input-number>
            </template>

            <template v-if="element.type == 'radio'">
              <dict-select :type="'radio'"
                :dict-id="element.options.dictId"
                :disabled="element.options.disabled"
                :style="{width: element.options.width}"></dict-select>
            </template>

            <template v-if="element.type == 'checkbox'">
              <dict-select :type="'checkbox'"
                :dict-id="element.options.dictId"
                :disabled="element.options.disabled"
                :style="{width: element.options.width}"></dict-select>
            </template>

            <template v-if="element.type == 'time'">
              <el-time-picker
                v-model="element.options.defaultValue"
                :is-range="element.options.isRange"
                :placeholder="element.options.placeholder"
                :start-placeholder="element.options.startPlaceholder"
                :end-placeholder="element.options.endPlaceholder"
                :readonly="element.options.readonly"
                :disabled="element.options.disabled"
                :editable="element.options.editable"
                :clearable="element.options.clearable"
                :arrowControl="element.options.arrowControl"
              >
              </el-time-picker>
            </template>

            <template v-if="element.type == 'date'">
              <el-date-picker
                v-model="element.options.defaultValue"
                :type="element.options.type"
                :is-range="element.options.isRange"
                :placeholder="element.options.placeholder"
                :start-placeholder="element.options.startPlaceholder"
                :end-placeholder="element.options.endPlaceholder"
                :readonly="element.options.readonly"
                :disabled="element.options.disabled"
                :editable="element.options.editable"
                :clearable="element.options.clearable"
              >
              </el-date-picker>
            </template>

            <template v-if="element.type == 'rate'">
              <el-rate v-model="element.options.defaultValue"
                :max="element.options.max"
                :disabled="element.options.disabled"
                :allow-half="element.options.allowHalf"
              ></el-rate>
            </template>

            <template v-if="element.type == 'color'">
              <el-color-picker
                v-model="element.options.defaultValue"
                :disabled="element.options.disabled"
                :show-alpha="element.options.showAlpha"
              ></el-color-picker>
            </template>

            <template v-if="element.type == 'select'">
              <dict-select :type="'select'"
                :dict-id="element.options.dictId"
                :disabled="element.options.disabled"
                :clearable="element.options.clearable"
                :placeholder="element.options.placeholder"
                :filterable="element.options.filterable"
                :style="{width: element.options.width}"></dict-select>
            </template>

            <template v-if="element.type=='switch'">
              <el-switch
                v-model="element.options.defaultValue"
                :disabled="element.options.disabled"
              >
              </el-switch>
            </template>

            <template v-if="element.type=='slider'">
              <el-slider
                v-model="element.options.defaultValue"
                :min="element.options.min"
                :max="element.options.max"
                :disabled="element.options.disabled"
                :step="element.options.step"
                :show-input="element.options.showInput"
                :range="element.options.range"
              ></el-slider>
            </template>

            <template v-if="element.type=='imgupload'">
              <fm-upload
                v-model="element.options.defaultValue"
                :disabled="element.options.disabled"
                :width="element.options.size.width"
                :height="element.options.size.height"
                token="xxx"
                domain="xxx"
              >
              </fm-upload>
            </template>

            <template v-if="element.type == 'upload'">
              <file-upload
                :btnTitle="element.options.btnTitle"
                :action="element.options.uploadUrl"
                :accept="element.options.accept"
                :limit="element.options.limit"
                :multiple="element.options.multiple"
                :tips="element.options.tips"
                :disabled="element.options.disabled">
              </file-upload>
            </template>

            <template v-if="element.type == 'viewBtn'">
              <fm-view-btn
                :multiple="element.options.multiple"
                :disabled="element.options.disabled">
              </fm-view-btn>
            </template>

            <template v-if="element.type == 'link'">
              <fm-link
                :type="element.options.type"
                :blank="element.options.blank"
                :disabled="element.options.disabled">
              </fm-link>
            </template>

            <template v-if="element.type == 'cascader'">
              <el-cascader
                v-model="element.options.defaultValue"
                :disabled="element.options.disabled"
                :clearable="element.options.clearable"
                :placeholder="element.options.placeholder"
                :options="element.options.remoteOptions"
              >
              </el-cascader>
            </template>

            <template v-if="element.type == 'editor'">
              <vue-editor
                v-model="element.options.defaultValue"
              >
              </vue-editor>
            </template>

            <template v-if="element.type=='blank'">
              <div style="height: 50px;color: #999;background: #eee;line-height:50px;text-align:center;">{{$t('fm.components.fields.blank')}}</div>
            </template>

            <template v-if="element.type == 'text'">
              <span>{{element.options.defaultValue}}</span>
            </template>
          </span>
        </slot>
      </el-table-column>
    </el-table>
    <div class="widget-view-action" v-if="selectWidget.key == element.key">
      <!-- <i class="iconfont icon-icon_clone" @click.stop="handleWidgetClone(index)"></i> -->
      <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
    </div>
    <div class="widget-view-drag" v-if="selectWidget.key == element.key">
      <i class="iconfont icon-drag drag-widget"></i>
    </div>
    <!-- <div class="widget-view-model">
      <span>{{ element.model }}</span>
    </div> -->
  </div>
</template>

<script>
import FmUpload from './Upload'
import FileUpload from './FileUpload'
import FmViewBtn from './ViewBtn'
import FmLink from "./Link"
import DictSelect from "../Input/DictSelect"

export default {
  name: 'WidgetTableItem',
  components: {
    FileUpload,
    FmUpload,
    FmViewBtn,
    FmLink,
    DictSelect
  },
  props: ['element', 'select', 'index', 'data'],
  data () {
    return {
      selectWidget: this.select
    }
  },
  methods: {
    handleSelectWidget (index) {
      this.selectWidget = this.data.tableColumns[index]
    },
    handleWidgetClone (index) {
      let cloneData = {
        ...this.data.tableColumns[index],
        options: {...this.data.tableColumns[index].options},
        key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      }

      if (this.data.tableColumns[index].type === 'radio' || this.data.tableColumns[index].type === 'checkbox' || this.data.tableColumns[index].type === 'select') {

        cloneData = {
          ...cloneData,
          options: {
            ...cloneData.options,
            options: cloneData.options.options.map(item => ({...item}))
          }
        }
      }

      this.data.tableColumns.splice(index, 0, cloneData)

      this.$nextTick(() => {
        this.selectWidget = this.data.tableColumns[index + 1]
      })
    },
    handleWidgetDelete(index) {
      let removeData = this.data.tableColumns[index];
      this.$emit("removeWidget",{index,removeData});
      if (this.data.tableColumns.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.tableColumns[index - 1]
        }
      } else {
        this.selectWidget = this.data.tableColumns[index + 1]
      }

      this.$nextTick(() => {
        this.data.tableColumns.splice(index, 1)
      })
    }
  },
  watch: {
    select (val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler (val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  }
}
</script>
