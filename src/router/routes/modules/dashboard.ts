import { CompNameEnum } from '@/types/constants'

export default {
  path: '/dashboard',
  name: CompNameEnum.dashboard,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    order: 0
  },
  children: [
    {
      path: 'workplace',
      name: CompNameEnum.workplace,
      component: () => import('@/views/dashboard/workplace/index'),
      meta: {
        locale: 'menu.dashboard.workplace',
        requiresAuth: true,
        roles: ['*']
      }
    },

    {
      path: 'monitor',
      name: CompNameEnum.monitor,
      component: () => import('@/views/dashboard/monitor/index'),
      meta: {
        locale: 'menu.dashboard.monitor',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}
