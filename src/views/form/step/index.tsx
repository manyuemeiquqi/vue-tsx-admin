import { submitChannelForm, type UnitChannelModel } from '@/api/form'
import useLoading from '@/hooks/loading'
import { ViewNames } from '@/types/constants'
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputTag,
  Message,
  Result,
  Select,
  Space,
  Steps,
  Switch,
  Textarea,
  Typography,
  type FormInstance
} from '@arco-design/web-vue'
import { isEmpty } from 'lodash'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: ViewNames.step,
  setup() {
    const { loading, setLoading } = useLoading(false)
    const { t } = useI18n()
    const current = ref(1)
    const getDefaultFormData = () => ({
      activityName: '',
      channelType: '',
      promotionTime: [],
      promoteLink: 'https://github.com/',
      advertisingSource: '',
      advertisingMedia: '',
      keyword: [],
      pushNotify: true,
      advertisingContent: ''
    })
    const formData = ref<UnitChannelModel>(getDefaultFormData())
    const formRef = ref<FormInstance>()

    // form actions
    const handlePrev = () => {
      current.value--
    }
    const handleNext = async () => {
      try {
        setLoading(true)
        const errors = await formRef.value?.validate()
        if (isEmpty(errors)) {
          if (current.value === 2) {
            await submitChannelForm(formData.value)
            Message.success('提交成功')
          }
          current.value++
        }
      } catch (e) {
        /* empty */
      } finally {
        setLoading(false)
      }
    }
    const viewForm = () => {
      current.value = 1
    }
    const recreateForm = () => {
      formData.value = getDefaultFormData()
      current.value = 1
    }

    return () => (
      <div>
        <Card class="general-card " title={t('stepForm.desc.basicInfo')}>
          <div class={['flex', 'items-center', 'flex-col']}>
            <Steps class={['mb-8', 'w-[800px]']} line-less current={current.value}>
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
            <Form
              class="max-w-lg"
              ref={formRef}
              labelColProps={{ span: 8 }}
              wrapperColProps={{ span: 16 }}
              model={formData.value}
            >
              {current.value === 1 && (
                <Form.Item noStyle>
                  <Form.Item
                    label={t('stepForm.basicInfo.name')}
                    required
                    field="activityName"
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
                    <Input
                      v-model={formData.value.activityName}
                      placeholder={t('stepForm.basicInfo.name.placeholder')}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t('stepForm.basicInfo.channelType')}
                    required
                    field="channelType"
                    rules={[
                      {
                        required: true,
                        message: t('stepForm.basicInfo.channelType.required')
                      }
                    ]}
                  >
                    <Select
                      v-model={formData.value.channelType}
                      placeholder={t('stepForm.placeholder.channelType')}
                    >
                      <Select.Option value="app">APP通用渠道</Select.Option>
                      <Select.Option value="site">网页通用渠道</Select.Option>
                      <Select.Option value="game">游戏通用渠道</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={t('stepForm.basicInfo.time')}
                    required
                    field="promotionTime"
                    rules={[
                      {
                        required: true,
                        message: t('stepForm.basicInfo.time.required')
                      }
                    ]}
                  >
                    <DatePicker.RangePicker
                      class="w-full"
                      v-model={formData.value.promotionTime}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t('stepForm.basicInfo.link')}
                    required
                    extra={t('stepForm.basicInfo.link.tips')}
                    field="promoteLink"
                    rules={[{ required: true }]}
                  >
                    <Input
                      v-model={formData.value.promoteLink}
                      placeholder={t('stepForm.basicInfo.link.placeholder')}
                    />
                  </Form.Item>
                </Form.Item>
              )}
              {current.value === 2 && (
                <Form.Item noStyle>
                  <Form.Item
                    label={t('stepForm.channel.source')}
                    required
                    field="advertisingSource"
                    rules={[
                      {
                        required: true,
                        message: t('stepForm.channel.source.required')
                      }
                    ]}
                  >
                    <Input
                      v-model={formData.value.advertisingSource}
                      placeholder={t('stepForm.channel.source.placeholder')}
                    />
                  </Form.Item>
                  <Form.Item
                    label={t('stepForm.channel.media')}
                    required
                    field="advertisingMedia"
                    rules={[
                      {
                        required: true,
                        message: t('stepForm.channel.media.required')
                      }
                    ]}
                  >
                    <Input
                      v-model={formData.value.advertisingMedia}
                      placeholder={t('stepForm.channel.media.placeholder')}
                    />
                  </Form.Item>
                  <Form.Item
                    field="keyword"
                    label={t('stepForm.channel.keywords')}
                    required
                    rules={[{ required: true }]}
                  >
                    <InputTag v-model={formData.value.keyword} />
                  </Form.Item>
                  <Form.Item
                    label={t('stepForm.channel.remind')}
                    required
                    field="pushNotify"
                    rules={[{ required: true }]}
                  >
                    <Switch v-model={formData.value.pushNotify} />
                  </Form.Item>

                  <Form.Item
                    label={t('stepForm.channel.content')}
                    required
                    field="advertisingContent"
                    rules={[
                      {
                        required: true,
                        message: t('stepForm.channel.content.required')
                      },
                      {
                        maxLength: 200,
                        message: t('stepForm.form.error.advertisingContent.maxLength')
                      }
                    ]}
                  >
                    <Textarea
                      v-model={formData.value.advertisingContent}
                      placeholder={t('stepForm.channel.content.placeholder')}
                    />
                  </Form.Item>
                </Form.Item>
              )}
              {current.value !== 3 ? (
                <Form.Item label=" ">
                  <Space>
                    {current.value === 2 && (
                      <Button size="large" onClick={handlePrev}>
                        {t('stepForm.prev')}
                      </Button>
                    )}
                    {current.value !== 3 && (
                      <Button
                        loading={loading.value}
                        onClick={handleNext}
                        type="primary"
                        size="large"
                      >
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
                        <Space size="medium">
                          <Button key="reset" class="mr-4" onClick={viewForm}>
                            {t('stepForm.created.success.view')}
                          </Button>
                          <Button key="again" type="primary" onClick={recreateForm}>
                            {t('stepForm.created.success.again')}
                          </Button>
                        </Space>
                      )
                    }}
                  </Result>
                </Form.Item>
              )}
            </Form>
            {current.value === 3 && (
              <div
                class={['w-[895px]', 'text-left', 'bg-[color:var(--color-fill-2)]', 'p-5', 'mt-14']}
              >
                <Typography.Title heading={6}>{t('stepForm.created.extra.title')}</Typography.Title>
                <Typography.Paragraph>
                  {t('stepForm.created.extra.desc')}
                  <Button type="text">{t('stepForm.created.extra.detail')}</Button>
                </Typography.Paragraph>
              </div>
            )}
          </div>
        </Card>
      </div>
    )
  }
})
