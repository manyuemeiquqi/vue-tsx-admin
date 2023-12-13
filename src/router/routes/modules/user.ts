const USER: any = {
  path: '/user',
  name: 'user',
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.user',
    icon: 'icon-user',
    requiresAuth: true,
    order: 7
  },
  children: [
    {
      path: 'info',
      name: 'Info',
      component: () => import('@/views/user/info/index'),
      meta: {
        locale: 'menu.user.info',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'setting',
      name: 'Setting',
      component: () => import('@/views/user/setting/index'),
      meta: {
        locale: 'menu.user.setting',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default USER
