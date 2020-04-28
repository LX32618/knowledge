<template>
  <el-select v-model="model" value-key="value">
    <el-option
      v-for="item of secretLevels"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    ></el-option>
  </el-select>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SecretLevelInput',
  props: {
    value: Number
  },
  data () {
    return {
      model: this.value
    }
  },
  computed: {
    ...mapGetters([
      'secretLevels'
    ]),
  },
  watch: {
    value (val) {
      this.model = val
    },
    model (val) {
      this.$emit('input', val)
    }
  }
}
</script>