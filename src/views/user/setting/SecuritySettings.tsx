import { useUserStore } from '@/store'
import { Link, List, Space, Typography } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const userInfo = useUserStore()
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
        value: userInfo.phone ? `${t('userSetting.security.phone.tips')} ${userInfo.phone}` : ''
      },
      {
        title: t('userSetting.security.email'),
        value: '',
        placeholder: t('userSetting.security.email.placeholder')
      }
    ]
    return () => (
      <div>
        <List bordered={false}>
          {data.map((item) => (
            <List.Item>
              <List.Item.Meta>
                {{
                  avatar: () => <Typography.Paragraph>{item.title}</Typography.Paragraph>,
                  description: () => (
                    <div class="flex ">
                      <Typography.Paragraph>
                        {item.value ? item.value : item.placeholder}
                      </Typography.Paragraph>
                      {item.value ? (
                        <Link>{t('userSetting.SecuritySettings.button.update')}</Link>
                      ) : (
                        <Link>{t('userSetting.SecuritySettings.button.settings')}</Link>
                      )}
                    </div>
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
