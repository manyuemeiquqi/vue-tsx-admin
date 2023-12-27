import { ConfigProvider } from '@arco-design/web-vue'
import { computed, defineComponent, watch } from 'vue'
import { RouterView } from 'vue-router'

import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import { AppTheme, LocaleOptions } from './types/constants'
import useLocale from './hooks/locale'
import { useAppStore } from './store'
import { generate, getRgbStr } from '@arco-design/color'

export default defineComponent({
  name: 'app',
  setup() {
    const appStore = useAppStore()
    const arcoLocaleMap = {
      [LocaleOptions.cn]: zhCN,
      [LocaleOptions.en]: enUS
    }
    const { currentLocale } = useLocale()
    const arcoLocale = computed(() => {
      switch (currentLocale.value) {
        case LocaleOptions.cn:
        case LocaleOptions.en:
          return arcoLocaleMap[currentLocale.value]
        default:
          return enUS
      }
    })
    watch(
      () => appStore.theme,
      (theme) => {
        if (theme === AppTheme.dark) {
          document.body.setAttribute('arco-theme', AppTheme.dark)
        } else {
          document.body.removeAttribute('arco-theme')
        }
      },
      {
        immediate: true
      }
    )
    watch(
      () => appStore.themeColor,
      (newColor) => {
        const newList = generate(newColor, {
          list: true,
          dark: appStore.isDark
        })
        newList.forEach((l: any, index: number) => {
          const rgbStr = getRgbStr(l)
          document.body.style.setProperty(`--arcoblue-${index + 1}`, rgbStr)
        })
      },
      {
        immediate: true
      }
    )
    watch(
      () => appStore.colorWeak,
      (colorWeak: boolean) => {
        document.body.style.filter = colorWeak ? 'invert(80%)' : 'none'
      },
      {
        immediate: true
      }
    )
    return () => (
      <ConfigProvider locale={arcoLocale.value}>
        <RouterView />
      </ConfigProvider>
    )
  }
})
