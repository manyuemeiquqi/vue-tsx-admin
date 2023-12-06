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

export default {
  'menu.dashboard': '仪表盘',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
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
