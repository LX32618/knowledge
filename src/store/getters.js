const getters = {
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  docCategories: state => state.docCategory.docCategories,
  secretLevels: state => state.utils.secretLevels,
  baseFormConfig: state => state.utils.baseFormConfig,
  defaultIcon: state => state.utils.defaultIcon,
  icons: state => state.utils.icons
}

export default getters
