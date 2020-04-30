<template>
  <div>
    <slot name="horizontalSlot"></slot>
    <el-table ref="tb"
      :data="tableData"
      stripe
      border
      style="width: 100%"
      @current-change="currentChange"
      @selection-change="selectionChange"
      @sort-change="sortChange">
      <el-table-column
        v-if="settings.checkbox"
        type="selection"
        fixed
      ></el-table-column>
      <el-table-column width="40px" v-if="settings.radio" fixed>
        <template slot-scope="scope">
          <el-radio v-model="radioChecked" :label="scope.row.id"> </el-radio>
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" fixed></el-table-column>
      <!--操作列插槽-->
      <slot name="prefix-column"></slot>
      <template v-for="item in settings.fields">
        <el-table-column
          v-if="item.visible == false ? false : true"
          :sortable="item.sortable"
          :key="item.id"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width ? item.width : 50"
        >
          <template slot-scope="scope">
            <template v-if="item.formatter">{{
              item.formatter(scope.$index,scope.row)
            }}</template>
            <template v-else>{{ scope.row[item.prop] }}</template>
          </template>
        </el-table-column>
      </template>
      <!--操作列插槽-->
      <slot name="suffix-column"></slot>
    </el-table>
    <el-pagination
      v-if="settings.pagination"
      :page-sizes="settings.pageSizes"
      :page-size.sync="settings.pageSize"
      :current-page.sync="settings.currentPage"
      :total="this.tableData.length"
      @size-change="sizeChange"
      @current-change="pageChange"
      layout="total, sizes, prev, pager, next"
    >
    </el-pagination>
  </div>
</template>

<script>
  import request from '@/utils/request'

  export default {
    name: "Table",
    data() {
      return {
        radioChecked:"",
        currentPage:this.settings.currentPage,
        pageSize:this.settings.pageSize
      }
    },
    props: ["settings", "tableData"],
    methods: {
      currentChange(currentRow, oldCurrentRow) {
        if (this.settings.radio) {//如果是单选模式
          this.radioChecked = currentRow.id;
        }
        this.$emit("currentChange", currentRow);
      },
      selectionChange(val) {
        this.$emit("selectionChange", val);
      },
      sizeChange(val) {
        this.pageSize = val;
        this.$emit('pageSizeChange', {page:this.currentPage,rows:this.pageSize});
      },
      pageChange(val) {
        this.currentPage = val;
        this.$emit('pageSizeChange', {page:this.currentPage,rows:this.pageSize});
      },
      sortChange({column, prop, order}) {
        console.log(column);
        console.log(prop);
        console.log(order);
      },
    },
    mounted() {
    }
  }

</script>

<style>
.el-radio__label {
  display: none;
}
</style>