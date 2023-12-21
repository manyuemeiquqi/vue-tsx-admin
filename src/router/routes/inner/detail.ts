import type { AppRouteRecordRaw } from '../types'

const PROFILE: AppRouteRecordRaw = {
  path: '/profile',
  name: 'profile',
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.profile',
    requiresAuth: true,
    icon: 'icon-file',
    order: 4
  },
  children: [
    {
      path: 'basic',
      name: 'Basic',
      component: () => import('@/views/detail/index'),
      meta: {
        locale: 'menu.profile.basic',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}

export default PROFILE
