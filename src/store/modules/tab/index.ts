import type { RouteLocationNormalized } from 'vue-router'
import { defineStore } from 'pinia'
import { ViewNames } from '@/types/constants'
import { cloneDeep } from 'lodash'
import { firstPermissionRoute } from '@/hooks/appRoute'
const BAN_LIST = [ViewNames.redirect, ViewNames.notFound]
export type TabItem = {
  title: string
  name: string
  fullPath: string
}
const formatRoute = (route: RouteLocationNormalized): TabItem => {
  const { name, meta, fullPath } = route
  return {
    title: meta.locale + '' || '',
    name: String(name),
    fullPath
  }
}
const firstRoute = cloneDeep(firstPermissionRoute)
export const defaultTab = {
  title: firstRoute.title,
  name: firstRoute.name,
  fullPath: firstRoute.fullPath
}

//  tab list doesn't process permission limit, if you want to use in project, add test case according to requirement and develop
export default defineStore('tabStore', {
  state: (): {
    tabList: TabItem[]
  } => ({
    tabList: [defaultTab]
  }),
  getters: {
    getCacheList(state) {
      return Array.from(new Set(state.tabList.map((item) => item.name)))
    }
  },
  actions: {
    updateTabList(route: RouteLocationNormalized) {
      if (BAN_LIST.includes(route.name as ViewNames)) return
      this.tabList.push(formatRoute(route))
    },
    deleteTab(name: ViewNames) {
      const idx = this.tabList.findIndex((item) => item.name === name)

      this.tabList.splice(idx, 1)
    },
    freshTabList(tabs: TabItem[]) {
      this.tabList = tabs
    },
    resetTabList() {
      this.$reset()
    }
  }
})
