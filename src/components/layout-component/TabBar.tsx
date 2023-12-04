import { Affix } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return () => <Affix offsetTop={64}></Affix>
  }
})
