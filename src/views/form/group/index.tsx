import { submitGroupForm, type GroupFormModel } from '@/api/form'
import useLoading from '@/hooks/loading'
import { ViewNames } from '@/types/constants'
import {
  Button,
  Card,
  Form,
  Grid,
  Input,
  InputNumber,
  Message,
  Select,
  Space,
  Textarea,
  type FormInstance
} from '@arco-design/web-vue'
import { isEmpty } from 'lodash'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: ViewNames.group,
  setup() {
    const { t } = useI18n()
    const { loading, setLoading } = useLoading()

    const formRef = ref<FormInstance>()
    const formData = ref({
      video: {
        mode: undefined,
        acquisition: {
          resolution: undefined,
          frameRate: undefined
        },
        encoding: {
          resolution: undefined,
          rate: {
            min: undefined,
            max: undefined,
            default: undefined
          },
          frameRate: undefined,
          profile: undefined
        }
      },
      audio: {
        mode: undefined,
        acquisition: {
          channels: undefined
        },
        explanation: undefined,
        encoding: {
          channels: undefined,
          rate: undefined,
          profile: undefined
        }
      }
    })
    const handleSubmit = async () => {
      formRef.value?.validate().then(async (errors) => {
        if (isEmpty(errors)) {
          try {
            setLoading(true)
            await submitGroupForm(formData.value as unknown as GroupFormModel)
            Message.success('提交成功')
          } catch (e) {
            /* empty */
          } finally {
            setLoading(false)
          }
        }
      })
    }
    const handleReset = () => {
      formRef.value?.resetFields()
    }

    return () => (
      <div>
        <Form layout="vertical" model={formData.value} ref={formRef}>
          <Space size="medium" direction="vertical">
            <Card class="general-card" title={t('groupForm.title.video')}>
              <Grid.Row gutter={80}>
                <Grid.Col span={8}>
                  <Form.Item label={t('groupForm.form.label.video.mode')} field="video.mode">
                    <Select
                      v-model={formData.value.video.mode}
                      placeholder={t('groupForm.placeholder.video.mode')}
                    >
                      <Select.Option value="custom">自定义</Select.Option>
                      <Select.Option value="mode1">模式1</Select.Option>
                      <Select.Option value="mode2">模式2</Select.Option>
                    </Select>
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.video.acquisition.resolution')}
                    field="video.acquisition.resolution"
                  >
                    <Select
                      v-model={formData.value.video.acquisition.resolution}
                      placeholder={t('groupForm.placeholder.video.acquisition.resolution')}
                    >
                      <Select.Option value="resolution1">分辨率1</Select.Option>
                      <Select.Option value="resolution2">分辨率2</Select.Option>
                      <Select.Option value="resolution3">分辨率3</Select.Option>
                    </Select>
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.video.acquisition.frameRate')}
                    field="video.acquisition.frameRate"
                  >
                    <InputNumber
                      hideButton
                      v-model={formData.value.video.acquisition.frameRate}
                      placeholder={t('groupForm.placeholder.video.acquisition.frameRate')}
                      v-slots={{
                        append: () => 'fps'
                      }}
                    />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
              <Grid.Row gutter={80}>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.video.encoding.resolution')}
                    field="video.encoding.resolution"
                  >
                    <Select
                      v-model={formData.value.video.encoding.resolution}
                      placeholder={t('groupForm.placeholder.video.encoding.resolution')}
                    >
                      <Select.Option value="resolution1">分辨率1</Select.Option>
                      <Select.Option value="resolution2">分辨率2</Select.Option>
                      <Select.Option value="resolution3">分辨率3</Select.Option>
                    </Select>
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.video.encoding.rate.min')}
                    field="video.encoding.rate.min"
                  >
                    <InputNumber
                      hideButton
                      v-model={formData.value.video.encoding.rate.min}
                      placeholder={t('groupForm.placeholder.video.encoding.rate.min')}
                      v-slots={{
                        append: () => 'bps'
                      }}
                    />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.video.encoding.rate.max')}
                    field="video.encoding.rate.max"
                  >
                    <InputNumber
                      hideButton
                      v-model={formData.value.video.encoding.rate.max}
                      placeholder={t('groupForm.placeholder.video.encoding.rate.max')}
                      v-slots={{
                        append: () => 'bps'
                      }}
                    />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
              <Grid.Row gutter={80}>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.video.encoding.rate.default')}
                    field="video.encoding.rate.default"
                  >
                    <InputNumber
                      hideButton
                      v-model={formData.value.video.encoding.rate.default}
                      placeholder={t('groupForm.placeholder.video.encoding.rate.default')}
                      v-slots={{
                        append: () => 'bps'
                      }}
                    />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.video.encoding.frameRate')}
                    field="video.encoding.frameRate"
                  >
                    <InputNumber
                      hideButton
                      v-model={formData.value.video.encoding.frameRate}
                      placeholder={t('groupForm.placeholder.video.encoding.frameRate')}
                      v-slots={{
                        append: () => 'fps'
                      }}
                    />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.video.encoding.profile')}
                    field="video.encoding.profile"
                  >
                    <Input
                      v-model={formData.value.video.encoding.profile}
                      placeholder={t('groupForm.placeholder.video.encoding.profile')}
                      v-slots={{
                        append: () => 'bps'
                      }}
                    />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
            </Card>
            <Card class="general-card" title={t('groupForm.title.audio')}>
              <Grid.Row gutter={80}>
                <Grid.Col span={8}>
                  <Form.Item label={t('groupForm.form.label.audio.mode')} field="audio.mode">
                    <Select
                      v-model={formData.value.audio.mode}
                      placeholder={t('groupForm.placeholder.audio.mode')}
                    >
                      <Select.Option value="custom">自定义</Select.Option>
                      <Select.Option value="mode1">模式1</Select.Option>
                      <Select.Option value="mode2">模式2</Select.Option>
                    </Select>
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.audio.acquisition.channels')}
                    field="audio.acquisition.channels"
                  >
                    <Select
                      v-model={formData.value.audio.acquisition.channels}
                      placeholder={t('groupForm.placeholder.audio.acquisition.channels')}
                    >
                      <Select.Option value={1}>1</Select.Option>
                      <Select.Option value={2}>2</Select.Option>
                      <Select.Option value={3}>3</Select.Option>
                    </Select>
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.audio.encoding.channels')}
                    field="audio.encoding.channels"
                  >
                    <InputNumber
                      hideButton
                      v-model={formData.value.audio.encoding.channels}
                      placeholder={t('groupForm.placeholder.audio.encoding.channels')}
                      v-slots={{
                        append: () => 'bps'
                      }}
                    />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
              <Grid.Row gutter={80}>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.audio.encoding.rate')}
                    field="audio.encoding.rate"
                  >
                    <InputNumber
                      hideButton
                      v-model={formData.value.audio.encoding.rate}
                      placeholder={t('groupForm.placeholder.audio.encoding.rate')}
                      v-slots={{
                        append: () => 'bps'
                      }}
                    />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.audio.encoding.profile')}
                    field="audio.encoding.profile"
                  >
                    <Input
                      v-model={formData.value.audio.encoding.profile}
                      placeholder={t('groupForm.placeholder.audio.encoding.profile')}
                      v-slots={{
                        append: () => 'fps'
                      }}
                    />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
            </Card>
            <Card class="general-card" title={t('groupForm.title.explanation')}>
              <Form.Item label={t('groupForm.form.label.explanation')} field="audio.explanation">
                <Textarea
                  v-model={formData.value.audio.explanation}
                  placeholder={t('groupForm.placeholder.explanation')}
                />
              </Form.Item>
            </Card>
          </Space>
        </Form>
        <div
          style={{
            boxShadow: '0 -3px 12px rgba(0,0,0,.1)'
          }}
          class={[
            'fixed',
            'bottom-0',
            'left-0',
            'right-0',
            'text-right',
            'p-5',
            'bg-[color:var(--color-bg-2)]'
          ]}
        >
          <Space>
            <Button onClick={handleReset} size="large">
              {t('groupForm.reset')}
            </Button>
            <Button type="primary" loading={loading.value} onClick={handleSubmit} size="large">
              {t('groupForm.submit')}
            </Button>
          </Space>
        </div>
      </div>
    )
  }
})
