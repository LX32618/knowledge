<template>
  <el-table class="dynamic-table" v-bind="$attrs">
    <el-table-column
      v-for="column in columns" :key="column.key"
      :label="column.label"
      :prop="column.key"
      :width="column.width"
      :fixed="column.fixed"
      :sortable="column.sortable ? 'custom' : false">
      <template slot-scope="scope">
        <slot :name="column.key" :scope="scope">
          {{ defaultDisplay(scope.row, scope.$index, column) }}
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'DynamicTable',
  props: {
    props: {
      type: Object,
      default () { return {} }
    },
    columns: {
      type: Array,
      default () { return [] }
    }
  },
  methods: {
    defaultDisplay (row, index, column) {
      if (column.formatter && typeof column.formatter === 'function') {
        return column.formatter(row, index)
      }
      const keys = column.key.split('.')
      let value = row
      keys.forEach(key => {
        value = value[key]
      })
      return value
    }
  }
}
</script>
