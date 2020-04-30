const errorRouter = [
  {
    path: '/working',
    name: 'Working',
    component: () => import('@/views/error/Working'),
    meta: {
      title: '页面施工中'
    }
  },
  // 404 页面必须放最后
  {
    path: '/*',
    name: 'NotFound',
    component: () => import('@/views/error/NotFound'),
    meta: {
      title: '404'
    }
  }
]

export {
  errorRouter
}
