import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/plugins/element'
import '@/components'

import './assets/iconfont/iconfont.css'
import 'font-awesome/css/font-awesome.min.css' // awesome图标

import './mock' // 模拟数据 不用注释掉即可


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
