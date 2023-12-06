import { Button, Typography } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)
    const handleClick = () => {
      count.value++
    }
    return () => (
      <div>
        <Typography.Title heading={1}>item 1</Typography.Title>
        {count.value}
        <Button onClick={handleClick}>+++</Button>
      </div>
    )
  }
})
