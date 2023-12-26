import { CompNameEnum } from '@/types/constants'
import type { AppRouteRecordRaw } from '../types'

const RESULT: AppRouteRecordRaw = {
  path: '/result',
  name: CompNameEnum.result,
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
      name: CompNameEnum.success,
      component: () => import('@/views/result/success'),
      meta: {
        locale: 'menu.result.success',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'error',
      name: CompNameEnum.error,
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
