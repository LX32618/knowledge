import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import { sidebarRouter } from "./module/sidebar";
import { homeRouter } from './module/home'

const routes = [
  {
    path: '/tree',
    name: "Tree",
    component: () => import("@/components/Tree")
  },
  sidebarRouter,
  ...homeRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router

