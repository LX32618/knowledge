// import Mock from 'mockjs'
// import _ from 'lodash'
// import store from '@/store'
// import staticData from '../datas/staticData'

// const list = []

// for (let i = 0; i < 20; ++i) {
//   list.push(Mock.mock({
//     id: '@increment',
//     categoryName: '@ctitle',
//     'picture|1': store.getters.icons,
//     type: 0,
//     pId: 0,
//     'knowNum|0-10': 0
//   }))
// }

// const secondList = []

// for (let i = 0; i < 100; ++i) {
//   secondList.push(Mock.mock({
//     id: '@increment',
//     categoryName: '@ctitle',
//     'pId|1': list,
//     type: 1,
//     'knowNum|0-10': 0
//   }))
// }

// const thirdList = []

// for (let i = 0; i < 100; ++i) {
//   thirdList.push(Mock.mock({
//     id: '@increment',
//     categoryName: '@ctitle',
//     'pId|1': secondList,
//     type: 2,
//     'knowNum|0-10': 0
//   }))
// }

// const labelList = []
// const labelList2 = []
// const labelList3 = []

// for (let i = 0; i < 5; ++i) {
//   labelList2.push(Mock.mock({
//     id: '@guid',
//     name: '@cword(2,5)',
//   }))
// }

// for (let i = 0; i < 5; ++i) {
//   labelList3.push(Mock.mock({
//     id: '@guid',
//     name: '@cword(2,5)',
//   }))
// }

// labelList.push(Mock.mock({
//   id: '@guid',
//   name: '@cword(2,5)',
//   data: labelList2
// }))

// labelList.push(Mock.mock({
//   id: '@guid',
//   name: '@cword(2,5)',
//   data: labelList3
// }))

// const knowledgeList = []

// for (let i = 0; i < 1000; ++i) {
//   knowledgeList.push(Mock.mock({
//     id: '@increment',
//     name: '@ctitle',
//     code: '@word(8)',
//     'classification|1': thirdList.map(item => item.categoryName),
//     'lables|0-3': [{
//       'label|+1': labelList2.map(item => item.label),
//       'id|+1': labelList2.map(item => item.id)
//     }],
//     keyword: '@cword(2,5)',
//     'hasPermission|1-2': true,
//     describe: '@csentence',
//     'creator|1': ['系统管理员', '安全管理员', '安全审计员', '普通用户', '访客'],
//     createDate: +Mock.Random.date('T'),
//     'hot|1-2': true
//   }))
// }

// const subForm1 = Mock.mock({
//   id: '10',
//   formType: 1,
//   formName: '测试子表1',
//   fields: [{
//     fieldName: 's1',
//     displayName: '测试属性1',
//     htmlType: 1,
//     fieldType: '1',
//   },
//   {
//     fieldName: 's2',
//     displayName: '测试属性2',
//     htmlType: 3,
//     fieldType: '1',
//   },
//   {
//     fieldName: 's3',
//     displayName: '测试属性3',
//     htmlType: 8,
//     fieldType: '1',
//   },
//   {
//     fieldName: 's4',
//     displayName: '测试属性4',
//     htmlType: 2,
//     fieldType: '',
//   },
//   {
//     fieldName: 's5',
//     displayName: '测试属性5',
//     htmlType: 0,
//     fieldType: 'float',
//     precision: 2
//   }]
// })

// const subForm2 = Mock.mock({
//   id: '20',
//   formType: 1,
//   formName: '测试子表2',
//   fields: [{
//     fieldName: 's21',
//     displayName: '测试属性1',
//     htmlType: 0,
//     fieldType: '',
//   },
//   {
//     fieldName: 's22',
//     displayName: '测试属性2',
//     htmlType: 0,
//     fieldType: '',
//   },
//   {
//     fieldName: 's23',
//     displayName: '测试属性3',
//     htmlType: 0,
//     fieldType: '',
//   }]
// })

// const entityForm = Mock.mock({
//   id: '100',
//   formType: 1,
//   formName: '测试实体表单',
//   fields: [{
//     fieldName: 't1',
//     displayName: '专利名称',
//     htmlType: 0,
//     fieldType: '',
//     span: 24,
//   },
//   {
//     fieldName: 't2',
//     displayName: '专利获利',
//     htmlType: 0,
//     fieldType: 'int',
//   },
//   {
//     fieldName: 't3',
//     displayName: '专利申请时间',
//     htmlType: 10,
//     fieldType: 'YYYY/MM/DD',
//   }],
//   subForms: [subForm1]
// })

// const entityForm2 = Mock.mock({
//   id: '101',
//   formType: 1,
//   formName: '测试实体表单2',
//   fields: [
//     {
//       fieldName: 't21',
//       displayName: '姓名',
//       htmlType: 0,
//       fieldType: '',
//     },
//     {
//       fieldName: 't22',
//       displayName: '年龄',
//       htmlType: 0,
//       fieldType: 'int',
//     }
//   ],
//   subForms: [subForm1, subForm2]
// })

// const vitualForm = Mock.mock({
//   id: '200',
//   formType: 0,
//   formName: '测试虚拟表单',
//   relationForms: [entityForm, entityForm2]
// })

// const dicts = []

// for (let i = 0; i < 3; ++i) {
//   dicts.push(Mock.mock({
//     id: '@guid',
//     name: '@word'
//   }))
// }

// export default [
//   {
//     url: /\/categoryTree\/get.*/,
//     type: 'post',
//     response: _ => {
//       return {
//         status: 'success',
//         content: list
//       }
//     }
//   },
//   {
//     url: /\/knowledge\/find.*/,
//     type: 'post',
//     response: config => {
//       // const { creator, type, id, rows, page } = config.query
//       let datas
//       let length
//       datas = knowledgeList.sort((a, b) => {
//         return new Date(b.createDate) - new Date(a.createDate)
//       })
//       datas = datas.slice(0, 10)
//       return {
//         status: 'success',
//         content: {
//           datas,
//           length
//         }
//       }
//     }
//   },
//   {
//     url: /\/categoryKnowledgeItemsByNodeId\/get.*/,
//     type: 'post',
//     response: _ => {
//       return {
//         status: 'success',
//         content: {
//           datas: knowledgeList.slice(0, 10).map(item => {
//             const result = {
//               knowledgeBase: {
//                 ...item,
//                 classificationEnt: {
//                   categoryname: item.classification
//                 },
//                 creatorEnt: {
//                   username: item.creator
//                 }
//               },
//               isSubscribe: item.isSubscribe
//             }
//             return result
//           }),
//           total: knowledgeList.length
//         }
//       }
//     }
//   },
//   {
//     url: /\/system\/knowledge\/count.*/,
//     type: 'post',
//     response: _ => {
//       return {
//         status: 'success',
//         content: Math.floor(Math.random() * 100)
//       }
//     }
//   },
//   {
//     url: /\/knowledgeCollect\/count.*/,
//     type: 'post',
//     response: _ => {
//       return {
//         status: 'success',
//         content: Math.floor(Math.random() * 100)
//       }
//     }
//   },
//   {
//     url: /\/categoryTreeAndNum\/get.*/,
//     type: 'post',
//     response: config => {
//       const { id: rootId } = config.query
//       let data = []
//       list.forEach(item => {
//         if (!rootId || item.id == rootId) {
//           data.push(item)
//         }
//       })
//       secondList.forEach(item => {
//         if (!rootId || item.pId.id == rootId) {
//           const tmp = {}
//           _.assign(tmp, item)
//           tmp.pId = tmp.pId.id
//           data.push(tmp)
//         }
//       })
//       thirdList.forEach(item => {
//         if (!rootId || item.pId.pId.id == rootId) {
//           const tmp = {}
//           _.assign(tmp, item)
//           tmp.pId = tmp.pId.id
//           tmp.labelInfo = labelList
//           data.push(tmp)
//         }
//       })
//       return {
//         status: 'success',
//         content: data.map(item => {
//           item.name = item.categoryName
//           return item
//         })
//       }
//     }
//   }, {
//     url: /\/labels\/get.*/,
//     type: 'post',
//     response: _ => {
//       return staticData.labels
//     }
//   }, {
//     url: /\/knowledgeSubscribe\/subscribe.*/,
//     type: 'post',
//     response: _ => {
//       return {
//         status: 'success',
//         content: {}
//       }
//     }
//   }, {
//     url: /\/knowledgeSubscribe\/cancelSubscribe.*/,
//     type: 'post',
//     response: _ => {
//       return {
//         status: 'success',
//         content: {}
//       }
//     }
//   }, {
//     url: /\/knowledgeDataController\/getModelAndData.*/,
//     type: 'post',
//     response: _ => {
//       return staticData.formDataAndModel
//     }
//   }, {
//     url: /\/knowledge\/pushList.*/,
//     response: config => {
//       // const { id } = config.query
//       let data = _.shuffle(knowledgeList).slice(0, 5)

//       return {
//         status: 'success',
//         content: data
//       }
//     }
//   }, {
//     url: /\/dicTree\/get.*/,
//     type: 'post',
//     response: _ => {
//       return staticData.dictTree
//     }
//   }, {
//     url: /save.*/,
//     type: 'post',
//     response: _ => {
//       return {
//         status: 'success',
//         content: 'test123'
//       }
//     }
//   }
// ]
