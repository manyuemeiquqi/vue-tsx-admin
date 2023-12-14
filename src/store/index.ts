import { ref, computed } from 'vue'
import { createPinia, defineStore } from 'pinia'
import useUserStore from './modules/user'
import useTabStore from './modules/tab'
import useApplicationStore from './modules/application'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

export { useUserStore, useTabStore, useApplicationStore }

export default pinia
