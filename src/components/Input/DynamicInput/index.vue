<script>
export default {
  name: 'DynamicInput',

  props: {
    value: [String, Number, Boolean, Array, Object]
  },

  data () {
    return {
      model: this.value
    }
  },

  watch: {
    value (val) {
      this.model = val
    },
    model (val) {
      this.$emit('input', val)
    }
  },

  render (h) {
    const textInput = (
      <el-input v-model={this.model}></el-input>
    )
    return textInput
  }
}
</script>