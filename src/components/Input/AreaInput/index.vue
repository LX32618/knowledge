<template>
  <el-cascader
    v-model="model"
    :options="options"
    :props="{ value: 'label' }" />
</template>

<script>
import cityData from './city_code.json'

export default {
  name: 'AreaInput',
  components: {},
  props: {
    value: String
  },
  data () {
    return {
      model: [],
      options: cityData
    }
  },
  computed: {},
  watch: {
    value: {
      handler (val) {
        this.model = this.parseValue(val)
      },
      immediate: true
    },
    model (val) {
      this.$emit('input', val.join(','))
    }
  },
  methods: {
    parseValue (str) {
      if (!str) return []
      const result = str.split(',')
      return result || []
    }
  },
  created () {},
  mounted () {}
}
</script>

<style lang="less" scoped></style>
