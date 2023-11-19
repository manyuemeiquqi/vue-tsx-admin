{
  /* <template>
  <ErrorCard status="403" subtitle="对不起，您没有访问该资源的权限">
    <template #extra>
      <AButton> 返回</AButton>
    </template>
  </ErrorCard>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped></style>
 */
}

import { defineComponent } from 'vue'
import ErrorCard from '@/components/error-card/ErrorCard.vue'
import { Button } from '@arco-design/web-vue'

export default defineComponent({
  setup() {
    return () => (
      <ErrorCard
        v-slot={{
          extra: () => <Button>{'返回'}</Button>
        }}
        status="403"
        subtitle="对不起，您没有访问该资源的权限"
      ></ErrorCard>
    )
  }
})
