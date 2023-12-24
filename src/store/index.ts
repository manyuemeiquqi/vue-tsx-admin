import { createPinia } from 'pinia'
import useApplicationStore from './modules/application'
import useTabStore from './modules/tab'
import useUserStore from './modules/user'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export { useApplicationStore, useTabStore, useUserStore }

export default pinia
