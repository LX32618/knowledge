import Mock from 'mockjs'
import _ from 'lodash'

const list = []

for (let i = 0; i < 20; ++i) {
  list.push(Mock.mock({
    id: '@increment',
    name: '@ctitle',
    'picture|1': ['tv', 'fighter-jet', 'rocket', 'github', 'key', 'gears', 'random', 'sitemap', 'sliders', 'book'],
    type: 0,
    pid: 0,
    'knowNum|0-10': 0
  }))
}

const secondList = []

for (let i = 0; i < 100; ++i) {
  secondList.push(Mock.mock({
    id: '@increment',
    name: '@ctitle',
    'pid|1': list,
    type: 1,
    'knowNum|0-10': 0
  }))
}

const thirdList = []

for (let i = 0; i < 100; ++i) {
  thirdList.push(Mock.mock({
    id: '@increment',
    name: '@ctitle',
    'pid|1': secondList,
    type: 2,
    'knowNum|0-10': 0
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
    code: '@word(8)',
    'classification|1': thirdList.map(item => item.name),
    'lables|0-3': [{
      'label|+1': labelList2.map(item => item.label),
      'id|+1': labelList2.map(item => item.id)
    }],
    keyword: '@cword(2,5)',
    'hasPermission|1-2': true,
    describe: '@csentence',
    'creator|1': ['系统管理员', '安全管理员', '安全审计员', '普通用户', '访客'],
    createDate: +Mock.Random.date('T'),
    'hot|1-2': true
  }))
}

const subForm1 = Mock.mock({
  id: '10',
  formType: 1,
  formName: '测试子表1',
  fields: [{
    fieldName: 's1',
    displayName: '测试属性1',
    htmlType: 1,
    fieldType: '1',
  },
  {
    fieldName: 's2',
    displayName: '测试属性2',
    htmlType: 3,
    fieldType: '1',
  },
  {
    fieldName: 's3',
    displayName: '测试属性3',
    htmlType: 8,
    fieldType: '1',
  },
  {
    fieldName: 's4',
    displayName: '测试属性4',
    htmlType: 2,
    fieldType: '',
  },
  {
    fieldName: 's5',
    displayName: '测试属性5',
    htmlType: 0,
    fieldType: 'float',
    precision: 2
  }]
})

const subForm2 = Mock.mock({
  id: '20',
  formType: 1,
  formName: '测试子表2',
  fields: [{
    fieldName: 's21',
    displayName: '测试属性1',
    htmlType: 0,
    fieldType: '',
  },
  {
    fieldName: 's22',
    displayName: '测试属性2',
    htmlType: 0,
    fieldType: '',
  },
  {
    fieldName: 's23',
    displayName: '测试属性3',
    htmlType: 0,
    fieldType: '',
  }]
})

const entityForm = Mock.mock({
  id: '100',
  formType: 1,
  formName: '测试实体表单',
  fields: [{
    fieldName: 't1',
    displayName: '专利名称',
    htmlType: 0,
    fieldType: '',
    span: 24,
  },
  {
    fieldName: 't2',
    displayName: '专利获利',
    htmlType: 0,
    fieldType: 'int',
  },
  {
    fieldName: 't3',
    displayName: '专利申请时间',
    htmlType: 10,
    fieldType: 'YYYY/MM/DD',
  }],
  subForms: [subForm1]
})

const entityForm2 = Mock.mock({
  id: '101',
  formType: 1,
  formName: '测试实体表单2',
  fields: [
    {
      fieldName: 't21',
      displayName: '姓名',
      htmlType: 0,
      fieldType: '',
    },
    {
      fieldName: 't22',
      displayName: '年龄',
      htmlType: 0,
      fieldType: 'int',
    }
  ],
  subForms: [subForm1, subForm2]
})

const vitualForm = Mock.mock({
  id: '200',
  formType: 0,
  formName: '测试虚拟表单',
  relationForms: [entityForm, entityForm2]
})

const dicts = []

for (let i = 0; i < 3; ++i) {
  dicts.push(Mock.mock({
    id: '@guid',
    name: '@word'
  }))
}

export default [
  {
    url: '/doc/docCategory/findAllKnowlibrary',
    response: _ => {
      return {
        status: 'success',
        content: list
      }
    }
  },
  {
    // url: '/knowledge/find',
    url: /\/knowledge\/find.*/,
    response: config => {
      const { creator, type, id, rows, page } = config.query
      let data
      let length
      if (type == 0) {
        data = knowledgeList.sort((a, b) => {
          return new Date(b.createDate) - new Date(a.createDate)
        })
        data = data.slice(0, 12)
      } else if (type == 1) {
        data = knowledgeList.filter(item => item.creator === creator)
        data = data.slice(0, 12)
      } else if (type == 2) {
        data = knowledgeList.filter(item => item.hot)
        data = data.slice(0, 12)
      } else {
        data = knowledgeList.filter(item => item.id % id === 0)
        length = data.length
        data = data.slice((page - 1) * rows, page * rows)
      }
      return {
        status: 'success',
        content: {
          list: data,
          length
        }
      }
    }
  },
  {
    url: /\/knowledge\/count.*/,
    response: config => {
      const { creator } = config.query
      const data = knowledgeList.filter(item => item.creator === creator)
      return {
        status: 'success',
        content: data.length
      }
    }
  },
  {
    url: /\/knowledgeCollect\/count.*/,
    response: _ => {
      return {
        status: 'success',
        content: Math.floor(Math.random() * 100)
      }
    }
  },
  {
    url: /\/knowledge\/getCategoryTree.*/,
    response: config => {
      const { id: rootId } = config.query
      let data = []
      list.forEach(item => {
        if (!rootId || item.id == rootId) {
          data.push(item)
        }
      })
      secondList.forEach(item => {
        if (!rootId || item.pid.id == rootId) {
          const tmp = {}
          _.assign(tmp, item)
          tmp.pid = tmp.pid.id
          data.push(tmp)
        }
      })
      thirdList.forEach(item => {
        if (!rootId || item.pid.pid.id == rootId) {
          const tmp = {}
          _.assign(tmp, item)
          tmp.pid = tmp.pid.id
          data.push(tmp)
        }
      })
      return {
        status: 'success',
        content: data
      }
    }
  }, {
    url: /\/knowledge\/getLablesTree.*/,
    response: _ => {
      const data = [...lableList, ...labelList2]
      return {
        status: 'success',
        content: data
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
        status: 'success',
        content: data
      }
    }
  }, {
    url: /\/knowledge\/dataView.*/,
    response: config => {
      const { id } = config.query
      let data = knowledgeList.find(item => item.id == id)
      data.baseid = '180'
      data.secretLevel = 10

      return {
        status: 'success',
        content: {
          baseData: data,
          formConfig: vitualForm,
          // formConfig: entityForm
        }
      }
    }
  }, {
    url: /\/knowledge\/pushList.*/,
    response: config => {
      // const { id } = config.query
      let data = _.shuffle(knowledgeList).slice(0, 5)

      return {
        status: 'success',
        content: data
      }
    }
  }, {
    url: /\/sysDic\/dictTree.*/,
    response: _ => {
      return {
        status: 'success',
        content: dicts
      }
    }
  }
]
