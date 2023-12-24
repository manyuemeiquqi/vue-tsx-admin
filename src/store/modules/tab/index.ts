import type { RouteLocationNormalized } from 'vue-router'
import { defineStore } from 'pinia'
import { AppRouteNames, StoreName } from '@/types/constants'

const BAN_LIST = [AppRouteNames.redirect]

const useAppStore = defineStore(StoreName.tab, {
  state: (): {
    defaultTab: AppRouteNames
    otherTabList: AppRouteNames[]
    excludeCacheList: AppRouteNames[]
  } => ({
    defaultTab: AppRouteNames.workplace,
    otherTabList: [],
    excludeCacheList: []
  }),
  getters: {
    getTabList(): AppRouteNames[] {
      return [this.defaultTab, ...this.otherTabList]
    }
  },
  actions: {
    updateTabList(route: RouteLocationNormalized) {
      const name = route.name as AppRouteNames
      if (BAN_LIST.includes(name)) return
      this.otherTabList.push(name)
    },
    deleteTab(name: AppRouteNames) {
      this.excludeCacheList = [name]
      const idx = this.otherTabList.findIndex((item) => item === name)
      this.otherTabList.splice(idx, 1)
      this.excludeCacheList = []
    },
    freshTabList(tabs: AppRouteNames[]) {},
    resetTabList() {}
  }
})

export default useAppStore
