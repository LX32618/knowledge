const homeRouter = [
  {
    path: '/',
    name: 'homePage',
    component: () => import("@/views/home/index")
  }
]

export {
  homeRouter
}
