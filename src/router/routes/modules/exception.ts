import { ViewNames } from '@/types/constants'

export default {
  path: '/exception',
  name: ViewNames.exception,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.exception',
    requiresAuth: true
  },
  children: [
    {
      path: '403',
      name: ViewNames._403,
      component: () => import('@/views/exception/403/index'),
      meta: {
        locale: 'menu.exception.403',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '404',
      name: ViewNames._404,
      component: () => import('@/views/exception/404/index'),
      meta: {
        locale: 'menu.exception.404',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: '500',
      name: ViewNames._500,
      component: () => import('@/views/exception/500/index'),
      meta: {
        locale: 'menu.exception.500',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
