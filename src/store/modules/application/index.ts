import { defineStore } from 'pinia'
import { ApplicationTheme, StoreName, layoutStyleConfig } from '@/types/constants'

export interface ApplicationState {
  theme: ApplicationTheme
  colorWeak: boolean
  navbar: boolean
  menu: boolean
  menuCollapse: boolean
  footer: boolean
  themeColor: string
  menuWidth: number
  tabBar: boolean

  settingVisible: boolean
  [key: string]: unknown
}

export default defineStore(StoreName.application, {
  state(): ApplicationState {
    return {
      theme: ApplicationTheme.light,
      colorWeak: false,
      navbar: true,
      menu: true,
      menuCollapse: false,
      footer: true,
      themeColor: '#165DFF',
      menuWidth: 220,
      tabBar: false,
      // ------------DIVIDER----------
      settingVisible: false
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
    resetSetting() {
      this.$reset()
    },
    toggleDarkLightMode() {
      if (this.isDark) {
        this.theme = ApplicationTheme.light
      } else {
        this.theme = ApplicationTheme.dark
      }
    }
  }
})
