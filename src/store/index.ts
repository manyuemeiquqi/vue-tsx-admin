import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import useTabStore from './modules/tab'
import useUserStore from './modules/user'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export { useAppStore, useTabStore, useUserStore }

export default pinia
