import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import {sidebarRouter} from "./module/sidebar";

const routes = [
    {
        path:'/tree',
        name:"Tree",
        component:()=>import("@/components/Tree")
    },
    sidebarRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router

