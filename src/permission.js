import router from './router'
import store from './store'
import { Message } from 'element-ui'
const whitelList = ['/login']
router.beforeEach(async (to, from, next) => {
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      Message('请勿重复登录')
      next(from.path)
    } else {
      const userInfo = store.getters.userInfo
      if (!userInfo) {
        const res = await store.dispatch('user/getUserInfo')
        if (res) {
          const nav = await store.dispatch('user/getNav')
          console.log(nav)
          return next(to.path)
        } else {
          next('/login')
        }
      }
      next()
    }
  } else {
    if (whitelList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
