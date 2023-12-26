import { layoutStyleConfig } from '@/types/constants'
import { Breadcrumb } from '@arco-design/web-vue'
import { IconApps } from '@arco-design/web-vue/es/icon'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'BreadcrumbComponent',
  setup() {
    const route = useRoute()
    const { t } = useI18n()

    return () => (
      <div
        style={{
          height: layoutStyleConfig.breadcrumbHeight + 'px'
        }}
      >
        <Breadcrumb class={['mb-4', 'mt-4']}>
          <Breadcrumb.Item>
            <IconApps />
          </Breadcrumb.Item>
          {route.matched.map((item) => (
            <Breadcrumb.Item>{t(item.meta.locale + '')}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
    )
  }
})
