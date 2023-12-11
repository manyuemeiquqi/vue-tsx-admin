import { ref, computed } from 'vue'
import { createPinia, defineStore } from 'pinia'
import useUserStore from './modules/user'
import useTabStore from './modules/tab'

const pinia = createPinia()

export { useUserStore, useTabStore }
export default pinia
