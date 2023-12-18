import type { BasicInfoModel } from '@/api/user'
import {
  Button,
  Cascader,
  Form,
  Input,
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
  name: 'BasicInformation',
  setup() {
    const { t } = useI18n()
    const formRef = ref<FormInstance>()
    const formData = ref<BasicInfoModel>({
      email: '',
      nickname: '',
      countryRegion: '',
      area: '',
      address: '',
      profile: ''
    })

    // actions
    const handleReset = () => {
      formRef.value?.resetFields()
    }
    const handleSave = async () => {
      try {
        const validRet = await formRef.value?.validate()
        if (isEmpty(validRet)) Message.success('保存成功')
      } catch (e) {
        /* empty */
      }
    }
    return () => (
      <Form
        class={['w-[500px]', 'mx-auto', 'my-0']}
        ref={formRef}
        model={formData}
        labelColProps={{ span: 8 }}
        wrapperColProps={{ span: 16 }}
      >
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
          {
            <Input
              v-model={formData.value.email}
              placeholder={t('userSetting.basicInfo.placeholder.email')}
            />
          }
        </Form.Item>
        <Form.Item
          label={t('userSetting.basicInfo.form.label.nickname')}
          field="nickname"
          rules={[
            {
              required: true,
              message: t('userSetting.form.error.nickname.required')
            }
          ]}
        >
          {
            <Input
              v-model={formData.value.nickname}
              placeholder={t('userSetting.basicInfo.placeholder.nickname')}
            />
          }
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
              v-model={formData.value.countryRegion}
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
              v-model={formData.value.area}
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
          <Input
            v-model={formData.value.address}
            placeholder={t('userSetting.basicInfo.placeholder.address')}
          />
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
          <Textarea
            v-model={formData.value.profile}
            placeholder={t('userSetting.basicInfo.placeholder.profile')}
          />
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
