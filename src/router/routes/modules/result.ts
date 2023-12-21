import { AppRouteNames } from '@/types/constants'
import type { AppRouteRecordRaw } from '../types'

const RESULT: AppRouteRecordRaw = {
  path: '/result',
  name: AppRouteNames.result,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.result',
    icon: 'icon-check-circle',
    requiresAuth: true,
    order: 5
  },
  children: [
    {
      path: 'success',
      name: AppRouteNames.success,
      component: () => import('@/views/result/success'),
      meta: {
        locale: 'menu.result.success',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'error',
      name: AppRouteNames.error,
      component: () => import('@/views/result/error'),
      meta: {
        locale: 'menu.result.error',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}

export default RESULT
