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
import NestRoutes from '@/router/routes/modules/nest'
import ResultRoutes from '@/router/routes/modules/result'
import FormRoutes from '@/router/routes/modules/form'
import detail from '@/router/routes/modules/detail'
import visualization from '@/router/routes/modules/visualization'
import dashboard from '@/router/routes/modules/dashboard'
import useUserStore from '@/store/modules/user'
import { getUserInfo } from '@/api/user'

import { setRouteEmitter } from '@/utils/routerListener'
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
    FormRoutes as any,
    detail,
    visualization,
    dashboard,
    NestRoutes
  ]
})
// router beforeEach 的是事件注册
router.beforeEach(async (to, from, next) => {
  // setRouteEmitter(to)
  // const userStore = useUserStore()
  // try {
  //   const res = await getUserInfo()
  //   userStore.setUserInfo(res.data)
  // } catch (error) {
  //   /* empty */
  // }
  next()
})
export default router
