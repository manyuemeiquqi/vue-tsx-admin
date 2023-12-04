import useLoading from '@/hooks/loading'
import { Card, Table, Link, Typography, RadioGroup, Space } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TableData } from '@arco-design/web-vue/es/table/interface'
import { queryPopularList } from '@/api/dashboard'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const { loading, setLoading } = useLoading()
    const renderList = ref<TableData[]>()
    const fetchData = async (contentType: string) => {
      try {
        setLoading(true)
        const { data } = await queryPopularList({ type: contentType })
        renderList.value = data
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false)
      }
    }
    const typeChange = (contentType: string) => {
      fetchData(contentType)
    }
    fetchData('text')
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
      <Card title={t('workplace.popularContent')}>
        {{
          extra: () => <Link>{t('workplace.viewMore')}</Link>,
          default: () => (
            <Space size={10} direction="vertical" fill>
              <RadioGroup
                type="button"
                options={[
                  { label: t('workplace.text'), value: 0 },
                  { label: t('workplace.image'), value: 1 },
                  { label: t('workplace.video'), value: 2 }
                ]}
              ></RadioGroup>
              <Table bordered={false} pagination={false} columns={columns}></Table>
            </Space>
          )
        }}
      </Card>
    )
  }
})
