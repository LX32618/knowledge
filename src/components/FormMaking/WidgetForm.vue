<template>
  <div class="widget-form-container">
    <div v-if="data.list.length == 0" class="form-empty">从左侧拖拽来添加字段</div>
    <el-form :size="data.config.size" label-suffix=":" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">

      <draggable class=""
        v-model="data.list"
        v-bind="{group:'people', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
        @end="handleMoveEnd"
        @add="handleWidgetAdd"
      >
        <transition-group name="fade" tag="div" class="widget-form-list">
          <template v-for="(element, index) in data.list">
            <template v-if="element.type == 'grid'">
                <el-row class="widget-col widget-view" v-if="element && element.key" :key="element.key"
                  type="flex"
                  :class="{active: selectWidget.key == element.key}"
                  :gutter="element.options.gutter ? element.options.gutter : 0"
                  :justify="element.options.justify"
                  :align="element.options.align"
                  @click.native="handleSelectWidget(index)">
                  <el-col  v-for="(col, colIndex) in element.columns" :key="colIndex"
                           :span="element.options.rowConfig=='span'?col.span ? col.span : 0:undefined"
                  :style="{width:rowPercent(element,col.scale)}">
                      <draggable
                        v-model="col.list"
                        :no-transition-on-drag="true"
                        v-bind="{group:'grid', ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
                        @end="handleMoveEnd"
                        @add="handleWidgetColAdd($event, element, colIndex)"
                      >
                        <transition-group name="fade" tag="div" class="widget-col-list">
                          <template v-for="(el, i) in col.list">
                            <widget-form-item
                              :key="el.key"
                              v-if="el.key"
                              :element="el"
                              :select.sync="selectWidget"
                              :index="i"
                              :data="col"
                              @removeWidget="removeWidget"
                            >
                            </widget-form-item>
                          </template>
                        </transition-group>

                      </draggable>

                  </el-col>
                  <div class="widget-view-action widget-col-action" v-if="selectWidget.key == element.key">

                    <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
                  </div>

                  <div class="widget-view-drag widget-col-drag" v-if="selectWidget.key == element.key">
                    <i class="iconfont icon-drag drag-widget"></i>
                  </div>
                </el-row>
            </template>
            <template v-else-if="element.type == 'table'">
              <el-form-item class="widget-table widget-view" v-if="element && element.key" :key="element.key"
                :class="{active: selectWidget.key == element.key}"
                :label="element.name"
                @click.native="handleSelectWidget(index)">
                <div class="widget-table-wrapper">
                  <el-table
                    class="widget-table-left"
                    size="large"
                    :data="[{}]"
                    row-class-name="widget-table-row">
                    <el-table-column type="index" fixed>
                      <template slot="header">#</template>
                    </el-table-column>
                  </el-table>
                  <div class="widget-table-content">
                    <div v-if="element.tableColumns.length === 0" class="table-empty">将字段拖拽到此处</div>
                    <draggable
                      v-model="element.tableColumns"
                      :no-transition-on-drag="true"
                      v-bind="{group: element.key, ghostClass: 'ghost',animation: 200, handle: '.drag-widget'}"
                      @end="handleMoveEnd"
                      @add="handleWidgetTableAdd($event, element)">
                        <transition-group name="fade" tag="div"
                        class="widget-table-col"
                        :style="{
                          width: calculateWidth(element.tableColumns) + 'px'
                        }">
                          <template v-for="(col, colIndex) in element.tableColumns">
                            <widget-table-item
                              v-if="col.key"
                              :key="col.key"
                              :element="col"
                              :select.sync="selectWidget"
                              :index="colIndex"
                              :data="element"
                              @removeWidget="removeWidget">
                            </widget-table-item>
                          </template>
                        </transition-group>
                      </draggable>
                  </div>
                </div>
                <div class="widget-view-action widget-col-action" v-if="selectWidget.key == element.key">
                  <i class="iconfont icon-trash" @click.stop="handleWidgetDelete(index)"></i>
                </div>

                <div class="widget-view-drag widget-col-drag" v-if="selectWidget.key == element.key">
                  <i class="iconfont icon-drag drag-widget"></i>
                </div>

                <div class="widget-view-model">
                  <span>{{ element.model }}</span>
                </div>
              </el-form-item>
            </template>
            <template v-else>
              <widget-form-item
                      v-if="element && element.key"
                      :key="element.key"
                      :element="element"
                      :select.sync="selectWidget"
                      :index="index"
                      :data="data"
                      @state-change="updateState"
                      @removeWidget="removeWidget">
              </widget-form-item>
            </template>
          </template>
        </transition-group>
      </draggable>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetTableItem from './WidgetTableItem'
import WidgetFormItem from './WidgetFormItem'
import _ from 'lodash'


export default {
  components: {
    Draggable,
    WidgetFormItem,
    WidgetTableItem
  },
  props: ['data', 'select'],
  data() {
    return {
      selectWidget: this.select
    }
  },
  mounted() {
    document.body.ondrop = function (event) {
      let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
      if (isFirefox) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  },
  methods: {
    removeWidget({index,removeData}){
      this.$emit("removeWidget",{index,removeData});
    },
    handleMoveEnd(evt) {
 /*     console.log('index', newIndex, oldIndex)*/
    },
    handleSelectWidget(index) {
      // console.log(index, '#####')
      this.selectWidget = this.data.list[index]
    },
    handleWidgetAdd(evt) {
      const newIndex = evt.newIndex;
      //为拖拽到容器的元素添加唯一 key
      const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999);

      let indexData = _.cloneDeep(this.data.list[newIndex]);
      indexData.key = (indexData.type=='grid' || indexData.type == 'table' || indexData.type == "text")?key:indexData.options.key;
      indexData.model = (indexData.type=='grid' || indexData.type == 'table' || indexData.type == "text")?indexData.type+"_"+key:indexData.options.model;

      this.$set(this.data.list, newIndex,indexData);
      this.selectWidget = this.data.list[newIndex]
      this.updateState()
    },
    handleWidgetColAdd($event, row, colIndex) {
      const newIndex = $event.newIndex
      const oldIndex = $event.oldIndex
      const item = $event.item

      // 防止布局元素的嵌套拖拽
      if (item.className.indexOf('data-grid') >= 0) {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === 'DIV' && this.data.list.splice(oldIndex, 0, row.columns[colIndex].list[newIndex])

        row.columns[colIndex].list.splice(newIndex, 1)

        return false
      }

      const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
      let indexData = _.cloneDeep(row.columns[colIndex].list[newIndex]);
      if(indexData.type == "table" || indexData.type == "grid")//防止布局元素嵌套
      {
        return false;
      }
      indexData.key = (indexData.type=="text")?key:indexData.options.key;
      indexData.model = (indexData.type=="text")?"text_"+key:indexData.options.model;
      this.$set(row.columns[colIndex].list, newIndex,indexData);
      this.selectWidget = row.columns[colIndex].list[newIndex]
      this.updateState()
    },
    handleWidgetTableAdd(evt, table) {
      const newIndex = evt.newIndex

      const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)

      let indexData = _.cloneDeep(table.tableColumns[newIndex]);
      indexData.key = indexData.options.key;
      indexData.model = indexData.options.model;
      indexData.options.width = '200px';
      this.$set(table.tableColumns, newIndex,indexData);
      this.updateState()
    },
    handleWidgetDelete(index) {
      let removeData = this.data.list[index];
      this.$emit("removeGrid",{index,removeData});
      if (this.data.list.length - 1 === index) {
        if (index === 0) {
          this.selectWidget = {}
        } else {
          this.selectWidget = this.data.list[index - 1]
        }
      } else {
        this.selectWidget = this.data.list[index + 1]
      }

      this.$nextTick(() => {
        this.data.list.splice(index, 1)
        this.updateState()
      })
    },
    calculateWidth(columns) {
      const total = 0
      const totalWidth = columns.reduce((total, column) => {
        const width = column.options.width ? +column.options.width.replace(/px/, '') : 0
        return total + width
      }, 200)
      return totalWidth < 400 ? 400 : totalWidth
    },
    updateState() {
      this.$store.commit('formMaking/APPEND_STATE', this.data)
    }
  },
  watch: {
    select(val) {
      this.selectWidget = val
    },
    selectWidget: {
      handler(val) {
        this.$emit('update:select', val)
      },
      deep: true
    }
  },
  computed: {
    rowPercent(element,scale){
      return function(element,scale){
        if(element.type=='grid')
        {
          if(element.options.rowConfig == 'scale')
          {
            let total = element.options.blank + element.columns.reduce((s, d) => {
              return s + d.scale;
            }, 0);
            return (scale / total) * 100 + "%";
          }
          else{
            return undefined;
          }
        }
    }
  }
}
}
</script>
