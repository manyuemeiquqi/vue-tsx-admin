import { defineComponent } from 'vue'
import { Button, Result } from '@arco-design/web-vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: '500',
  setup() {
    const { t } = useI18n()
    return () => (
      <div class="content-wrapper">
        <Result status="500" subtitle={t('exception.result.500.description')}>
          {{
            extra: () => <Button type="primary">{t('exception.result.500.back')}</Button>
          }}
        </Result>
      </div>
    )
  }
})
