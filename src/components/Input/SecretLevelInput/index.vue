<template>
  <el-select v-model="model" value-key="value" v-bind="$attrs">
    <el-option
      v-for="item of levels"
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
    value: Number,
    maxLevel: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {
      model: this.value
    }
  },
  computed: {
    ...mapGetters(['secretLevels']),
    levels() {
      return this.secretLevels.filter(item => item.value <= this.maxLevel)
    }
  },
  watch: {
    value(val) {
      this.model = val
    },
    model(val) {
      this.$emit('input', val)
    }
  }
}
</script>
