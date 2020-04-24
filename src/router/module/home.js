const homeRouter = [
  {
    path: '/',
    name: 'homePage',
    component: () => import("@/views/home/index"),
    meta: {
      title: '主页'
    }
  },
  {
    path: '/knowledgeForm/:id',
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
