import { Link, List, Typography } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const userInfo: any = {}
    const data = [
      {
        title: t('userSetting.security.password'),
        value: t('userSetting.security.password.tips')
      },
      {
        title: t('userSetting.security.question'),
        value: '',
        placeholder: t('userSetting.security.question.placeholder')
      },
      {
        title: t('userSetting.security.phone'),
        value: userInfo.phoneNumber
          ? `${t('userSetting.security.phone.tips')} ${userInfo.phoneNumber}`
          : ''
      },
      {
        title: t('userSetting.security.email'),
        value: '',
        placeholder: t('userSetting.security.email.placeholder')
      }
    ]
    return () => (
      <div>
        <List>
          {data.map((item) => (
            <List.Item>
              <List.Item.Meta>
                {{
                  avatar: () => <Typography.Paragraph>{item.title}</Typography.Paragraph>,
                  description: () => (
                    <>
                      <Typography.Paragraph>
                        {item.value ? item.value : item.placeholder}
                      </Typography.Paragraph>
                      {item.value ? <Link>12222222</Link> : <Link>2</Link>}
                    </>
                  )
                }}
              </List.Item.Meta>
            </List.Item>
          ))}
        </List>
      </div>
    )
  }
})
