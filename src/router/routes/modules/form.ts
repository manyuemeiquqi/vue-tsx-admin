import { CompNameEnum } from '@/types/constants'
import type { AppRouteRecordRaw } from '../types'

const FORM: AppRouteRecordRaw = {
  path: '/form',
  name: CompNameEnum.form,
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
      name: CompNameEnum.step,
      component: () => import('@/views/form/step/index'),
      meta: {
        locale: 'menu.form.step',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'group',
      name: CompNameEnum.group,
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
