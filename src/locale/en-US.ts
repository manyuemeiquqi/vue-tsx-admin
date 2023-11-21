import dashboard from './en-US/dashboard'
import detail from './en-US/detail'
import exception from './en-US/exception'
import form from './en-US/form'
import list from './en-US/list'
import login from './en-US/login'
import result from './en-US/result'
import settings from './en-US/settings'
import user from './en-US/user'
import visualization from './en-US/visualization'

export default {
  'menu.dashboard': 'Dashboard',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',

  'messageBox.tab.title.message': 'Message',
  'messageBox.tab.title.notice': 'Notice',
  'messageBox.tab.title.todo': 'Todo',
  'messageBox.tab.button': 'empty',
  'messageBox.allRead': 'All Read',
  'messageBox.viewMore': 'View More',
  'messageBox.noContent': 'No Content',
  'messageBox.switchRoles': 'Switch Roles',
  'messageBox.userCenter': 'User Center',
  'messageBox.userSettings': 'User Settings',
  'messageBox.logout': 'Logout',

  'navbar.search.placeholder': 'Please search',
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
