export enum LocaleOptions {
  cn = 'zh-CN',
  en = 'en-US'
}
export enum LocalStorageKey {
  localeKey = 'VUE_TSX_ADMIN_LOCALE',
  loginFormKey = 'VUE_TSX_ADMIN_LOGIN_FORM_INFO'
}
export enum AppTheme {
  light = 'light',
  dark = 'dark'
}

export enum ApplicationInfo {
  APP_TITLE = 'Vue TSX Admin'
}

export enum CompNameEnum {
  login = 'login',
  redirect = 'redirect',
  notFound = 'notFound',

  // =============== DIVIDER ==================
  dashboard = 'dashboard',
  workplace = 'workplace',
  monitor = 'monitor',

  // =============== DIVIDER ==================

  exception = 'exception',
  _403 = '403',
  _404 = '404',
  _500 = '500',

  // =============== DIVIDER ==================
  form = 'form',
  step = 'step',
  group = 'group',
  // =============== DIVIDER ==================
  profile = 'profile',

  // =============== DIVIDER ==================

  list = 'list',
  searchTable = 'searchTable',
  card = 'card',
  // =============== DIVIDER ==================
  result = 'result',
  success = 'success',
  error = 'error',

  // =============== DIVIDER ==================

  user = 'user',
  info = 'info',
  setting = 'setting'

  // =============== DIVIDER ==================
}

export const NOT_FOUND_ROUTE = {
  name: CompNameEnum.notFound
}

export const layoutStyleConfig = {
  NAVBAR_HEIGHT: 64,
  BREAD_HEIGHT: 52,
  TAB_HEIGHT: 40,
  FOOTER_HEIGHT: 35
} as const
