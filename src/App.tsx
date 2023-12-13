import { ConfigProvider } from '@arco-design/web-vue'
import { computed, defineComponent } from 'vue'
import { RouterView } from 'vue-router'

import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
import { LocaleOptions } from './types/enum'
import useLocale from './hooks/locale'
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
    return () => (
      <>
        <ConfigProvider locale={arcoLocale.value}>
          <RouterView />
        </ConfigProvider>
      </>
    )
  }
})
