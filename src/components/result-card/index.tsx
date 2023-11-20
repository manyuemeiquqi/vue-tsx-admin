import { Card, Result } from '@arco-design/web-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    status: {
      type: String
    }
  },

  setup(props, ctx) {
    console.log('ctx: ', ctx.attrs)
    return () => (
      <Card class="content-wrapper">
        <Result {...(props as any)}>
          {{
            extra: () => ctx.slots?.extra && ctx.slots.extra(),
            default: () => ctx.slots?.default && ctx.slots.default()
          }}
        </Result>
      </Card>
    )
  }
})
