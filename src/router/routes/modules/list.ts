//import { DEFAULT_LAYOUT } from '../base'
import { type AppRouteRecordRaw } from '@/router/routes/types'

const LIST: any = {
  path: '/list',
  name: 'list',
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.list',
    requiresAuth: true,
    icon: 'icon-list',
    order: 2
  },
  children: [
    {
      path: 'search-table', // The midline path complies with SEO specifications
      name: 'SearchTable',
      component: () => import('@/views/list/search-table/index'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'card',
      name: 'Card',
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
