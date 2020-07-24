import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { sidebarRouter } from "./module/sidebar";
import { homeRouter } from './module/home'
import { errorRouter } from './module/error'
import { routerGuide } from './permission'

const routes = [
  sidebarRouter,
  ...homeRouter,
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: {
      title: '登录'
    }
  },
  ...errorRouter // 错误处理必须放最后
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  base: 'knowledge',
  routes,
  // 切换路由时滚动到最顶部
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

// 路由拦截器
router.beforeEach(routerGuide)

export default router

