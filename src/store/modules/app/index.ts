import { defineStore } from 'pinia'
import { AppTheme } from '@/types/constants'

export interface AppState {
  theme: AppTheme
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

export default defineStore('appStore', {
  state(): AppState {
    return {
      theme: AppTheme.light,
      colorWeak: false,
      navbar: true,
      menu: true,
      menuCollapse: false,
      footer: true,
      themeColor: '#165DFF',
      menuWidth: 220,
      tabBar: false,
      settingVisible: false
    }
  },
  persist: true,
  getters: {
    isDark(state: AppState) {
      return state.theme === AppTheme.dark
    }
  },
  actions: {
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial)
    },
    resetSetting() {
      this.$reset()
    },
    toggleDarkLightMode() {
      if (this.isDark) {
        this.theme = AppTheme.light
      } else {
        this.theme = AppTheme.dark
      }
    }
  }
})
