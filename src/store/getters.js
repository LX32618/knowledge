const getters = {
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  docCategories: state => state.docCategory.docCategories,
  secretLevels: state => state.utils.secretLevels,
  baseFormConfig: state => state.utils.baseFormConfig,
  baseFormConfig2: state => state.utils.baseFormConfig2,
  defaultIcon: state => state.utils.defaultIcon,
  icons: state => state.utils.icons,
  historyStates: state => state.formMaking.historyStates,
  stateIndex: state => state.formMaking.stateIndex
}

export default getters
