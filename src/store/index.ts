import { ref, computed } from 'vue'
import { createPinia, defineStore } from 'pinia'
import useUserStore from './modules/user'
import useTabStore from './modules/tab'
import useApplicationStore from './modules/application'

const pinia = createPinia()

export { useUserStore, useTabStore, useApplicationStore }

export enum StoreName {
  user = 'userStore',
  tab = 'tabrStore',
  application = 'applicationStore'
}
export default pinia
