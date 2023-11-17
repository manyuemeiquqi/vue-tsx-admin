import useLoading from '@/hooks/loading'
import { Form, Link, Input, Space, Button, Checkbox, type FormInstance } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const { loading, setLoading } = useLoading()

    const formRef = ref<FormInstance>()
    const formData = {}

    const handleSubmit = () => {
      formRef.value?.validate().then(() => {
        loginAccount()
      })
    }
    const loginAccount = () => {}
    return () => (
      <Form model={formData} layout="vertical" ref={formRef}>
        <Form.Item field="userName">
          <Input placeholder={t('login.form.userName.placeholder')} />
        </Form.Item>
        <Form.Item field="password">
          <Input type="password" placeholder={t('login.form.password.placeholder')} />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div>
            <Checkbox>{t('login.form.rememberPassword')}</Checkbox>
            <Link>{t('login.form.forgetPassword')}</Link>
          </div>
          <Button type="primary" long onClick={handleSubmit}>
            {t('login.form.login')}
          </Button>
          <Button type="text" long>
            {t('login.form.register')}
          </Button>
        </Space>
      </Form>
    )
  }
})
