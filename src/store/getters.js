const getters = {
  userInfo: state => state.user.userInfo,
  token: state => state.user.token,
  docCategories: state => state.docCategory.docCategories,
  secretLevels: state => state.utils.secretLevels,
  baseFormConfig: state => state.utils.baseFormConfig
}

export default getters
