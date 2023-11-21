import { Card, Table, Link, Typography, RadioGroup } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()

    const columns = [
      {
        title: t('workplace.column.rank'),
        dataIndex: 'rank',
        width: 65
      },
      {
        title: t('workplace.column.title'),
        dataIndex: 'title',
        render: (x: any) => <Typography.Paragraph style={{ margin: 0 }}>{x}</Typography.Paragraph>
      },
      {
        title: t('workplace.column.pv'),
        dataIndex: 'pv',
        width: 100,
        render: (text: any) => {
          return `${text / 1000}k`
        }
      }
    ]
    return () => (
      <Card>
        {{
          extra: () => <Link>{t('workplace.viewMore')}</Link>,
          default: () => (
            <>
              <RadioGroup
                type="button"
                options={[
                  { label: t('workplace.text'), value: 0 },
                  { label: t('workplace.image'), value: 1 },
                  { label: t('workplace.video'), value: 2 }
                ]}
              ></RadioGroup>
              <Table columns={columns}></Table>
            </>
          )
        }}
      </Card>
    )
  }
})
