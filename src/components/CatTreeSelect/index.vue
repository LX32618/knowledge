<template>
  <div class="cat-tree-select">
    <!-- 弹出框 -->
    <el-popover
      ref="tree-popover"
      v-model="visible"
      :placement="placement"
      :disabled="treeSelectDisabled">
      <!-- 多选树 -->
      <el-tree
        v-if="multiple"
        ref="tree"
        v-bind="$attrs"
        show-checkbox
        :data="data"
        :props="props"
        :node-key="props.key"
        :expand-on-click-node="false"
        @check="handleMultipleCheck"
        v-on="$listeners">
        <span slot-scope="{ node, data }">
          <slot :node="node" :data="data">{{ data[props.label || 'label'] }}</slot>
        </span>
      </el-tree>
      <!-- 单选树 -->
      <el-radio-group v-else v-model="selectNode">
        <el-tree
          ref="tree"
          v-bind="$attrs"
          :data="data"
          :props="props"
          :node-key="props.key"
          :expand-on-click-node="false"
          v-on="$listeners">
          <span slot-scope="{ node, data }">
            <el-radio :label="data[props.key]" :disabled="data.disabled">
              <slot :node="node" :data="data">{{ data[props.label || 'label'] }}</slot>
            </el-radio>
          </span>
        </el-tree>
      </el-radio-group>
    </el-popover>
    <!-- 标签显示（多选） -->
    <div
      ref="tags"
      v-if="multiple"
      class="cat-tree-select__tags"
      :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }">
      <span v-if="collapseTags && checkedKeys.length && checkedNodes.length">
        <el-tag
          :closable="!treeSelectDisabled"
          :size="collapseTagSize"
          type="info"
          @close="deleteTag($event, checkedKeys[0])"
          disable-transitions>
          <span class="cat-tree-select__tags-text">{{ checkedNodes[0][props.label ? props.label: 'label'] }}</span>
        </el-tag>
        <el-tag
          v-if="checkedKeys.length > 1"
          :closable="false"
          :size="collapseTagSize"
          type="info"
          disable-transitions>
          <span class="cat-tree-select__tags-text">+ {{ checkedKeys.length - 1 }}</span>
        </el-tag>
      </span>
      <transition-group @after-leave="resetInputHeight" v-if="!collapseTags && checkedNodes.length">
        <el-tag
          v-for="(item, index) in checkedKeys"
          :key="item"
          :closable="!treeSelectDisabled"
          :size="collapseTagSize"
          @close="deleteTag($event, item)"
          disable-transitions>
          <span class="cat-tree-select__tags-text">{{ checkedNodes[index][props.label ? props.label: 'label'] }}</span>
        </el-tag>
      </transition-group>
      <!-- 搜索输入框 (多选) -->
      <input
        ref="input"
        v-if="filterable"
        type="text"
        class="el-select__input"
        :class="[treeSelectSize ? `is-${ treeSelectSize }` : '']"
        v-model="query"
        :disabled="treeSelectDisabled"
        :style="{ 'flex-grow': '1', width: inputLength / (inputWidth - 32) + '%', 'max-width': inputWidth - 42 + 'px' }"
        @focus="handleFocus"
        @blur="softFocus = false"
        @keyup="managePlaceholder"
        @keydown="resetInputState"
        @input="debouncedQueryChange"
        @click="handleInputClick">
    </div>
    <!-- 输入框 -->
    <el-input
      ref="reference"
      :class="{ 'is-focus': visible }"
      v-popover:tree-popover
      v-model="selectedLabel"
      type="text"
      :placeholder="currentPlaceholder"
      :name="name"
      :id="id"
      :readonly="readonly"
      :disabled="treeSelectDisabled"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.native="debouncedOnInputChange"
      @paste.native="debouncedOnInputChange">
      <template slot="suffix">
        <i v-show="!showClose" :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
        <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close" @click="handleClearClick"></i>
      </template>
    </el-input>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce'
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'
import { valueEquals } from 'element-ui/src/utils/util'

export default {
  name: 'CatTreeSelect',
  inheritAttrs: false,
  inject: {
    ElForm: {
      default: ''
    },
    ElFormItem: {
      default: ''
    }
  },
  props: {
    id: String,
    name: String,
    data: Array,
    value: {
      required: true
    },
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    multiple: Boolean,
    collapseTags: Boolean,
    filterable: Boolean,
    props: Object,
    placeholder: {
      type: String,
      default () {
        return '请选择'
      }
    },
    placement: {
      type: String,
      default: 'bottom'
    }
  },
  data () {
    return {
      inputLength: 20,
      inputWidth: 0,
      initialInputHeight: 0,
      selectedLabel: '', // 输入框显示值
      query: '', // 搜索输入值 (多选)
      selectNode: null, // 选中节点 (单选)
      checkedNodes: [], // 选中节点数组 (多选)
      checkedKeys: [], // 选中节点key值数组 (多选)
      currentPlaceholder: '', // 输入框占位符
      cachedPlaceHolder: '', // 占位符缓存
      softFocus: false,
      visible: false // 弹出框显示
    }
  },
  computed: {
    iconClass () {
      return this.visible ? 'arrow-up is-reverse' : 'arrow-up'
    },
    _elFormItemSize () {
      return (this.elFormItem || {}).elFormItemSize
    },
    treeSelectSize () {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },
    collapseTagSize () {
      return ['small', 'mini'].indexOf(this.treeSelectSize) > -1
        ? 'mini'
        : 'small'
    },
    treeSelectDisabled () {
      return this.disabled || (this.ElForm || {}).disabled
    },
    readonly () {
      return !this.filterable || this.multiple || !this.visible
    },
    // 是否显示清空按钮
    showClose () {
      const hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : this.value !== undefined && this.value !== null && this.value !== ''
      const criteria = this.clearable &&
        !this.treeSelectDisabled &&
        hasValue
      return criteria
    }
  },
  watch: {
    // 监听单选值变化
    selectNode (val) {
      const node = this.$refs.tree.getNode(val)
      if (!node) {
        this.selectedLabel = ''
        return
      }
      this.selectedLabel = node.label;
      this.visible = false
      this.$emit('input', val);
      this.emitChange(val);
    },
    // 监听多选值变化
    checkedKeys (val) {
      this.$emit('input', val);
      this.emitChange(val);
    },
    value (val) {
      if (this.multiple) {
        this.resetInputHeight()
        if ((val && val.length > 0)) {
          this.currentPlaceholder = ''
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder
        }
      }
      this.setSelected()
    },
    placeholder (val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val
    },
    visible (val) {
      this.$emit('visible-change', val)
    }
  },
  methods: {
    // 更新选中节点
    updateCheckedNodes () {
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.value)
        this.checkedNodes = this.$refs.tree.getCheckedNodes()
      })
    },
    handleFocus (event) {
      if (!this.softFocus) {
        setTimeout(() => {
          if (this.multiple && this.filterable) {
            this.visible = true
          }
          this.$emit('focus', event)
        }, 50)
      } else {
        this.softFocus = false
      }
    },
    blur () {
      this.visible = false
      this.$refs.reference.blur()
    },
    handleBlur (event) {
      setTimeout(() => {
        this.$emit('blur', event)
      }, 50)
      this.softFocus = false
    },
    // 设置选中节点
    setSelected () {
      if (!this.multiple) {
        this.selectNode = this.value
        return
      }
      this.checkedKeys = this.value
      this.$refs.tree.setCheckedKeys(this.value)
      this.checkedNodes = this.$refs.tree.getCheckedNodes()
    },
    // 点击清空按钮触发
    handleClearClick (event) {
      this.deleteSelected(event)
    },
    // 清空选项
    deleteSelected (event) {
      event.stopPropagation()
      const value = this.multiple ? [] : ''
      this.$emit('input', value)
      this.emitChange(value)
      this.visible = false
      this.$emit('clear')
    },
    // 值改变向上传递时间
    emitChange (val) {
      if (!valueEquals(this.value, val)) {
        this.$emit('change', val)
      }
    },
    // 处理节点选中（多选）
    handleMultipleCheck (_, checkStatus) {
      this.checkedNodes = checkStatus.checkedNodes
      this.checkedKeys = checkStatus.checkedKeys
    },
    // 删除标签
    deleteTag (event, tag) {
      const index = this.checkedKeys.indexOf(tag)
      if (index > -1 && !this.treeSelectDisabled) {
        const value = [...this.value]
        value.splice(index, 1)
        this.$emit('input', value)
        this.emitChange(value)
        this.$emit('remove-tag', tag)
      }
      event.stopPropagation()
    },
    // 搜索输入变化 (单选)
    onInputChange () {
      if (this.filterable && this.query !== this.selectedLabel) {
        this.query = this.selectedLabel
        // this.$refs.tree.filter(this.query)
        this.handleQueryChange(this.query)
      }
    },
    // 搜索有输入时隐藏占位值 (多选)
    managePlaceholder () {
      if (this.currentPlaceholder !== '') {
        this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder
      }
    },
    handleQueryChange (val) {
      this.$refs.tree.filter(val)
    },
    handleInputClick (e) {
      this.multiple && e.stopPropagation()
    },
    handleResize () {
      this.resetInputWidth()
      if (this.multiple) this.resetInputHeight()
    },
    // 重置标签框与过滤输入框宽度
    resetInputWidth () {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width
    },
    // 根据标签数量重置输入框高度（多选）
    resetInputHeight () {
      if (this.collapseTags && !this.filterable) return
      this.$nextTick(() => {
        if (!this.$refs.reference) return
        const inputChildNodes = this.$refs.reference.$el.childNodes
        const input = [].filter.call(inputChildNodes, item => item.tagName === 'INPUT')[0]
        const tags = this.$refs.tags
        const sizeInMap = this.initialInputHeight || 40
        input.style.height = this.checkedKeys.length === 0
          ? sizeInMap + 'px'
          : Math.max(
            tags ? (tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0)) : 0,
            sizeInMap
          ) + 'px'
        if (this.visible && this.emptyText !== false) {
          // this.broadcast('CatSelectDropdown', 'updatePopper')
        }
      })
    },
    // 搜索有输入时重置输入框高度 (多选)
    resetInputState () {
      this.inputLength = this.$refs.input.value.length * 15 + 20
      this.resetInputHeight()
    }
  },
  created () {
    this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit('input', [])
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit('input', '')
    }
    this.debouncedOnInputChange = debounce(0, () => {
      this.onInputChange()
    })
    this.debouncedQueryChange = debounce(0, (e) => {
      this.handleQueryChange(e.target.value)
    })
  },
  mounted () {
    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = ''
    }
    // 初始树没有渲染，显示弹出框将树渲染出来，设置已选中节点再隐藏弹出框
    this.visible = true
    this.setSelected()
    this.visible = false

    addResizeListener(this.$el, this.handleResize)

    const reference = this.$refs.reference
    if (reference && reference.$el) {
      const sizeMap = {
        medium: 36,
        small: 32,
        mini: 28
      }
      const input = reference.$el.querySelector('input')
      this.initialInputHeight = input.getBoundingClientRect().height || sizeMap[this.treeSelectSize]
    }
    if (this.remote && this.multiple) {
      this.resetInputHeight()
    }
    this.$nextTick(() => {
      if (reference && reference.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width
      }
    })
  },
  destroyed () {
    if (this.$el && this.handleResize) removeResizeListener(this.$el, this.handleResize)
  }
}
</script>

<style>
:focus {
  outline: 0;
}
.cat-tree-select {
  display: inline-block;
  position: relative;
}
.cat-tree-select>.el-input {
  display: block;
}
.cat-tree-select .el-input__inner {
  cursor: pointer;
}
.cat-tree-select .el-input .el-select__caret {
  color: #C0C4CC;
  font-size: 14px;
  transition: transform .3s;
  transform: rotateZ(180deg);
  cursor: pointer;
}
.cat-tree-select .el-input .el-select__caret.is-reverse {
  transform: rotateZ(0);
}
.cat-tree-select .el-input.is-focus .el-input__inner {
  border-color: #409EFF;
}
.cat-tree-select .el-input__inner:focus {
  border-color: #409EFF;
}
.cat-tree-select__tags {
  position: absolute;
  line-height: normal;
  white-space: normal;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.cat-tree-select .el-tag {
  box-sizing: border-box;
  border-color: transparent;
  margin: 2px 0 2px 6px;
  background-color: #f0f2f5;
}
.cat-tree-select .el-tag__close.el-icon-close {
  background-color: #C0C4CC;
  right: -7px;
  top: 0;
  color: #FFF;
}
</style>
