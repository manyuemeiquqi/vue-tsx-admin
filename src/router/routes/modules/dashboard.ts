import { CompNameEnum } from '@/types/constants'
import type { AppRouteRecordRaw } from '../types'

const DASHBOARD: AppRouteRecordRaw = {
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
      component: () => import('@/views/dashboard/workbench/index'),
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

export default DASHBOARD
