import layout from '../../layout'

export default {
  path: '',
  component: layout,
  children: [
    {
      path: '/sys/menus',
      name: 'menus',
      component: () => import('../../views/sys-menus')
    }
  ]
}
