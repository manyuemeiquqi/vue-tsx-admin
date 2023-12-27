import { ViewNames } from '@/types/constants'
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: ViewNames.redirect,
  setup() {
    const router = useRouter()
    const route = useRoute()
    const fullPath = route.params.path as string
    router.replace({ path: fullPath })
    return () => <div></div>
  }
})
