import { Notification } from '@arco-design/web-vue'
import { defineStore } from 'pinia'
import type { RouteRecordNormalized } from 'vue-router'

import type { NotificationReturn } from '@arco-design/web-vue/es/notification/interface'
import { ApplicationTheme, LocalStorageKey, StoreName } from '@/types/constants'
import { isNull } from 'lodash'

export interface ApplicationState {
  theme: ApplicationTheme
  colorWeak: boolean
  navbar: boolean
  menu: boolean
  hideMenu: boolean
  menuCollapse: boolean
  footer: boolean
  themeColor: string
  menuWidth: number
  tabBar: boolean
  [key: string]: unknown
}

const getSupportTheme = (): ApplicationTheme => {
  const isSupportTheme = (theme: string | null): theme is ApplicationTheme => {
    if (isNull(theme)) return false
    return (Object.values(ApplicationTheme) as string[]).includes(theme)
  }

  const themeValue = localStorage.getItem(LocalStorageKey.applicationTheme)
  if (isSupportTheme(themeValue)) {
    return themeValue
  }
  return ApplicationTheme.light
}
export default defineStore(StoreName.application, {
  state(): ApplicationState {
    return {
      theme: ApplicationTheme.light,
      colorWeak: false,
      navbar: true,
      menu: true,
      hideMenu: false,
      menuCollapse: false,
      footer: true,
      themeColor: '#165DFF',
      menuWidth: 220,
      globalSettings: false,
      tabBar: false
    }
  },
  persist: true,
  getters: {
    isDark(state: ApplicationState) {
      return state.theme === ApplicationTheme.dark
    }
  },
  actions: {
    updateSettings(partial: Partial<ApplicationState>) {
      // @ts-ignore-next-line
      this.$patch(partial)
    },

    toggleDarkLightMode() {
      if (this.isDark) {
        this.theme = ApplicationTheme.light
      } else {
        this.theme = ApplicationTheme.dark
      }
    },
    toggleDevice(device: string) {
      this.device = device
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value
    },
    async fetchServerMenuConfig() {
      // let notifyInstance: NotificationReturn | null = null;
      // try {
      //   notifyInstance = Notification.info({
      //     id: 'menuNotice', // Keep the instance id the same
      //     content: 'loading',
      //     closable: true,
      //   });
      //   const { data } = await getMenuList();
      //   this.serverMenu = data;
      //   notifyInstance = Notification.success({
      //     id: 'menuNotice',
      //     content: 'success',
      //     closable: true,
      //   });
      // } catch (error) {
      //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //   notifyInstance = Notification.error({
      //     id: 'menuNotice',
      //     content: 'error',
      //     closable: true,
      //   });
      // }
    },
    clearServerMenu() {
      this.serverMenu = []
    }
  }
})
