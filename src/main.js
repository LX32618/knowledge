import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/plugins/element'
import '@/components'

import './assets/iconfont/iconfont.css'

// 模拟数据 不用注释掉即可
import './mock'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
