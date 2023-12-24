import { createRouter, createWebHashHistory } from 'vue-router'

import { AppRouteNames } from '@/types/constants'
import configRouteGuard from './guard'
import { appRoutes } from './routes'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: AppRouteNames.login }
    },
    {
      path: '/login',
      name: AppRouteNames.login,
      component: () => import('@/views/login/index'),
      meta: {
        requiresAuth: false
      }
    },
    ...appRoutes,
    {
      path: '/redirect',
      meta: {
        requiresAuth: true,
        hideInMenu: true
      },
      children: [
        {
          path: '/redirect/:path',
          name: AppRouteNames.redirect,
          component: () => import('@/views/redirect/index'),
          meta: {
            requiresAuth: true,
            hideInMenu: true
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: AppRouteNames.notFound,
      component: () => import('@/views/not-found/index')
    }
  ]
})

configRouteGuard(router)

export default router
