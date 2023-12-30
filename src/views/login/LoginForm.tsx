import { type LoginData } from '@/api/user'
import useAuth from '@/hooks/auth'
import useLoading from '@/hooks/loading'
import { ApplicationInfo, LocalStorageKey, ViewNames } from '@/types/constants'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Link,
  Message,
  Space,
  Typography,
  type FieldRule,
  type ValidatedError
} from '@arco-design/web-vue'
import { IconLock, IconUser } from '@arco-design/web-vue/es/icon'
import { useStorage } from '@vueuse/core'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Logo from '@/assets/logo.svg'
import { firstPermissionRoute } from '@/hooks/appRoute'
export default defineComponent({
  name: 'loginForm',
  setup() {
    const { t } = useI18n()
    const { loading, setLoading } = useLoading()
    const router = useRouter()
    const { loginApp } = useAuth()
    const storageLoginInfo = useStorage(LocalStorageKey.loginFormKey, {
      rememberPassword: true,
      username: 'admin',
      password: 'admin'
    })
    const loginFormData = ref<LoginData>({
      username: storageLoginInfo.value.username,
      password: storageLoginInfo.value.password
    })

    const errorMessage = ref<unknown>()

    const formRules: Record<string, FieldRule | FieldRule[]> = {
      username: [{ required: true, message: t('login.form.userName.errMsg') }],
      password: [{ required: true, message: t('login.form.password.errMsg') }]
    }
    const handleSubmit = async ({
      errors,
      values
    }: {
      errors: Record<string, ValidatedError> | undefined
      values: Record<string, any>
    }) => {
      if (loading.value) return
      if (!errors) {
        setLoading(true)
        try {
          await loginApp(values as LoginData)
          router.push({
            name: firstPermissionRoute.name
          })
          Message.success(t('login.form.login.success'))
          const { rememberPassword } = storageLoginInfo.value
          const { username, password } = values
          storageLoginInfo.value.username = rememberPassword ? username : ''
          storageLoginInfo.value.password = rememberPassword ? password : ''
        } catch (err) {
          errorMessage.value = (err as Error).message
        } finally {
          setLoading(false)
        }
      }
    }

    return () => (
      <div class="w-96">
        <Space direction="vertical">
          <Space align="center">
            <img src={Logo} alt="logo" class={['w-8', 'h-8']} />
            <span class={['text-2xl', 'text-[var(--color-text-1)]']}>
              {ApplicationInfo.appTitle}
            </span>
          </Space>
          <Typography.Text class={'text-[color:var(--color-text-3)] '}>
            {t('login.form.title')}
          </Typography.Text>
          <Typography class={'text-[color:rgb(var(--red-6))]'}>{errorMessage.value}</Typography>
        </Space>
        <Form
          rules={formRules}
          model={loginFormData.value}
          layout="vertical"
          onSubmit={handleSubmit}
        >
          <Form.Item field="username" validateTrigger={['change', 'blur']} hideLabel>
            <Input
              v-model={loginFormData.value.username}
              placeholder={t('login.form.userName.placeholder')}
            >
              {{ prefix: () => <IconUser /> }}
            </Input>
          </Form.Item>
          <Form.Item field="password" validateTrigger={['change', 'blur']} hideLabel>
            <Input
              v-model={loginFormData.value.password}
              type="password"
              allowClear
              placeholder={t('login.form.password.placeholder')}
            >
              {{ prefix: () => <IconLock /> }}
            </Input>
          </Form.Item>
          <Space size={16} direction="vertical">
            <div class="flex justify-between">
              <Checkbox v-model={storageLoginInfo.value.rememberPassword}>
                {t('login.form.rememberPassword')}
              </Checkbox>
              <Link>{t('login.form.forgetPassword')}</Link>
            </div>
            <Button type="primary" htmlType="submit" loading={loading.value} long>
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
