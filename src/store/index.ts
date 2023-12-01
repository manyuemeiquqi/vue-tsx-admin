import { ref, computed } from 'vue'
import { createPinia, defineStore } from 'pinia'
import useUserStore from './modules/user'

const pinia = createPinia()

export { useUserStore }
export default pinia
