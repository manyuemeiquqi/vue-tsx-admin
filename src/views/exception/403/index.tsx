import { Button, Result, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: '403',
  setup() {
    const { t } = useI18n()
    return () => (
      <div class="content-wrapper">
        <Result status={'403'} subtitle={t('exception.result.403.description')}>
          {{
            extra: () => (
              <Space size={'medium'}>
                <Button type="primary">{t('exception.result.403.back')}</Button>
              </Space>
            )
          }}
        </Result>
      </div>
    )
  }
})
