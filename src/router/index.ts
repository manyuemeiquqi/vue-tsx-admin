import { createRouter, createWebHashHistory } from 'vue-router'

import { ViewNames } from '@/types/constants'
import configRouteGuard from './guard'
import { appRoutes } from './routes'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: ViewNames.login }
    },
    {
      path: '/login',
      name: ViewNames.login,
      component: () => import('@/views/login/index'),
      meta: {
        requiresAuth: false
      }
    },
    ...appRoutes,
    {
      path: '/redirect',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/redirect/:path',
          name: ViewNames.redirect,
          component: () => import('@/views/redirect/index'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: ViewNames.notFound,
      component: () => import('@/views/not-found/index')
    }
  ]
})

configRouteGuard(router)

export default router
