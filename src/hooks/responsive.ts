import { onMounted, onBeforeMount, onBeforeUnmount } from 'vue'
import { useApplicationStore } from '@/store'
import { addEventListen, removeEventListen } from '@/utils/event'
import { debounce } from 'lodash'

const WIDTH = 992 // https://arco.design/vue/component/grid#responsivevalue

function queryDevice() {
  const rect = document.body.getBoundingClientRect()
  return rect.width - 1 < WIDTH
}

export default function useResponsive(immediate?: boolean) {
  const applicationStore = useApplicationStore()
  function resizeHandler() {
    if (!document.hidden) {
      const isMobile = queryDevice()
      applicationStore.toggleDevice(isMobile ? 'mobile' : 'desktop')
      applicationStore.toggleMenu(isMobile)
    }
  }
  const debounceFn = debounce(resizeHandler, 100)
  onMounted(() => {
    if (immediate) debounceFn()
  })
  onBeforeMount(() => {
    addEventListen(window, 'resize', debounceFn)
  })
  onBeforeUnmount(() => {
    removeEventListen(window, 'resize', debounceFn)
  })
}
