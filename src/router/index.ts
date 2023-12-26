import { createRouter, createWebHashHistory } from 'vue-router'

import { CompNameEnum } from '@/types/constants'
import configRouteGuard from './guard'
import { appRoutes } from './routes'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
// NProgress.configure({ showSpinner: false })
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: CompNameEnum.login }
    },
    {
      path: '/login',
      name: CompNameEnum.login,
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
          name: CompNameEnum.redirect,
          component: () => import('@/views/redirect/index'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: CompNameEnum.notFound,
      component: () => import('@/views/not-found/index')
    }
  ]
})

configRouteGuard(router)

export default router
