import { AppRouteNames } from '@/types/constants'
import type { AppRouteRecordRaw } from '../types'

const EXCEPTION: AppRouteRecordRaw = {
  path: '/exception',
  name: AppRouteNames.exception,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.exception',
    requiresAuth: true,
    order: 6
  },
  children: [
    {
      path: '403',
      name: AppRouteNames._403,
      component: () => import('@/views/exception/403/index'),
      meta: {
        locale: 'menu.exception.403',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '404',
      name: AppRouteNames._404,
      component: () => import('@/views/exception/404/index'),
      meta: {
        locale: 'menu.exception.404',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: '500',
      name: AppRouteNames._500,
      component: () => import('@/views/exception/500/index'),
      meta: {
        locale: 'menu.exception.500',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default EXCEPTION
