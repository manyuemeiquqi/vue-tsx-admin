import { AppRouteNames } from '@/types/constants'
import type { AppRouteRecordRaw } from '../types'

const USER: AppRouteRecordRaw = {
  path: '/user',
  name: AppRouteNames.user,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.user',
    icon: 'icon-user',
    requiresAuth: true,
    order: 7
  },
  children: [
    {
      path: 'info',
      name: AppRouteNames.info,
      component: () => import('@/views/user/info/index'),
      meta: {
        locale: 'menu.user.info',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'setting',
      name: AppRouteNames.setting,
      component: () => import('@/views/user/setting/index'),
      meta: {
        locale: 'menu.user.setting',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default USER
