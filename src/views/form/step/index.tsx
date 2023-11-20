import {
  Typography,
  Card,
  Steps,
  Form,
  Input,
  Button,
  Space,
  Select,
  DatePicker,
  Result,
  Switch,
  InputTag
} from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const current = ref(1)
    const formData = ref({})
    return () => (
      <Card>
        <Typography.Title heading={5}>{t('stepForm.desc.basicInfo')}</Typography.Title>
        <div>
          <Steps current={current.value}>
            <Steps.Step
              title={t('stepForm.title.basicInfo')}
              description={t('stepForm.desc.basicInfo')}
            />
            <Steps.Step
              title={t('stepForm.title.channel')}
              description={t('stepForm.desc.channel')}
            />
            <Steps.Step
              title={t('stepForm.title.created')}
              description={t('stepForm.desc.created')}
            />
          </Steps>
          <Form model={formData.value}>
            {current.value === 1 && (
              <Form.Item noStyle>
                <Form.Item
                  label={t('stepForm.basicInfo.name')}
                  required
                  field="basic.name"
                  rules={[
                    {
                      required: true,
                      message: t('stepForm.basicInfo.name.required')
                    },
                    {
                      validator: (value: string, callback) => {
                        if (!/^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/g.test(value)) {
                          callback(t('stepForm.basicInfo.name.placeholder'))
                        }
                      }
                    }
                  ]}
                >
                  <Input placeholder={t('stepForm.basicInfo.name.placeholder')} />
                </Form.Item>
                <Form.Item
                  label={t('stepForm.basicInfo.channelType')}
                  required
                  field="basic.channelType"
                  rules={[
                    {
                      required: true,
                      message: t('stepForm.basicInfo.channelType.required')
                    }
                  ]}
                >
                  <Select>
                    <Select.Option value="app">APP通用渠道</Select.Option>
                    <Select.Option value="site">网页通用渠道</Select.Option>
                    <Select.Option value="game">游戏通用渠道</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label={t('stepForm.basicInfo.time')}
                  required
                  field="basic.time"
                  rules={[
                    {
                      required: true,
                      message: t('stepForm.basicInfo.time.required')
                    }
                  ]}
                >
                  <DatePicker.RangePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  label={t('stepForm.basicInfo.link')}
                  required
                  extra={t('stepForm.basicInfo.link.tips')}
                  field="basic.link"
                  rules={[{ required: true }]}
                >
                  <Input placeholder={t('stepForm.basicInfo.link.placeholder')} />
                </Form.Item>
              </Form.Item>
            )}
            {current.value === 2 && (
              <Form.Item noStyle>
                <Form.Item
                  label={t('stepForm.channel.source')}
                  required
                  field="channel.source"
                  rules={[
                    {
                      required: true,
                      message: t('stepForm.channel.source.required')
                    }
                  ]}
                >
                  <Input placeholder={t('stepForm.channel.source.placeholder')} />
                </Form.Item>
                <Form.Item
                  label={t('stepForm.channel.media')}
                  required
                  field="channel.media"
                  rules={[
                    {
                      required: true,
                      message: t('stepForm.channel.media.required')
                    }
                  ]}
                >
                  <Input placeholder={t('stepForm.channel.media.placeholder')} />
                </Form.Item>
                <Form.Item
                  label={t('stepForm.channel.keywords')}
                  required
                  field="channel.keywords"
                  rules={[{ required: true }]}
                >
                  <InputTag />
                </Form.Item>
                <Form.Item
                  label={t('stepForm.channel.remind')}
                  required
                  field="channel.remind"
                  rules={[{ required: true }]}
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label={t('stepForm.channel.content')}
                  required
                  field="channel.content"
                  rules={[
                    {
                      required: true,
                      message: t('stepForm.channel.content.required')
                    }
                  ]}
                >
                  <Input.TextArea placeholder={t('stepForm.channel.content.placeholder')} />
                </Form.Item>
              </Form.Item>
            )}
            {current.value !== 3 ? (
              <Form.Item label=" ">
                <Space>
                  {current.value === 2 && (
                    <Button size="large" onClick={() => {}}>
                      {t('stepForm.prev')}
                    </Button>
                  )}
                  {current.value !== 3 && (
                    <Button type="primary" size="large">
                      {t('stepForm.next')}
                    </Button>
                  )}
                </Space>
              </Form.Item>
            ) : (
              <Form.Item noStyle>
                <Result
                  status="success"
                  title={t('stepForm.created.success.title')}
                  subtitle={t('stepForm.created.success.desc')}
                >
                  {{
                    extra: () => (
                      <>
                        <Button key="reset" style={{ marginRight: 16 }} onClick={() => {}}>
                          {t('stepForm.created.success.view')}
                        </Button>
                        <Button key="again" type="primary" onClick={() => {}}>
                          {t('stepForm.created.success.again')}
                        </Button>
                      </>
                    )
                  }}
                </Result>
              </Form.Item>
            )}
          </Form>
        </div>
        {current.value === 3 && (
          <div>
            <Typography.Title heading={6}>{t('stepForm.created.extra.title')}</Typography.Title>
            <Typography.Paragraph>
              {t('stepForm.created.extra.desc')}
              <Button type="text">{t('stepForm.created.extra.detail')}</Button>
            </Typography.Paragraph>
          </div>
        )}
      </Card>
    )
  }
})
