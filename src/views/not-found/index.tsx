import CardLayout from '@/components/card-layout'
import { firstPermissionRoute } from '@/hooks/appRoute'
import { ViewNames } from '@/types/constants'
import { Button, Result, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: ViewNames.notFound,
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const handleBack = () => {
      router.push({
        name: firstPermissionRoute.name
      })
    }
    return () => (
      <div>
        <CardLayout>
          <Result status="404" subtitle={t('exception.result.404.description')}>
            {{
              extra: () => (
                <Space size="medium">
                  <Button>{t('exception.result.404.retry')}</Button>
                  <Button type="primary" onClick={handleBack}>
                    {t('exception.result.404.back')}
                  </Button>
                </Space>
              )
            }}
          </Result>
        </CardLayout>
      </div>
    )
  }
})
