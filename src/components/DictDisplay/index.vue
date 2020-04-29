<template>
  <span v-loading="isLoading">{{ displayValue }}</span>
</template>

<script>
import { fetchDictTree } from '@/api/knowledge'

export default {
  name: 'DictDisplay',
  props: ['value', 'dictId'],
  data () {
    return {
      isLoading: false,
      options: [],
      displayValue: ''
    }
  },
  methods: {
    handleValue () {
      if (!this.options || this.options.length === 0) {
        return this.value
      }
      if (typeof this.value == 'string') {

        const data = this.options.find(item => item.id === this.value)
        return data.name
      } else if (typeof this.value == 'object') {
        return this.value.map(data => {
          return this.options.find(item => item.id === data).name
        }).join(', ')
      }
    }
  },
  mounted () {
    this.isLoading = true
    fetchDictTree({ id: this.dictId }).then(res => {
      this.options = res.content
      this.displayValue = this.handleValue()
      this.isLoading = false
    })
  }
}
</script>

<style scoped>
</style>
