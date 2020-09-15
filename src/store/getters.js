
const getters = {
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  docCategories: state => state.docCategory.docCategories,
  secretLevels: state => state.utils.secretLevels,
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
