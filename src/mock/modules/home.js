import Mock from 'mockjs'
import _ from 'lodash'

const list = []

for (let i = 0; i < 20; ++i) {
  list.push(Mock.mock({
    id: '@increment',
    categoryName: '@ctitle',
    'picture|1': ['tv', 'fighter-jet', 'rocket', 'github', 'key', 'gears', 'random', 'sitemap', 'sliders', 'book'],
    type: 0,
    pid: 0
  }))
}

const secondList = []

for (let i = 0; i < 100; ++i) {
  secondList.push(Mock.mock({
    id: '@increment',
    categoryName: '@ctitle',
    'pid|1': list,
    type: 1
  }))
}

const thirdList = []

for (let i = 0; i < 100; ++i) {
  thirdList.push(Mock.mock({
    id: '@increment',
    categoryName: '@ctitle',
    'pid|1': secondList,
    type: 2
  }))
}

const lableList = []
const labelList2 = []

for (let i = 0; i < 10; ++i) {
  lableList.push(Mock.mock({
    id: '@increment',
    label: '@cword(2,5)',
    pid: 0
  }))
}

for (let i = 0; i < 50; ++i) {
  labelList2.push(Mock.mock({
    id: '@increment',
    label: '@cword(2,5)',
    'pid|1': lableList.map(item => item.id)
  }))
}

const knowledgeList = []

for (let i = 0; i < 1000; ++i) {
  knowledgeList.push(Mock.mock({
    id: '@increment',
    name: '@ctitle',
    'hasPermission|1-2': true,
    describe: '@csentence',
    'creator|1': ['系统管理员', '安全管理员', '安全审计员', '普通用户', '访客'],
    createDate: +Mock.Random.date('T'),
    'hot|1-2': true
  }))
}

export default [
  {
    url: '/doc/docCategory/findAllKnowlibrary',
    response: _ => {
      return {
        status: 0,
        data: list
      }
    }
  },
  {
    // url: '/knowledge/find',
    url: /\/knowledge\/find.*/,
    response: config => {
      const { creator, type } = config.query
      let data
      if (type == 0) {
        data = knowledgeList.sort((a, b) => {
          return new Date(b.createDate) - new Date(a.createDate)
        })
      } else if (type == 1) {
        data = knowledgeList.filter(item => item.creator === creator)
      } else {
        data = knowledgeList.filter(item => item.hot)
      }
      data = data.slice(0, 10)
      return {
        status: 0,
        data
      }
    }
  },
  {
    url: /\/knowledge\/count.*/,
    response: config => {
      const { creator } = config.query
      const data = knowledgeList.filter(item => item.creator === creator)
      return {
        status: 0,
        data: data.length
      }
    }
  },
  {
    url: /\/collectKnowledge\/count.*/,
    response: _ => {
      return {
        status: 0,
        data: Math.floor(Math.random() * 100)
      }
    }
  },
  {
    url: /\/knowledge\/getCategoryTree.*/,
    response: config => {
      const { id: rootId } = config.query
      let data = []
      list.forEach(item => {
        if (item.id == rootId) {
          data.push(item)
        }
      })
      secondList.forEach(item => {
        if (item.pid.id == rootId) {
          const tmp = {}
          _.assign(tmp, item)
          tmp.pid = tmp.pid.id
          data.push(tmp)
        }
      })
      thirdList.forEach(item => {
        if (item.pid.pid.id == rootId) {
          const tmp = {}
          _.assign(tmp, item)
          tmp.pid = tmp.pid.id
          data.push(tmp)
        }
      })
      return {
        status: 0,
        data: data
      }
    }
  }, {
    url: /\/knowledge\/getLablesTree.*/,
    response: _ => {
      const data = [...lableList, ...labelList2]
      return {
        status: 0,
        data
      }
    }
  }, {
    url: /\/knowledge\/validateKnowledgeName.*/,
    response: config => {
      const { name } = config.query
      let data = true
      if (name === '已用' || name === 'used') {
        data = false
      }
      return {
        status: 0,
        data: data
      }
    }
  }
]
