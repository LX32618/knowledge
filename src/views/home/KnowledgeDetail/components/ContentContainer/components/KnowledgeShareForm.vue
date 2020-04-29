<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="共享对象">
        <el-select v-model="shareType">
          <el-option
            v-for="(type, index) of shareTypes"
            :key="index"
            :label="type"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="shareType === 0" label="选择人员"> </el-form-item>
      <el-form-item v-else-if="shareType === 1" label="选择组织单元">
      </el-form-item>
      <el-form-item v-else-if="shareType === 2" label="选择专业组">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="fa fa-save"> 保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'KnowledgeShareForm',
  data () {
    return {
      shareTypes: ['指定人员', '指定部门', '指定专业组', '全部人员'],
      shareType: 0
    }
  }
}
</script>

<style scoped>
</style>
