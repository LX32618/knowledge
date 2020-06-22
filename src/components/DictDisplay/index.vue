<template>
  <span v-loading="isLoading">{{ displayValue }}</span>
</template>

<script>
import { fetchDictTree } from '@/api/treeRest'

export default {
  name: 'DictDisplay',
  props: ['value', 'dictId', 'isArray'],
  data () {
    return {
      isLoading: false,
      options: [],
      displayValue: ''
    }
  },
  methods: {
    handleValue () {
      if (!this.options || !this.value || this.options.length === 0) {
        return this.value
      }
      if (!this.isArray) {
        const data = this.options.find(item => item.id === this.value)
        return data ? data.name : this.value
      } else {
        return this.value.split(',').map(data => {
          const option = this.options.find(item => item.id === data)
          return option ? option.name : ''
        })
        .filter(item => item !== '')
        .join(', ')
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
