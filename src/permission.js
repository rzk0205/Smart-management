import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { filterRoutes } from './utils/router'
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
          const { menus } = nav
          const routes = filterRoutes(menus)
          console.log('r', routes)
          if (routes.length > 0) {
            routes.forEach((item) => {
              router.addRoute('layout', item)
              console.log(item)
            })

            return next(to.path)
          }
          next()
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
