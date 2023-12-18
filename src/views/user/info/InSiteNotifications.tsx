import useLoading from '@/hooks/loading'
import { Card, Result, Skeleton } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'InSiteNotifications',
  setup() {
    const { t } = useI18n()
    const { loading, setLoading } = useLoading(true)
    // just mock
    setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => (
      <Card title={t('userInfo.title.latestNotification')} class="general-card">
        {loading.value ? (
          <Skeleton animation>
            <Skeleton.Line rows={3}></Skeleton.Line>
          </Skeleton>
        ) : (
          <Result subtitle={t('userInfo.nodata')} status="404"></Result>
        )}
      </Card>
    )
  }
})
