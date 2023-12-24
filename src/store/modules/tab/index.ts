import type { RouteLocationNormalized } from 'vue-router'
import { defineStore } from 'pinia'
import { AppRouteNames, StoreName } from '@/types/constants'

const BAN_LIST = [AppRouteNames.redirect]

export interface TabItem {
  title: string
  name: string
  fullPath: string
}
const formatRoute = (route: RouteLocationNormalized): TabItem => {
  const { name, meta, fullPath } = route
  return {
    title: meta.locale || '',
    name: String(name),
    fullPath
  }
}
const useAppStore = defineStore(StoreName.tab, {
  state: (): {
    defaultTab: TabItem
    otherTabList: TabItem[]
    excludeCacheList: string[]
  } => ({
    defaultTab: {
      name: AppRouteNames.workplace,
      title: 'menu.dashboard.workplace',
      fullPath: '/dashboard/workplace'
    },
    otherTabList: [],
    excludeCacheList: []
  }),
  getters: {
    getTabList(state): TabItem[] {
      return [state.defaultTab, ...state.otherTabList]
    }
  },
  actions: {
    updateTabList(route: RouteLocationNormalized) {
      if (BAN_LIST.includes(route.name as AppRouteNames)) return
      this.otherTabList.push(formatRoute(route))
    },
    deleteTab(name: AppRouteNames) {},
    freshTabList(tabs: AppRouteNames[]) {},
    resetTabList() {}
  }
})

export default useAppStore
