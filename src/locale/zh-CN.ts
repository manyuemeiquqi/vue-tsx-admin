import dashboard from './zh-CN/dashboard'
import detail from './zh-CN/detail'
import exception from './zh-CN/exception'
import form from './zh-CN/form'
import list from './zh-CN/list'
import login from './zh-CN/login'
import result from './zh-CN/result'
import settings from './zh-CN/settings'
import user from './zh-CN/user'
import visualization from './zh-CN/visualization'

export default {
  'menu.dashboard': '仪表盘',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',

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
