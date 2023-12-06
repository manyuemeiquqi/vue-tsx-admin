import dashboard from './en-US/dashboard.json'
import detail from './en-US/detail.json'
import exception from './en-US/exception.json'
import form from './en-US/form.json'
import list from './en-US/list.json'
import login from './en-US/login.json'
import result from './en-US/result.json'
import settings from './en-US/settings.json'
import user from './en-US/user.json'
import visualization from './en-US/visualization.json'

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
