import { ViewNames } from '@/types/constants'

export default {
  path: '/list',
  name: ViewNames.list,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.list',
    requiresAuth: true,
    icon: 'icon-list'
  },
  children: [
    {
      path: 'search-table',
      name: ViewNames.searchTable,
      component: () => import('@/views/list/search-table/index'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'card',
      name: ViewNames.cardList,
      component: () => import('@/views/list/card-list/index'),
      meta: {
        locale: 'menu.list.cardList',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}
