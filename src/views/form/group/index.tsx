import type { GroupFormModel } from '@/api/form'
import useLoading from '@/hooks/loading'
import {
  Button,
  Card,
  Form,
  Grid,
  Input,
  Select,
  Space,
  Textarea,
  type FormInstance
} from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  name: 'Group',
  setup() {
    const { t } = useI18n()
    const { loading, setLoading } = useLoading()

    const formRef = ref<FormInstance>()
    const formData = ref<GroupFormModel>({
      video: {
        mode: '',
        acquisition: {
          resolution: '',
          frameRate: 0
        },
        encoding: {
          resolution: '',
          rate: {
            min: 0,
            max: 0,
            default: 0
          },
          frameRate: 0,
          profile: ''
        }
      },
      audio: {
        mode: '',
        acquisition: {
          channels: 0
        },
        explanation: '',
        encoding: {
          channels: 0,
          rate: 0,
          profile: ''
        }
      }
    })
    const handleSubmit = async () => {
      const res = await formRef.value?.validate()
      if (!res) {
        setLoading(true)
      }
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    const handleReset = () => {
      formRef.value?.resetFields()
    }

    return () => (
      <div>
        <Form layout="vertical" model={formData} ref={formRef}>
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
                    <Input
                      v-model={formData.value.video.acquisition.frameRate}
                      placeholder={t('groupForm.placeholder.video.acquisition.frameRate')}
                      v-slots={{
                        prepend: () => 'fps'
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
                    <Input
                      v-model={formData.value.video.encoding.rate.min}
                      placeholder={t('groupForm.placeholder.video.encoding.rate.min')}
                      v-slots={{
                        prepend: () => 'fps'
                      }}
                    />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.video.encoding.rate.max')}
                    field="video.encoding.rate.max"
                  >
                    <Input
                      v-model={formData.value.video.encoding.rate.max}
                      placeholder={t('groupForm.placeholder.video.encoding.rate.max')}
                      v-slots={{
                        prepend: () => 'fps'
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
                    <Input
                      v-model={formData.value.video.encoding.rate.default}
                      placeholder={t('groupForm.placeholder.video.encoding.rate.default')}
                      v-slots={{
                        prepend: () => 'fps'
                      }}
                    />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.video.encoding.frameRate')}
                    field="video.encoding.frameRate"
                  >
                    <Input
                      v-model={formData.value.video.encoding.frameRate}
                      placeholder={t('groupForm.placeholder.video.encoding.frameRate')}
                      v-slots={{
                        prepend: () => 'fps'
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
                        prepend: () => 'fps'
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
                      <Select.Option value="1">1</Select.Option>
                      <Select.Option value="2">2</Select.Option>
                      <Select.Option value="3">3</Select.Option>
                    </Select>
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.audio.encoding.rate')}
                    field="audio.encoding.rate"
                  >
                    <Input
                      v-model={formData.value.audio.encoding.rate}
                      placeholder={t('groupForm.placeholder.audio.encoding.rate')}
                      v-slots={{
                        prepend: () => 'fps'
                      }}
                    />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
              <Grid.Row gutter={80}>
                <Grid.Col span={8}>
                  <Form.Item
                    label={t('groupForm.form.label.audio.encoding.profile')}
                    field="audio.encoding.profile"
                  >
                    <Input
                      v-model={formData.value.audio.encoding.profile}
                      placeholder={t('groupForm.placeholder.audio.encoding.profile')}
                      v-slots={{
                        prepend: () => 'fps'
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
            'bg-[color:var(--color-bg-2)'
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
