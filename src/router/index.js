import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { sidebarRouter } from "./module/sidebar";
import { homeRouter } from './module/home'
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由拦截器
router.beforeEach(routerGuide)

export default router

