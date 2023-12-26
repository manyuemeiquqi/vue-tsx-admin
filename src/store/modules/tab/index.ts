import type { RouteLocationNormalized } from 'vue-router'
import { defineStore } from 'pinia'
import { CompNameEnum } from '@/types/constants'
const BAN_LIST = [CompNameEnum.redirect, CompNameEnum.notFound]
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
export const defaultTab = {
  name: CompNameEnum.workplace,
  title: 'menu.dashboard.workplace',
  fullPath: '/dashboard/workplace'
}

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
      if (BAN_LIST.includes(route.name as CompNameEnum)) return
      this.tabList.push(formatRoute(route))
    },
    deleteTab(name: CompNameEnum) {
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
