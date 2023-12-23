import CardLayout from '@/components/card-layout'
import { Button, Result, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: '404',
  setup() {
    const { t } = useI18n()
    return () => (
      <div>
        <CardLayout>
          <Result status="404" subtitle={t('exception.result.404.description')}>
            {{
              extra: () => (
                <Space size="medium">
                  <Button>{t('exception.result.404.retry')}</Button>
                  <Button type="primary">{t('exception.result.404.back')}</Button>
                </Space>
              )
            }}
          </Result>
        </CardLayout>
      </div>
    )
  }
})
