import dashboard from './zh-CN/dashboard.json'
import detail from './zh-CN/detail.json'
import exception from './zh-CN/exception.json'
import form from './zh-CN/form.json'
import list from './zh-CN/list.json'
import login from './zh-CN/login.json'
import result from './zh-CN/result.json'
import settings from './zh-CN/settings.json'
import user from './zh-CN/user.json'
import visualization from './zh-CN/visualization.json'
import global from './zh-CN/global.json'

export default {
  'messageBox.tab.title.message': '消息',
  'messageBox.tab.title.notice': '通知',
  'messageBox.tab.title.todo': '待办',
  'messageBox.tab.button': '清空',
  'messageBox.allRead': '全部已读',
  'messageBox.viewMore': '查看更多',
  'messageBox.noContent': '暂无内容',
  'messageBox.switchRoles': '切换角色',
  'messageBox.userCenter': '用户中心',
  'messageBox.userSettings': '用户设置',
  'messageBox.logout': '登出登录',

  'navbar.search.placeholder': '输入内容查询',
  ...global,
  ...dashboard,
  ...detail,
  ...exception,
  ...form,

  ...list,
  ...login,
  ...result,
  ...settings,
  ...user,
  ...visualization
}
