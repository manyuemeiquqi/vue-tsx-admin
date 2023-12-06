import { Card, Divider, Grid, Link, Space, Typography } from '@arco-design/web-vue'
import {
  IconFile,
  IconFire,
  IconMobile,
  IconSettings,
  IconStorage
} from '@arco-design/web-vue/es/icon'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const links = [
      { text: 'workplace.contentManagement', icon: <IconFile /> },
      { text: 'workplace.contentStatistical', icon: <IconStorage /> },
      { text: 'workplace.advanced', icon: <IconSettings /> },
      { text: 'workplace.onlinePromotion', icon: <IconMobile /> },
      { text: 'workplace.contentPutIn', icon: <IconFire /> }
    ]
    const quickLinks = [
      {
        text: 'workplace.contentManagement',
        icon: <IconStorage />
      },
      {
        text: 'workplace.contentStatistical',
        icon: <IconFile />
      },
      {
        text: 'workplace.advanced',
        icon: <IconSettings />
      }
    ]
    return () => (
      <Card class="general-card">
        <Card
          class="general-card"
          v-slots={{
            extra() {
              return <Link>{t('workplace.quickOperation.setup')}</Link>
            }
          }}
          title={t('workplace.quick.operation')}
        >
          <Grid.Row>
            {links.map((item) => (
              <Grid.Col span={8}>
                {item.icon}
                <Typography.Paragraph>{t(item.text)}</Typography.Paragraph>
              </Grid.Col>
            ))}
          </Grid.Row>
        </Card>
        <Divider />
        <Card class="general-card" title={t('workplace.recently.visited')}>
          <Grid.Row>
            {quickLinks.map((item) => (
              <Grid.Col span={8}>
                {item.icon}
                <Typography.Paragraph>{t(item.text)}</Typography.Paragraph>
              </Grid.Col>
            ))}
          </Grid.Row>
        </Card>
      </Card>
    )
  }
})
