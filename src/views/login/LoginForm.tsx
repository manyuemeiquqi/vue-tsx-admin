import { Form, Link, Input, Space, Button, Checkbox, type FormInstance } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const formRef = ref<FormInstance>()
    return () => (
      <Form
        className={styles['login-form']}
        layout="vertical"
        ref={formRef}
        initialValues={{ userName: 'admin', password: 'admin' }}
      >
        <Form.Item
          field="userName"
          rules={[{ required: true, message: t['login.form.userName.errMsg'] }]}
        >
          <Input
            prefix={<icon-user />}
            placeholder={t['login.form.userName.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: t['login.form.password.errMsg'] }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t['login.form.password.placeholder']}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className={styles['login-form-password-actions']}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t['login.form.rememberPassword']}
            </Checkbox>
            <Link>{t['login.form.forgetPassword']}</Link>
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t['login.form.login']}
          </Button>
          <Button type="text" long className={styles['login-form-register-btn']}>
            {t['login.form.register']}
          </Button>
        </Space>
      </Form>
    )
  }
})
