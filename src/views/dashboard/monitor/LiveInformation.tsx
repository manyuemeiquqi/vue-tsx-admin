import { Button, Card, Form, Input } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const formData = ref({})
    return () => (
      <Card>
        <Form model={formData.value} layout="vertical">
          <Form.Item label="t('monitor.studioInfo.label.studioTitle')" required>
            <Input placeholder={`王立群${t('monitor.studioInfo.placeholder.studioTitle')}`} />
          </Form.Item>
          <Form.Item label={t('monitor.studioInfo.label.onlineNotification')} required>
            <a-textarea />
          </Form.Item>
          <Form.Item label={t('monitor.studioInfo.label.studioCategory')} required>
            <Input.Search />
          </Form.Item>
          <Form.Item label={t('monitor.studioInfo.label.studioCategory')} required>
            <Input.Search />
          </Form.Item>
        </Form>
        <Button type="primary">{t('monitor.studioInfo.btn.fresh')}</Button>
      </Card>
    )
  }
})