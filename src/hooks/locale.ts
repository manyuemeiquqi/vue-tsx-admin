import { LocalStorageKey, LocaleOptions } from '@/types/constants'
import { Message } from '@arco-design/web-vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 *
 * @desc get project locale state hook
 * >state flow:
 * - i18n read storage to init
 * - app read i18n state and produce reactive data currentLocale
 * - update currentLocale with updating storage and i18n stance
 */
export default function useLocale() {
  const i18n = useI18n()
  const currentLocale = computed(() => i18n.locale.value)
  const changeLocale = (locale: string) => {
    if (i18n.locale.value === locale) return
    const isLocaleOption = (val: string): val is LocaleOptions => {
      return (Object.values(LocaleOptions) as string[]).includes(val)
    }
    if (isLocaleOption(locale)) {
      i18n.locale.value = locale
      localStorage.setItem(LocalStorageKey.localeKey, locale)
      Message.success(i18n.t('navbar.action.locale'))
    }
  }
  return {
    currentLocale,
    changeLocale
  }
}
