import { successMsg, errorMsg, warningMsg, infoMsg } from '@/utils/msg'
import Vue from 'vue'

Vue.prototype.$success = successMsg
Vue.prototype.$error = errorMsg
Vue.prototype.$warning = warningMsg
Vue.prototype.$info = infoMsg
