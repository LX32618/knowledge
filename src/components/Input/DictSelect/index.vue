<template>
  <div v-loading="isLoading">
    <!-- 单选框 -->
    <template v-if="type === 'radio'">
      <el-radio-group v-model="model">
        <el-radio v-for="item of options" :key="item.id" :label="item.id">{{
          item.name
        }}</el-radio>
      </el-radio-group>
    </template>
    <!-- 复选框 -->
    <template v-else-if="type === 'checkbox'">
      <el-checkbox-group v-model="model">
        <el-checkbox v-for="item of options" :key="item.id" :label="item.id">{{
          item.name
        }}</el-checkbox>
      </el-checkbox-group>
    </template>
    <!-- 下拉框 -->
    <template v-else>
      <el-select v-model="model" v-bind="$attrs">
        <el-option
          v-for="item of options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </template>
  </div>
</template>

<script>
import { fetchDictTree } from '@/api/treeRest'
export default {
  name: 'DictSelect',
  props: ['dictId', 'value', 'type'],
  data () {
    return {
      model: this.value,
      options: [],
      isLoading: false
    }
  },
  watch: {
    value (val) {
      this.model = this.type === 'checkbox' ? val.split(',') : val
    },
    model (val) {
      const value = this.type === 'checkbox' ? val.join(',') : val
      this.$emit('input', value)
    }
  },
  created () {
    if (this.type === 'checkbox') {
      const model = (this.value) ? this.value.split(',') : []
      this.model = Array.isArray(model) ? model : [model]
    } else {
      this.model = this.value
    }
  },
  mounted () {
    this.isLoading = true
    fetchDictTree({ id: this.dictId }).then(res => {
      this.options = res.content
      this.isLoading = false
    })
  }
}
</script>
