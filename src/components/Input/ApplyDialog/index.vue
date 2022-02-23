<template>
  <el-dialog title="申请查看/出库" :visible.sync="show" width="400px">
    <el-form>
      <el-form-item label="申请理由">
        <el-input v-model="reason" type="textarea" />
      </el-form-item>
      <el-form-item label="申请天数">
        <el-input-number
          v-model="days"
          controls-position="right"
          :precision="0"
          :min="1"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-reading"
          @click="handleApply"
          :loading="loading"
          >申请</el-button
        >
        <el-button type="danger" icon="el-icon-close" @click="show = false"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { fetchProcessId, applyView } from '@/api/flow'

export default {
  name: 'ApplyDialog',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    oid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: this.visible,
      reason: '',
      days: 30,
      loading: false
    }
  },
  computed: {},
  watch: {
    visible(val) {
      this.show = val
    },
    show(val) {
      this.$emit('update:visible', val)
    }
  },
  methods: {
    async handleApply() {
      if (!this.days) {
        this.$error('申请天数不能为空')
        return
      }
      this.loading = true
      try {
        const { content } = await fetchProcessId(this.oid, 'downloadView')
        if (!content) {
          this.$error('目录未配置申请查看流程，请联系管理员配置后再申请')
          return
        }
        const res = await applyView({
          oid: this.oid,
          reason: this.reason,
          applyDay: this.days.toString(),
          processDefinitionId: content.processDefId
        })
        const { success, msg } = res
        if (success) {
          this.$success(msg)
          this.show = false
        }
      } catch (err) {
        this.$error(err)
      } finally {
        this.loading = false
      }
    }
  },
  created() {},
  mounted() {}
}
</script>

<style lang="less" scoped></style>
