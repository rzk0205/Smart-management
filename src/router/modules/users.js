import layout from '../../layout'

export default {
  path: '/',
  component: layout,
  children: [
    {
      path: '/sys/users',
      name: 'users',
      component: () => import('../../views/sys-users')
    }
  ]
}
