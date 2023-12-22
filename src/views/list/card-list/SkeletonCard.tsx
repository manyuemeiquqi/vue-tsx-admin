import { Card, Grid, Skeleton } from '@arco-design/web-vue'
import { defineComponent } from 'vue'

import styles from './style.module.scss'
import { itemSpan } from '.'
export default defineComponent({
  name: 'SkeletonCard',
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    return () => (
      <Grid.Item span={itemSpan}>
        <Card class={[styles['skeleton-card']]}>
          <Skeleton loading={props.loading} animation>
            <Skeleton.Line widths={['100%', '40%', '100%']} rows={3}></Skeleton.Line>
          </Skeleton>
          <Skeleton class="mt-2" loading={props.loading} animation>
            <Skeleton.Line widths={['100%']} rows={1}></Skeleton.Line>
          </Skeleton>
        </Card>
      </Grid.Item>
    )
  }
})
