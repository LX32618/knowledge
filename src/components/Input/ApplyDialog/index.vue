<template>
  <el-dialog
    title="申请查看知识"
    :visible.sync="show"
    width="400px">
    <el-form>
      <el-form-item label="申请理由">
        <el-input v-model="reason" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-reading" @click="handleApply" :loading="loading">申请</el-button>
        <el-button type="danger" icon="el-icon-close" @click="show = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { applyView } from '@/api/flow'

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
  data () {
    return {
      show: this.visible,
      reason: '',
      loading: false
    }
  },
  computed: {},
  watch: {
    visible (val) {
      this.show = val
    },
    show (val) {
      this.$emit('update:visible', val)
    }
  },
  methods: {
    async handleApply () {
      this.loading = true
      try {
        const res = await applyView({
          oid: this.oid,
          reason: this.reason
        })
        const { success, msg } = res
        if (success) {
          this.$success(msg)
          this.show = false
        }
      } catch(err) {
        this.$error(err)
      } finally {
        this.loading = false
      }
    }
  },
  created () {},
  mounted () {}
}
</script>

<style lang="less" scoped></style>
