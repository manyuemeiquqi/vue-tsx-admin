//import { DEFAULT_LAYOUT } from '../base'
import { type AppRouteRecordRaw } from '@/router/routes/types'

const NEST: any = {
  path: '/nest',
  name: 'Nest',
  component: () => import('@/components/layout-component/index'),
  meta: {
    locale: 'menu.nest',
    requiresAuth: true,
    icon: 'icon-nest',
    order: 2
  },
  children: [
    {
      path: 'menu-item1', // The midline path complies with SEO specifications
      name: 'MenuItem1',
      component: () => import('@/views/nest/menu-item1/index'),
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['*']
      }
    },
    {
      path: 'menu-layer1', // The midline path complies with SEO specifications
      name: 'MenuLayer1',
      children: [
        {
          path: 'menu-item2', // The midline path complies with SEO specifications
          name: 'MenuItem2',
          component: () => import('@/views/nest/menu-item2/index'),
          meta: {
            locale: 'menu.list.searchTable',
            requiresAuth: true,
            roles: ['*']
          }
        },
        {
          path: 'menu-layer2', // The midline path complies with SEO specifications
          name: 'MenuLayer2',
          children: [
            {
              path: 'menu-item3', // The midline path complies with SEO specifications
              name: 'MenuItem3',
              component: () => import('@/views/nest/menu-item3/index'),
              meta: {
                locale: 'menu.list.searchTable',
                requiresAuth: true,
                roles: ['*']
              },
              children: [
                {
                  path: 'item1', // The midline path complies with SEO specifications
                  name: 'ITEM1',
                  component: () => import('@/views/nest/menu-item3/Item1'),
                  meta: {
                    locale: 'menu.list.searchTable',
                    requiresAuth: true,
                    roles: ['*']
                  }
                },
                {
                  path: 'item2', // The midline path complies with SEO specifications
                  name: 'ITEM2',
                  component: () => import('@/views/nest/menu-item3/item2'),
                  meta: {
                    locale: 'menu.list.searchTable',
                    requiresAuth: true,
                    roles: ['*']
                  }
                }
              ]
            }
          ],
          meta: {
            locale: 'menu.list.searchTable',
            requiresAuth: true,
            roles: ['*']
          }
        }
      ],
      meta: {
        locale: 'menu.list.searchTable',
        requiresAuth: true,
        roles: ['*']
      }
    }
  ]
}

export default NEST
