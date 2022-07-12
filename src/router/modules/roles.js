import layout from '../../layout'

export default {
  path: '',
  component: layout,
  children: [
    {
      path: '/sys/roles',
      name: 'roles',
      component: () => import('../../views/sys-roles')
    }
  ]
}
