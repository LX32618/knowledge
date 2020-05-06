import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

// 测试环境用
import docCategory from './modules/docCategory'
import user from './modules/user'
import utils from './modules/user'

Vue.use(Vuex)

/* 正式环境用
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', false, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  getters,
  modules
})
*/

// 测试环境用
export default new Vuex.Store({
  getters,
  modules: {
    docCategory,
    user,
    utils
  }
})
