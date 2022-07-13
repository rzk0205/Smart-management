import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import tagsView from './modules/tagsView'
import menu from './modules/menu'
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    tagsView,
    menu
  }
})
