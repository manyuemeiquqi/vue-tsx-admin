const EXCEPTION: any = {
  path: '/exception',
  name: 'exception',
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.exception',
    requiresAuth: true,
    icon: 'icon-exclamation-circle',
    order: 6
  },
  children: [
    {
      path: '403',
      name: '403',
      component: () => import('@/views/exception/403/index'),
      meta: {
        locale: 'menu.exception.403',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '404',
      name: '404',
      component: () => import('@/views/exception/404/index'),
      meta: {
        locale: 'menu.exception.404',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: '500',
      name: '500',
      component: () => import('@/views/exception/500/index'),
      meta: {
        locale: 'menu.exception.500',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default EXCEPTION
