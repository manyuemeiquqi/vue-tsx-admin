// import localeMessageBox from '@/components/message-box/locale/zh-CN';
// import localeLogin from '@/views/login/locale/zh-CN';

// import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';

// import localeMonitor from '@/views/dashboard/monitor/locale/zh-CN';

// import localeSearchTable from '@/views/list/search-table/locale/zh-CN';
// import localeCardList from '@/views/list/card/locale/zh-CN';

// import localeStepForm from '@/views/form/step/locale/zh-CN';
// import localeGroupForm from '@/views/form/group/locale/zh-CN';

// import localeBasicProfile from '@/views/profile/basic/locale/zh-CN';

// import localeDataAnalysis from '@/views/visualization/data-analysis/locale/zh-CN';
// import localeMultiDAnalysis from '@/views/visualization/multi-dimension-data-analysis/locale/zh-CN';

// import localeSuccess from '@/views/result/success/locale/zh-CN';
// import localeError from '@/views/result/error/locale/zh-CN';

// import locale403 from '@/views/exception/403/locale/zh-CN';
// import locale404 from '@/views/exception/404/locale/zh-CN';
// import locale500 from '@/views/exception/500/locale/zh-CN';

// import localeUserInfo from '@/views/user/info/locale/zh-CN';
// import localeUserSetting from '@/views/user/setting/locale/zh-CN';

import localeSettings from './zh-CN/settings'

export default {
  'menu.dashboard': '仪表盘',
  'menu.server.dashboard': '仪表盘-服务端',
  'menu.server.workplace': '工作台-服务端',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',

  'login.form.title': '登录 Arco Design Pro',
  'login.form.userName.errMsg': '用户名不能为空',
  'login.form.password.errMsg': '密码不能为空',
  'login.form.login.errMsg': '登录出错，轻刷新重试',
  'login.form.login.success': '欢迎使用',
  'login.form.userName.placeholder': '用户名：admin',
  'login.form.password.placeholder': '密码：admin',
  'login.form.rememberPassword': '记住密码',
  'login.form.forgetPassword': '忘记密码',
  'login.form.login': '登录',
  'login.form.register': '注册账号',
  'login.banner.slogan1': '开箱即用的高质量模板',
  'login.banner.subSlogan1': '丰富的的页面模板，覆盖大多数典型业务场景',
  'login.banner.slogan2': '内置了常见问题的解决方案',
  'login.banner.subSlogan2': '国际化，路由配置，状态管理应有尽有',
  'login.banner.slogan3': '接入可视化增强工具AUX',
  'login.banner.subSlogan3': '实现灵活的区块式开发',

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

  'settings.title': '页面配置',
  'settings.themeColor': '主题色',
  'settings.content': '内容区域',
  'settings.search': '搜索',
  'settings.language': '语言',
  'settings.navbar': '导航栏',
  'settings.menuWidth': '菜单宽度 (px)',
  'settings.navbar.theme.toLight': '点击切换为亮色模式',
  'settings.navbar.theme.toDark': '点击切换为暗黑模式',
  'settings.navbar.screen.toFull': '点击切换全屏模式',
  'settings.navbar.screen.toExit': '点击退出全屏模式',
  'settings.navbar.alerts': '消息通知',
  'settings.menu': '菜单栏',
  'settings.topMenu': '顶部菜单栏',
  'settings.tabBar': '多页签',
  'settings.footer': '底部',
  'settings.otherSettings': '其他设置',
  'settings.colorWeak': '色弱模式',
  'settings.alertContent':
    '配置之后仅是临时生效，要想真正作用于项目，点击下方的 "复制配置" 按钮，将配置替换到 settings.json 中即可。',
  'settings.copySettings': '复制配置',
  'settings.copySettings.message': '复制成功，请粘贴到 src/settings.json 文件中',
  'settings.close': '关闭',
  'settings.color.tooltip':
    '根据主题颜色生成的 10 个梯度色（将配置复制到项目中，主题色才能对亮色 / 暗黑模式同时生效）',
  'settings.menuFromServer': '菜单来源于后台',

  'menu.list.searchTable': '查询表格',
  'searchTable.form.number': '集合编号',
  'searchTable.form.number.placeholder': '请输入集合编号',
  'searchTable.form.name': '集合名称',
  'searchTable.form.name.placeholder': '请输入集合名称',
  'searchTable.form.contentType': '内容体裁',
  'searchTable.form.contentType.img': '图文',
  'searchTable.form.contentType.horizontalVideo': '横版短视频',
  'searchTable.form.contentType.verticalVideo': '竖版小视频',
  'searchTable.form.filterType': '筛选方式',
  'searchTable.form.filterType.artificial': '人工筛选',
  'searchTable.form.filterType.rules': '规则筛选',
  'searchTable.form.createdTime': '创建时间',
  'searchTable.form.status': '状态',
  'searchTable.form.status.online': '已上线',
  'searchTable.form.status.offline': '已下线',
  'searchTable.form.search': '查询',
  'searchTable.form.reset': '重置',
  'searchTable.form.selectDefault': '全部',
  'searchTable.operation.create': '新建',
  'searchTable.operation.import': '批量导入',
  'searchTable.operation.download': '下载',
  // columns
  'searchTable.columns.index': '#',
  'searchTable.columns.number': '集合编号',
  'searchTable.columns.name': '集合名称',
  'searchTable.columns.contentType': '内容体裁',
  'searchTable.columns.filterType': '筛选方式',
  'searchTable.columns.count': '内容量',
  'searchTable.columns.createdTime': '创建时间',
  'searchTable.columns.status': '状态',
  'searchTable.columns.operations': '操作',
  'searchTable.columns.operations.view': '查看',

  // size
  'searchTable.size.mini': '迷你',
  'searchTable.size.small': '偏小',
  'searchTable.size.medium': '中等',
  'searchTable.size.large': '偏大',
  // actions
  'searchTable.actions.refresh': '刷新',
  'searchTable.actions.density': '密度',
  'searchTable.actions.columnSetting': '列设置',

  'menu.exception.500': '500',
  'exception.result.500.description': '抱歉，服务器出了点问题～',
  'exception.result.500.back': '返回',
  'menu.exception.404': '404',
  'exception.result.404.description': '抱歉，页面不见了～',
  'exception.result.404.retry': '重试',
  'exception.result.404.back': '返回',

  'menu.exception.403': '403',
  'exception.result.403.description': '对不起，您没有访问该资源的权限',
  'exception.result.403.back': '返回'
  // ...localeSettings,
  // ...localeMessageBox,
  // ...localeLogin,
  // ...localeWorkplace,

  // ...localeMonitor,
  // ...localeSearchTable,
  // ...localeCardList,
  // ...localeStepForm,
  // ...localeGroupForm,
  // ...localeBasicProfile,
  // ...localeDataAnalysis,
  // ...localeMultiDAnalysis,
  // ...localeSuccess,
  // ...localeError,
  // ...locale403,
  // ...locale404,
  // ...locale500,
  // ...localeUserInfo,
  // ...localeUserSetting,
}
