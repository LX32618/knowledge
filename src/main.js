import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/plugins/antDesign'
import '@/plugins/element'
import '@/plugins/notify'
import '@/plugins/formMaking'
import '@/components'

import './assets/iconfont/iconfont.css'
import 'font-awesome/css/font-awesome.min.css' // awesome图标

// import './mock' // 模拟数据 不用注释掉即可

import * as filters from './filters' // 全局过滤器


Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
