const getters = {
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  docCategories: state => state.docCategory.docCategories,
  secretLevels: state => state.utils.secretLevels,
  baseFormConfig: state => state.utils.baseFormConfig,
  baseFormConfig2: state => state.utils.baseFormConfig2,
  defaultIcon: state => state.utils.defaultIcon,
  icons: state => state.utils.icons
}

export default getters
