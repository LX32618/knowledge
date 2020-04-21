import { getToken } from '@/utils/auth'

const routerGuide = (to, from, next) => {
  // 设置网站title
  document.title = `${to.meta.title} | 知识工程`

  const token = getToken()
  // 已登录
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // const { role } = await store.dispatch('user/getInfo')
      // const routes = store.getters.routes
      // if (!routes || routes.length === 0) {
      //   store.commit('app/SET_ROUTES')
      // }
      // // 判断用户权限
      // if (to.meta.admin && role !== 0) {
      //   next('/noPerimission')
      // } else {
      //   next()
      // }
      next()
    }
    // 未登录
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
  next()

}

export {
  routerGuide
}
