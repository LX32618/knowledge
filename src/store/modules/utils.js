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
  baseFormConfig2: {
    id: '0',
    formName: '基础信息',
    datas: [
      {
        fieldName: 'name',
        displayName: '知识名称',
        htmlType: 0,
        fieldType: '',
      },
      {
        fieldName: 'code',
        displayName: '知识编码',
        htmlType: 0,
        fieldType: '',
        disabled: true
      },
      {
        fieldName: 'secretLevel',
        displayName: '密级',
        htmlType: 98,
        fieldType: secretLevels,
      },
      {
        fieldName: 'abbrev',
        displayName: '缩略语',
        htmlType: 0,
        fieldType: '',
      },
      {
        fieldName: 'classificationName',
        displayName: '类别',
        htmlType: 0,
        fieldType: '',
        disabled: true
      },
      {
        fieldName: 'creatorName',
        displayName: '创建人',
        htmlType: 0,
        fieldType: '',
        disabled: true
      },
      {
        fieldName: 'labelsEnt',
        displayName: '标签',
        htmlType: 99,
        fieldType: '',
      },
      {
        fieldName: 'createDate',
        displayName: '创建时间',
        htmlType: 11,
        fieldType: 'YYYY-MM-DD hh:mm:ss',
        disabled: true
      },
      {
        fieldName: 'keyword',
        displayName: '关键字',
        htmlType: 0,
        fieldType: '',
        span: 24
      },
      {
        fieldName: 'describe',
        displayName: '描述',
        htmlType: 9,
        fieldType: '',
        span: 24
      }
    ]
  },
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
