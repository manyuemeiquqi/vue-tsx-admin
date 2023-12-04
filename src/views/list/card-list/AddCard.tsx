import { Card } from '@arco-design/web-vue'
import { IconPlus } from '@arco-design/web-vue/es/icon'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <Card class="general-card" size="small">
        <div>
          <div>
            <IconPlus />
          </div>
          <div>{props.description}</div>
        </div>
      </Card>
    )
  }
})
