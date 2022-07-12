import UserApi from '@/api/user'
import { setItem, getItem, removeItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: '',
    authoritys: [],
    menus: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setMenus(state, nav) {
      const { authoritys, menus } = nav
      state.authoritys = authoritys
      state.menus = menus
    }
  },
  actions: {
    async login({ commit }, loginForm) {
      const token = await UserApi.login(loginForm)
      commit('setToken', token)
      return token
    },
    async getUserInfo({ commit }) {
      const userInfo = await UserApi.getUserInfo()
      commit('setUserInfo', userInfo)
      return userInfo
    },
    async getNav({ commit }) {
      const nav = await UserApi.getMenuNav()
      commit('setMenus', nav)
      console.log(nav)
      return nav
    },
    async logout({ commit }) {
      const response = await UserApi.logout()
      commit('setToken', '')
      commit('setUserInfo', '')
      removeItem('token')
      // removeItem('userInfo')
      return response
    }
  }
}
