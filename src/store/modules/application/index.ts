import { StoreName } from '@/store/type'
import { Notification } from '@arco-design/web-vue'
import { defineStore } from 'pinia'
import type { RouteRecordNormalized } from 'vue-router'

import type { NotificationReturn } from '@arco-design/web-vue/es/notification/interface'
export interface ApplicationState {
  theme: ApplicationTheme
  colorWeak: boolean
  navbar: boolean
  menu: boolean
  topMenu: boolean
  hideMenu: boolean
  menuCollapse: boolean
  footer: boolean
  themeColor: string
  menuWidth: number
  globalSettings: boolean
  device: string
  tabBar: boolean
  menuFromServer: boolean
  serverMenu: RouteRecordNormalized[]
  [key: string]: unknown
}

export enum ApplicationTheme {
  lingt = 'light',
  dark = 'dark'
}
export default defineStore(StoreName.application, {
  state(): ApplicationState {
    return {
      theme: ApplicationTheme.lingt,
      colorWeak: false,
      navbar: true,
      menu: true,
      topMenu: false,
      hideMenu: false,
      menuCollapse: false,
      footer: true,
      themeColor: '#165DFF',
      menuWidth: 220,
      globalSettings: false,
      device: 'desktop',
      tabBar: false,
      menuFromServer: false,
      serverMenu: []
    }
  },
  actions: {
    updateSettings(partial: Partial<ApplicationState>) {
      // @ts-ignore-next-line
      this.$patch(partial)
    },
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = ApplicationTheme.dark
        document.body.setAttribute('arco-theme', ApplicationTheme.dark)
      } else {
        this.theme = ApplicationTheme.lingt
        document.body.removeAttribute('arco-theme')
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
