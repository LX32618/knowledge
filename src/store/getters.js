
const getters = {
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  // ip: state => state.user.ip,
  docCategories: state => state.docCategory.docCategories,
  userDocCategories: state => state.docCategory.userDocCategories,
  secretLevels: state => state.utils.secretLevels,
  rootCategoryId: state => state.utils.rootCategoryId,
  baseFormConfig: state => state.utils.baseFormConfig,
  baseColumnsConfig: state => state.utils.baseColumnsConfig,
  baseFields: state => state.utils.baseFields,
  defaultIcon: state => state.utils.defaultIcon,
  icons: state => state.utils.icons,
  historyStates: state => state.formMaking.historyStates,
  stateIndex: state => state.formMaking.stateIndex,
  sidebar: state => state.routerMenu.sidebar,
  sidebarRouter: state => state.routerMenu.sidebarRouter
}

export default getters
