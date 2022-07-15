import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    name: 'layout',
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/index',
    children: [
      {
        name: 'index',
        path: '/index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '控制台'
        }
      }
    ]
  },
  {
    name: 'manager',
    path: '/sys',
    component: () => import('../layout'),
    meta: {
      title: '系统管理'
    },
    children: [
      {
        name: 'sys-users',
        path: '/sys/users',
        meta: {
          title: '用户管理'
        },
        component: () => import('../views/sys-users')
      },
      {
        name: 'sys-roles',
        path: '/sys/roles',
        meta: {
          title: '角色管理'
        },
        component: () => import('../views/sys-roles')
      },
      {
        name: 'sys-menus',
        path: '/sys/menus',
        meta: {
          title: '菜单管理'
        },
        component: () => import('../views/sys-menus')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
