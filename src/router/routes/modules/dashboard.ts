import { ViewNames } from '@/types/constants'

export default {
  path: '/dashboard',
  name: ViewNames.dashboard,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true
  },
  children: [
    {
      path: 'workplace',
      name: ViewNames.workplace,
      component: () => import('@/views/dashboard/workplace/index'),
      meta: {
        locale: 'menu.dashboard.workplace',
        requiresAuth: true,
        roles: ['*']
      }
    },

    {
      path: 'monitor',
      name: ViewNames.monitor,
      component: () => import('@/views/dashboard/monitor/index'),
      meta: {
        locale: 'menu.dashboard.monitor',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}
