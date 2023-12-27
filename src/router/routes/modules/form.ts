import { ViewNames } from '@/types/constants'

export default {
  path: '/form',
  name: ViewNames.form,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.form',
    icon: 'icon-settings',
    requiresAuth: true
  },
  children: [
    {
      path: 'step',
      name: ViewNames.step,
      component: () => import('@/views/form/step/index'),
      meta: {
        locale: 'menu.form.step',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'group',
      name: ViewNames.group,
      component: () => import('@/views/form/group/index'),
      meta: {
        locale: 'menu.form.group',
        requiresAuth: true,
        roles: ['admin']
      }
    }
  ]
}
