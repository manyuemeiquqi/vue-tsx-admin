import { ViewNames } from '@/types/constants'

export default {
  path: '/profile',
  name: ViewNames.profile,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.profile',
    requiresAuth: true,
    order: 4
  },
  children: [
    {
      path: 'basic',
      name: 'Basic',
      component: () => import('@/views/profile/index'),
      meta: {
        locale: 'menu.profile.basic',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}
