const homeRouter = [
  {
    path: '/',
    name: 'homePage',
    component: () => import("@/views/home/index"),
    meta: {
      title: '主页'
    }
  }
]

export {
  homeRouter
}
