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
          label="邮箱"
          field="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: '请输入邮箱'
            }
          ]}
        >
          {<Input placeholder={t('userSetting.info.email.placeholder')} />}
        </Form.Item>
        <Form.Item
          label="昵称"
          field="nickName"
          rules={[
            {
              required: true,
              message: '请输入您的昵称'
            }
          ]}
        >
          {<Input placeholder={t('userSetting.info.nickName.placeholder')} />}
        </Form.Item>
        <Form.Item label={t('userSetting.info.area')} field="rangeArea">
          {<Select options={['中国']} placeholder={t('userSetting.info.area.placeholder')} />}
        </Form.Item>
        <Form.Item
          label={t('userSetting.info.location')}
          field="location"
          rules={[
            {
              required: true
            }
          ]}
        >
          {
            <Cascader
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
        <Form.Item label="具体地址" field="address">
          <Input />
          {/* {loading ? loadingNode() : <Input placeholder="请输入您的地址" />} */}
        </Form.Item>
        <Form.Item label="个人简介" field="profile">
          <Textarea placeholder="请输入您的个人简介，最多不超过200字。" />
        </Form.Item>
        <Form.Item label="">
          <Space>
            <Button type="primary" onClick={handleSave}>
              保存
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    )
  }
})
