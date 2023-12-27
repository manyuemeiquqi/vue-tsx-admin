import { Grid, Space, Typography } from '@arco-design/web-vue'
import { IconCommand, IconStar } from '@arco-design/web-vue/es/icon'
import { defineComponent, type PropType } from 'vue'
import styles from './style.module.scss'
import type { ChatRecord } from '@/api/dashboard/type'
export default defineComponent({
  name: 'MessageItem',
  props: {
    data: {
      type: Object as PropType<ChatRecord>,
      default() {
        return {}
      }
    }
  },
  setup(props) {
    return () => (
      <Space class={[styles['chat-item']]} size={4} direction="vertical" fill>
        <Typography.Text class="text-[rgb(var(--warning-6))] text-xs">
          {props.data.username}
        </Typography.Text>
        <Typography.Text class="text-xs">{props.data.content}</Typography.Text>
        <Grid.Row justify="space-between" align="center">
          <Typography.Text class="text-[var(--color-text-2)]">{props.data.time}</Typography.Text>
          <Space size="small" class={[styles['chat-item-actions']]}>
            <div class={[styles['chat-item-actions-item']]}>
              <IconCommand />
            </div>
            <div class={[styles['chat-item-actions-item']]}>
              <IconStar class={[props.data.isCollect && 'text-[rgb(var(--gold-6))]']} />
            </div>
          </Space>
        </Grid.Row>
      </Space>
    )
  }
})
