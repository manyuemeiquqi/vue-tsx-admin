import { Breadcrumb } from '@arco-design/web-vue'
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, type RouteLocationMatched } from 'vue-router'
export default defineComponent({
  setup() {
    const route = useRoute()
    const { t } = useI18n()
    const breadData = ref<RouteLocationMatched[]>(route.matched)
    watch(route, (val) => {
      breadData.value = route.matched
    })
    return () => (
      <Breadcrumb>
        {breadData.value.map((item) => (
          <Breadcrumb.Item>{t(item.meta.locale + '')}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    )
  }
})
