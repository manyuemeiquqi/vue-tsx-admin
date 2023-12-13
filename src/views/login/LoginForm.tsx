import useLoading from '@/hooks/loading'
import { Form, Link, Input, Space, Button, Checkbox, type FormInstance } from '@arco-design/web-vue'
import { IconLock, IconUser } from '@arco-design/web-vue/es/icon'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const { loading, setLoading } = useLoading()
    const router = useRouter()
    const formRef = ref<FormInstance>()
    const formData = ref({
      username: '',
      password: ''
    })

    const handleSubmit = () => {
      router.push({
        name: 'workbench'
      })
      // if (loading.value) return
      // formRef.value?.validate().then(() => {
      //   loginAccount()
      // })
    }
    const loginAccount = () => {}
    return () => (
      <div class="w-80">
        <Form model={formData} layout="vertical" ref={formRef}>
          <Form.Item field="userName">
            <Input
              v-model={formData.value.username}
              placeholder={t('login.form.userName.placeholder')}
            >
              {{ prefix: () => <IconUser /> }}
            </Input>
          </Form.Item>
          <Form.Item field="password">
            <Input
              v-model={formData.value.password}
              type="password"
              allowClear
              placeholder={t('login.form.password.placeholder')}
            >
              {{ prefix: () => <IconLock /> }}
            </Input>
          </Form.Item>
          <Space size={16} direction="vertical">
            <div class="flex justify-between">
              <Checkbox>{t('login.form.rememberPassword')}</Checkbox>
              <Link>{t('login.form.forgetPassword')}</Link>
            </div>
            <Button type="primary" loading={loading.value} long onClick={handleSubmit}>
              {t('login.form.login')}
            </Button>
            <Button type="text" long>
              {t('login.form.register')}
            </Button>
          </Space>
        </Form>
      </div>
    )
  }
})
