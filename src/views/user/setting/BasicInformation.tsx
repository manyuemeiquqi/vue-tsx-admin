import {
  Form,
  Space,
  Button,
  type FormInstance,
  Message,
  Input,
  Cascader,
  Select,
  Textarea
} from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const formData = {}
    const formRef = ref<FormInstance>()
    const handleReset = () => {
      formRef.value?.resetFields()
    }

    const handleSave = async () => {
      try {
        await formRef.value?.validate()
        Message.success('userSetting.saveSuccess')
      } catch (e) {
        console.log('e: ', e)
      }
    }
    return () => (
      <Form ref={formRef} model={formData}>
        <Form.Item
          label={t('userSetting.basicInfo.form.label.email')}
          field="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: t('userSetting.form.error.email.required')
            }
          ]}
        >
          {<Input placeholder={t('userSetting.basicInfo.placeholder.email')} />}
        </Form.Item>
        <Form.Item
          label={t('userSetting.basicInfo.form.label.nickname')}
          field="nickName"
          rules={[
            {
              required: true,
              message: t('userSetting.form.error.nickname.required')
            }
          ]}
        >
          {<Input placeholder={t('userSetting.basicInfo.placeholder.nickname')} />}
        </Form.Item>
        <Form.Item
          label={t('userSetting.basicInfo.form.label.countryRegion')}
          field="countryRegion"
          rules={[
            {
              required: true,
              message: t('userSetting.form.error.countryRegion.required')
            }
          ]}
        >
          {
            <Select
              options={[
                {
                  label: '中国',
                  value: 'china'
                }
              ]}
              placeholder={t('userSetting.basicInfo.placeholder.area')}
            />
          }
        </Form.Item>
        <Form.Item
          label={t('userSetting.basicInfo.form.label.area')}
          field="area"
          rules={[
            {
              required: true,
              message: t('userSetting.form.error.area.required')
            }
          ]}
        >
          {
            <Cascader
              placeholder={t('userSetting.basicInfo.placeholder.area')}
              options={[
                {
                  label: '北京市',
                  value: 'BeiJing',
                  children: [
                    {
                      label: '北京市',
                      value: 'BeiJing',
                      children: [
                        { label: '海淀区', value: 'HaiDian' },
                        { label: '朝阳区', value: 'ChaoYang' }
                      ]
                    }
                  ]
                },
                {
                  label: '上海市',
                  value: 'ShangHai',
                  children: [
                    {
                      label: '上海市',
                      value: 'ShangHai',
                      children: [
                        { label: '黄浦区', value: 'HuangPu' },
                        { label: '静安区', value: 'JingAn' }
                      ]
                    }
                  ]
                }
              ]}
            />
          }
        </Form.Item>
        <Form.Item label={t('userSetting.basicInfo.form.label.address')} field="address">
          <Input placeholder={t('userSetting.basicInfo.placeholder.address')} />
          {/* {loading ? loadingNode() : <Input placeholder="请输入您的地址" />} */}
        </Form.Item>
        <Form.Item
          label={t('userSetting.basicInfo.form.label.profile')}
          rules={[
            {
              maxLength: 200,
              message: t('userSetting.form.error.profile.maxLength')
            }
          ]}
          field="profile"
        >
          <Textarea placeholder={t('userSetting.basicInfo.placeholder.profile')} />
        </Form.Item>
        <Form.Item label="">
          <Space>
            <Button type="primary" onClick={handleSave}>
              {t('userSetting.save')}
            </Button>
            <Button type="secondary" onClick={handleReset}>
              {t('userSetting.reset')}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    )
  }
})
