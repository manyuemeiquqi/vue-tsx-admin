import { Result } from '@arco-design/web-vue'
import { defineComponent, type Slots } from 'vue'

interface ResultCardSlots extends Slots {
  // extra?: 1
}
export default defineComponent({
  setup(_, slots) {
    // return () => <Result>{{ extra: () => (slots as Slots & { extra: any }).extra() }}</Result>
    return <div></div>
  }
})
