import { Card, Typography, Link, Grid, Button } from '@arco-design/web-vue'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const linkList = computed(() => [
      {
        href: 'https://arco.design/react/docs/start',
        desc: t('workplace.docs.productOverview')
      },
      {
        href: 'https://arco.design/vue/docs/start',
        desc: t('workplace.docs.userGuide')
      },
      {
        href: 'https://arco.design/themes',
        desc: t('workplace.docs.workflow')
      },
      {
        href: 'https://arco.design/material/',
        desc: t('workplace.docs.interfaceDocs')
      }
    ])
    const { t } = useI18n()
    return () => (
      <Card
        class="general-card"
        title={t('workplace.docs')}
        v-slots={{
          extra: () => <Link>{t('workplace.viewMore')}</Link>
        }}
      >
        <Grid.Row>
          {linkList.value.map(({ href, desc }) => (
            <Grid.Col span={12}>
              <Link
                style={{
                  color: 'rgb(var(--gray-8))',
                  marginBottom: '8px'
                }}
              >
                {desc}
              </Link>
            </Grid.Col>
          ))}
        </Grid.Row>
      </Card>
    )
  }
})
