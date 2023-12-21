import { AppRouteNames } from '@/types/enum'
import type { AppRouteRecordRaw } from '../types'

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: AppRouteNames.dashboard,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0
  },
  children: [
    {
      path: 'workplace',
      name: AppRouteNames.workplace,
      component: () => import('@/views/dashboard/workbench/index'),
      meta: {
        locale: 'menu.dashboard.workplace',
        requiresAuth: true,
        roles: ['*']
      }
    },

    {
      path: 'monitor',
      name: AppRouteNames.monitor,
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
