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
  baseFormConfig: {
    id: '0',
    formName: '基础信息',
    datas: [
      {
        fieldName: 'name',
        displayName: '知识名称',
        htmlTypeId: 0,
        fieldType: '',
      },
      {
        fieldName: 'code',
        displayName: '知识编码',
        htmlTypeId: 0,
        fieldType: '',
        fieldfixed: 1
      },
      {
        fieldName: 'secretLevel',
        displayName: '密级',
        htmlTypeId: 98,
        fieldType: secretLevels,
      },
      {
        fieldName: 'abbrev',
        displayName: '缩略语',
        htmlTypeId: 0,
        fieldType: '',
      },
      {
        fieldName: 'classification',
        displayName: '类别',
        htmlTypeId: 0,
        fieldType: '',
        fieldfixed: 1
      },
      {
        fieldName: 'lables',
        displayName: '标签',
        htmlTypeId: 99,
        fieldType: '',
      },
      {
        fieldName: 'creator',
        displayName: '创建人',
        htmlTypeId: 0,
        fieldType: '',
        fieldfixed: 1
      },
      {
        fieldName: 'createDate',
        displayName: '创建时间',
        htmlTypeId: 10,
        fieldType: 'YYYY-MM-DD hh:mm:ss',
        fieldfixed: 1
      },
      {
        fieldName: 'keyword',
        displayName: '关键字',
        htmlTypeId: 0,
        fieldType: '',
        span: 24
      },
      {
        fieldName: 'describe',
        displayName: '描述',
        htmlTypeId: 9,
        fieldType: '',
        span: 24,
      }
    ]
  },
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
