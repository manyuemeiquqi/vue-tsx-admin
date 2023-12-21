import { AppRouteNames } from '@/types/enum'
import type { AppRouteRecordRaw } from '../types'

const FORM: AppRouteRecordRaw = {
  path: '/form',
  name: AppRouteNames.form,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.form',
    icon: 'icon-settings',
    requiresAuth: true,
    order: 3
  },
  children: [
    {
      path: 'step',
      name: AppRouteNames._403,
      component: () => import('@/views/form/step/index'),
      meta: {
        locale: 'menu.form.step',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'group',
      name: AppRouteNames._404,
      component: () => import('@/views/form/group/index'),
      meta: {
        locale: 'menu.form.group',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}

export default FORM
