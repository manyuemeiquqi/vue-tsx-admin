import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const fullPath = route.params.path as string
    router.replace({ path: fullPath })
    return () => <div></div>
  }
})
