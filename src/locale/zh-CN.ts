import dashboard from './zh-CN/dashboard.json'
import detail from './zh-CN/detail.json'
import exception from './zh-CN/exception.json'
import form from './zh-CN/form.json'
import list from './zh-CN/list.json'
import login from './zh-CN/login.json'
import result from './zh-CN/result.json'
import settings from './zh-CN/settings.json'
import user from './zh-CN/user.json'
import global from './zh-CN/global.json'

export default {
  ...global,
  ...dashboard,
  ...detail,
  ...exception,
  ...form,

  ...list,
  ...login,
  ...result,
  ...settings,
  ...user
}
