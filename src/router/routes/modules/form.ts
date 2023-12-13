const FORM: any = {
  path: '/form',
  name: 'form',
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.form',
    icon: 'icon-settings',
    requiresAuth: true,
    order: 3
  },
  children: [
    {
      path: 'step',
      name: 'Step',
      component: () => import('@/views/form/step/index'),
      meta: {
        locale: 'menu.form.step',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'group',
      name: 'Group',
      component: () => import('@/views/form/group/index'),
      meta: {
        locale: 'menu.form.group',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}

export default FORM
