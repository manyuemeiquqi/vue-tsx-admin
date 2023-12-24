import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    const redirectRouteName = route.params.name as string
    console.log('redirectRouteName: ', redirectRouteName)

    router.replace({ name: redirectRouteName })
    return () => <div></div>
  }
})
