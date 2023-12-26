import { CompNameEnum } from '@/types/constants'

export default {
  path: '/user',
  name: CompNameEnum.user,
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
      name: CompNameEnum.info,
      component: () => import('@/views/user/info/index'),
      meta: {
        locale: 'menu.user.info',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'setting',
      name: CompNameEnum.setting,
      component: () => import('@/views/user/setting/index'),
      meta: {
        locale: 'menu.user.setting',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
