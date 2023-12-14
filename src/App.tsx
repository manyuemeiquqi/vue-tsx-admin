import { ConfigProvider } from '@arco-design/web-vue'
import { computed, defineComponent, watch } from 'vue'
import { RouterView } from 'vue-router'

import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import { ApplicationTheme, LocaleOptions } from './types/enum'
import useLocale from './hooks/locale'
import { useApplicationStore } from './store'

export default defineComponent({
  setup() {
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
    const applicationStroe = useApplicationStore()
    watch(
      () => applicationStroe.theme,
      (theme) => {
        console.log(theme)
        if (theme === ApplicationTheme.dark) {
          document.body.setAttribute('arco-theme', ApplicationTheme.dark)
        } else {
          document.body.removeAttribute('arco-theme')
        }
      },
      {
        immediate: true
      }
    )
    return () => (
      <>
        <ConfigProvider locale={arcoLocale.value}>
          <RouterView />
        </ConfigProvider>
      </>
    )
  }
})
