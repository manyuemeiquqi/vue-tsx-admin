import { ViewNames } from '@/types/constants'

export default {
  path: '/result',
  name: ViewNames.result,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.result',
    icon: 'icon-check-circle',
    requiresAuth: true
  },
  children: [
    {
      path: 'success',
      name: ViewNames.success,
      component: () => import('@/views/result/success'),
      meta: {
        locale: 'menu.result.success',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'error',
      name: ViewNames.error,
      component: () => import('@/views/result/error'),
      meta: {
        locale: 'menu.result.error',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}
