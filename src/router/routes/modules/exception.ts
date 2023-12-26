import { CompNameEnum } from '@/types/constants'

export default {
  path: '/exception',
  name: CompNameEnum.exception,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.exception',
    requiresAuth: true,
    order: 6
  },
  children: [
    {
      path: '403',
      name: CompNameEnum._403,
      component: () => import('@/views/exception/403/index'),
      meta: {
        locale: 'menu.exception.403',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '404',
      name: CompNameEnum._404,
      component: () => import('@/views/exception/404/index'),
      meta: {
        locale: 'menu.exception.404',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: '500',
      name: CompNameEnum._500,
      component: () => import('@/views/exception/500/index'),
      meta: {
        locale: 'menu.exception.500',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
