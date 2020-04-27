const homeRouter = [
  {
    path: '/',
    component: () => import("@/views/home/index"),
    children: [{
      path: '/',
      name: 'mainPage',
      component: () => import("@/views/home/Main"),
      meta: {
        title: '主页'
      },
    }, {
      path: '/knoweldgeBase/:id',
      name: 'knowledgeBase',
      props: true,
      component: () => import("@/views/home/KnowledgeBase"),
      meta: {
        title: '知识库'
      }
    }]
  },
  {
    path: '/knowledgeForm/:id/:baseid',
    name: 'knowledgeForm',
    props: true,
    component: () => import("@/components/Form/KnowledgeBaseForm"),
    meta: {
      title: '新增知识'
    }
  }
]

export {
  homeRouter
}
