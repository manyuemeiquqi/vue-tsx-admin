// import { DEFAULT_LAYOUT } from '../base'

const RESULT: any = {
  path: '/result',
  name: 'result',
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
      name: 'Success',
      component: () => import('@/views/result/success'),
      meta: {
        locale: 'menu.result.success',
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: 'error',
      name: 'Error',
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
