<template>
  <div class="html-form">
    <div v-html="formHtml"></div>
    <el-button @click="handleSubmit">提交</el-button>
  </div>
</template>

<script>
import formHtml from './form'

export default {
  name: 'HtmlForm',
  data () {
    return {
      formHtml,
      configs: [
        {
          name: 'name'
        },
        {
          name: 'name2'
        }
      ]
    }
  },
  methods: {
    handleSubmit () {
      const form = document.querySelector('#formoid')
      const model = {}
      this.configs.forEach(config => {
        const key = config.name
        const value = form.querySelector(`[name=${key}]`).value
        model[key] = value
      })
      console.log(model)
    }
  }
}
</script>