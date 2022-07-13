import { setItem, getItem } from '../../utils/storage'

export default {
  namespaced: true,
  state: {
    tagsView: getItem('tagsView') || [{ meta: { title: '控制台' }, path: '/' }]
  },
  mutations: {
    setTagsView(state, tagsView) {
      const isFind = state.tagsView.find((item) => {
        return item.path === tagsView.path
      })
      if (!isFind) {
        state.tagsView.push(tagsView)
        setItem('tagsView', state.tagsView)
      }
    },
    removeTagItem(state, index) {
      state.tagsView.splice(index, 1)
      setItem('tagsView', state.tagsView)
    }
  },
  actions: {
    setTagsView({ commit }, payload) {
      commit('setTagsView', payload)
    }
  }
}
