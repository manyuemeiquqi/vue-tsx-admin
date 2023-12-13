import { createI18n } from 'vue-i18n'
import en from './en-US'
import cn from './zh-CN'
import { LocalStorageKey, LocaleOptions } from '@/types/enum'

const defaultLocale = localStorage.getItem(LocalStorageKey.localeKey) || LocaleOptions.en

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: LocaleOptions.cn,
  legacy: false,
  allowComposition: true,
  messages: {
    [LocaleOptions.en]: en,
    [LocaleOptions.cn]: cn
  }
})

export default i18n
