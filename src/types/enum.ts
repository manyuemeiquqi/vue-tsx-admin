export enum LocaleOptions {
  cn = 'zh-CN',
  en = 'en-US'
}
export enum LocalStorageKey {
  localeKey = 'vtsc-locale',
  applicationTheme = 'vtsc-theme',
  loginFormInfo = 'login-form-info'
}
export enum ApplicationTheme {
  light = 'light',
  dark = 'dark'
}

export enum StoreName {
  user = 'userStore',
  tab = 'tabStore',
  application = 'applicationStore'
}

export enum ApplicationInfo {
  appTitle = 'Vue TSX Admin'
}

export enum AppRouteNames {
  login = 'LOGIN',
  redirect = 'REDIRECT',
  notFound = 'NOT_FOUND',

  // =============== DIVIDER ==================
  dashboard = 'DASHBOARD',
  workplace = 'WORKPLACE',
  monitor = 'MONITOR',

  // =============== DIVIDER ==================

  exception = 'exception',
  _403 = '403',
  _404 = '404',
  _500 = '500',

  // =============== DIVIDER ==================
  form = 'FORM',
  step = 'STEP',
  group = 'GROUP',
  // =============== DIVIDER ==================
  profile = 'PROFILE',
  detail = 'DETAIL',

  // =============== DIVIDER ==================

  list = 'LIST',
  searchTable = 'SEARCH_TABLE',
  card = 'CARD',
  // =============== DIVIDER ==================
  result = 'RESULT',
  success = 'SUCCESS',
  error = 'ERROR',

  // =============== DIVIDER ==================

  user = 'USER',
  info = 'INFO',
  setting = 'SETTING'

  // =============== DIVIDER ==================
}
