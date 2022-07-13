const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  menus: (state) => state.user.menus,
  tagsView: (state) => state.tagsView.tagsView,
  isCollapse: (state) => state.menu.collapse
}
export default getters
