// 个人中心路由
const personCenterRouter = [
  {
    path: 'personalInfo',
    name: 'personalInfo',
    component: () => import("@/views/home/PersonCenter/components/PersonalInfo"),
    meta: {
      title: '个人信息',
      icon: 'user'
    }
  },
  {
    path: 'myKnowledge',
    name: 'myKnowledge',
    component: () => import("@/views/home/PersonCenter/components/MyKnowledge"),
    meta: {
      title: '我的知识',
      icon: 'book'
    }
  },
  {
    path: 'myCollect',
    name: 'myCollect',
    component: () => import("@/views/home/PersonCenter/components/MyCollect"),
    meta: {
      title: '我的收藏',
      icon: 'star'
    }
  },
  {
    path: 'myApplication',
    name: 'myApplication',
    component: () => import("@/views/home/PersonCenter/components/MyApplication"),
    meta: {
      title: '我的申请',
      icon: 'file-text-o'
    }
  },
  {
    path: 'myShare',
    name: 'myShare',
    component: () => import("@/views/home/PersonCenter/components/MyShare"),
    meta: {
      title: '我的分享',
      icon: 'share-alt'
    }
  },
  {
    path: 'mySubscribe',
    name: 'mySubscribe',
    component: () => import("@/views/home/PersonCenter/components/MySubscribe"),
    meta: {
      title: '我的订阅',
      icon: 'bookmark'
    }
  },
  {
    path: 'recycleBin',
    name: 'recycleBin',
    component: () => import("@/views/home/PersonCenter/components/RecycleBin"),
    meta: {
      title: '回 收 站',
      icon: 'recycle'
    }
  }
]

// 用户路由
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
      path: '/knoweldgeBase/:id/:categoryId',
      name: 'knowledgeBase',
      props: true,
      component: () => import("@/views/home/KnowledgeBase"),
      meta: {
        title: '知识库'
      }
    }, {
      path: '/personCenter',
      component: () => import("@/views/home/PersonCenter"),
      meta: {
        title: '个人中心'
      },
      children: personCenterRouter,
      redirect: '/personCenter/myKnowledge'
    }]
  },
  {
    path: '/knowledgeForm/:id/:classification',
    name: 'knowledgeForm',
    props: true,
    component: () => import("@/components/Form/KnowledgeBaseForm"),
    meta: {
      title: '新增知识'
    }
  },
  {
    path: '/knowledgeDetail/:id',
    name: 'knowledgeDetail',
    props: true,
    component: () => import("@/views/home/KnowledgeDetail"),
    meta: {
      title: '知识详情'
    }
  },
  {
    path: '/knowledgeVersion/:id',
    name: 'knowledgeVersion',
    props: true,
    component: () => import("@/views/home/KnowledgeDetail/HistoryVersion"),
    meta: {
      title: '历史版本'
    }
  }, 
  {
    path: '/knowledgeSearch',
    name: 'KnowledgeSearch',
    component: () => import("@/views/home/KnowledgeSearch"),
    props: route => ({
      query: route.query.search
    }),
    meta: {
      title: '知识查询'
    }
  }
]



export {
  homeRouter,
  personCenterRouter
}
