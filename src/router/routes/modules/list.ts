import { CompNameEnum } from '@/types/constants'
import type { AppRouteRecordRaw } from '../types'

const LIST: AppRouteRecordRaw = {
  path: '/list',
  name: CompNameEnum.list,
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.list',
    requiresAuth: true,
    icon: 'icon-list',
    order: 2
  },
  children: [
    {
      path: 'search-table',
      name: CompNameEnum.searchTable,
      component: () => import('@/views/list/search-table/index'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'card',
      name: CompNameEnum.card,
      component: () => import('@/views/list/card-list/index'),
      meta: {
        locale: 'menu.list.cardList',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default LIST
