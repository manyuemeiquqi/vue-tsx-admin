import { createRouter, createWebHashHistory } from 'vue-router'
// import LoginView from '@/views/LoginView.vue'
import DetailView from '@/views/detail/index'
import CardList from '@/views/list/card-list/index'
import LoginView from '@/views/login/index'

import Workbench from '@/views/dashboard/workbench/index'

import UserInfo from '@/views/user/info/index'

import ListRoutes from '@/router/routes/modules/list'
import ExceptionRoutes from '@/router/routes/modules/exception'
import UserRoutes from '@/router/routes/modules/user'

import ResultRoutes from '@/router/routes/modules/result'
import FormRoutes from '@/router/routes/modules/form'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginView
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('@/components/layout-component/index'),
      children: [
        {
          path: 'workbench',
          name: 'workbench',
          component: Workbench
        },
        {
          path: 'detail',
          name: 'detail',
          component: DetailView
        },
        {
          path: 'cardList',

          name: 'cardList',
          component: CardList
        },
        {
          path: 'userInfo',

          name: 'userInfo',
          component: UserInfo
        }
      ]
    },
    ListRoutes as any,
    ExceptionRoutes as any,
    ResultRoutes as any,
    UserRoutes as any,
    FormRoutes as any
  ]
})

export default router
