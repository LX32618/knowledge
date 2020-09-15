import { dateTime } from '@/filters'

const secretLevels = [
  { value: 10, label: '非密' },
  { value: 20, label: '内部' },
  { value: 30, label: '秘密' },
  { value: 40, label: '机密' },
]

const state = {
  // 密级
  secretLevels,
  // 知识基础信息表单配置
  baseFormConfig: [
    {
      type: 'text',
      title: '基础信息',
      options: {},
      rules: []
    },
    {
      type: 'grid',
      options: {},
      columns: [
        {
          span: 12,
          list: [
            {
              type: 'input',
              name: '知识名称',
              model: 'name',
              rules: [],
              options: {}
            }
          ]
        },
        {
          span: 12,
          list: [
            {
              type: 'input',
              name: '知识编码',
              model: 'code',
              rules: [],
              options: {
                disabled: true
              }
            }
          ]
        }
      ]
    },
    {
      type: 'grid',
      options: {},
      columns: [
        {
          span: 12,
          list: [
            {
              type: 'secrectSelect',
              name: '密级',
              model: 'secretLevel',
              rules: [],
              options: {}
            }
          ]
        },
        {
          span: 12,
          list: [
            {
              type: 'input',
              name: '缩略语',
              model: 'abbrev',
              rules: [],
              options: {}
            }
          ]
        }
      ]
    },
    {
      type: 'grid',
      options: {},
      columns: [
        {
          span: 12,
          list: [
            {
              type: 'input',
              name: '类别',
              model: 'classificationName',
              rules: [],
              options: {
                disabled: true
              }
            }
          ]
        },
        {
          span: 12,
          list: [
            {
              type: 'input',
              name: '创建人',
              model: 'creatorName',
              rules: [],
              options: {
                disabled: true
              }
            }
          ]
        }
      ]
    },
    {
      type: 'grid',
      options: {},
      columns: [
        {
          span: 12,
          list: [
            {
              type: 'labelSelect',
              name: '标签',
              model: 'labels',
              rules: [],
              options: {}
            }
          ]
        },
        {
          span: 12,
          list: [
            {
              type: 'date',
              name: '创建时间',
              model: 'createDate',
              rules: [],
              options: {
                type: 'datetime',
                disabled: true
              }
            }
          ]
        }
      ]
    },
    {
      type: 'input',
      name: '关键字',
      model: 'keyword',
      rules: [],
      options: {}
    },
    {
      type: 'textarea',
      name: '描述',
      model: 'describe',
      rules: [],
      options: {}
    }
  ],
  // 知识基础信息列表配置
  baseColumnsConfig: [
    {
      label: '序号',
      key: 'index',
      width: 50,
      fixed: true
    },
    {
      label: '操作',
      key: 'option',
      width: 200,
    },
    {
      label: '知识名称',
      key: 'name'
    }, {
      label: '知识编号',
      key: 'code'
    }, {
      label: '目录',
      key: 'classificationName'
    }, {
      label: '创建人',
      key: 'creatorName'
    }, {
      label: '创建时间',
      key: 'createDate',
      width: 100,
      formatter (row, index) {
        return dateTime(row.createDate)
      }
    }, {
      label: '关键字',
      key: 'keyword'
    }, {
      label: '标签',
      key: 'labels',
      formatter (row, index) {
        const labels = row.labelsEnt
        if (!labels || !Array.isArray(labels)) {
          return ''
        }
        return labels.map(item => item.name).join(',')
      }
    }
  ],
  // 基础搜索配置
  baseFields: [
    {
      type: 'input',
      name: '知识名称',
      key: 'name',
      options: {}
    },
    {
      type: 'input',
      name: '知识编号',
      key: 'code',
      options: {}
    },
    {
      type: 'input',
      name: '关键字',
      key: 'keyword',
      options: {}
    },
    {
      type: 'datePicker',
      name: '创建日期',
      key: 'createDate',
      options: {
        type: 'daterange'
      }
    }
  ],
  defaultIcon: 'fa fa-book',
  icons: [
    'fa fa-book',
    "fa fa-microchip",
    "fa fa-tv",
    "fa fa-anchor",
    "fa fa-bar-chart-o",
    "fa fa-fighter-jet",
    "fa fa-feed",
    "fa fa-plane",
    "fa fa-rocket",
    "fa fa-random",
    "fa fa-gears",
    "fa fa-wifi",
    "fa fa-magnet",
    "fa fa-motorcycle",
    "fa fa-envira",
    "fa fa-keyboard-o",
    "fa fa-cubes",
    "fa fa-car",
    "fa fa-mobile-phone",
    "fa fa-bolt",
    "fa fa-bluetooth",
    "fa fa-diamond",
    "fa fa-fax",
    "fa fa-recycle",
    "fa fa-subway",
    "fa fa-usb",
    "fa fa-database",
    "fa fa-dashboard"
  ]
}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
