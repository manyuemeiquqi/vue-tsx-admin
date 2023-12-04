import useLoading from '@/hooks/loading'
import { Card, Table, Link, Typography, RadioGroup, Space, Spin } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TableData } from '@arco-design/web-vue/es/table/interface'
import { queryPopularList } from '@/api/dashboard'
import { IconCaretUp } from '@arco-design/web-vue/es/icon'
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
        title: '排名',
        dataIndex: 'key',
        width: 65
      },
      {
        title: '内容标题',
        dataIndex: 'title',
        render: ({ record }: any) => (
          <Typography.Paragraph style={{ margin: 0 }}>{record.title}</Typography.Paragraph>
        )
      },
      {
        title: '点击量',
        dataIndex: 'clickNumber'
      },
      {
        title: '日涨幅',
        dataIndex: 'increases',

        render: ({ record }: any) => {
          return (
            <div>
              <span>{record.increases}%</span>
              {record.increases && <IconCaretUp />}
            </div>
          )
        }
      }
    ]
    return () => (
      <Spin loading={loading.value}>
        <Card class="general-card" title={t('workplace.popularContent')}>
          {{
            extra: () => <Link>{t('workplace.viewMore')}</Link>,
            default: () => (
              <Space size={10} direction="vertical" fill>
                <RadioGroup
                  type="button"
                  options={[
                    { label: t('workplace.popularContent.text'), value: 0 },
                    { label: t('workplace.popularContent.image'), value: 1 },
                    { label: t('workplace.popularContent.video'), value: 2 }
                  ]}
                ></RadioGroup>
                <Table
                  bordered={false}
                  data={renderList.value}
                  pagination={false}
                  columns={columns}
                ></Table>
              </Space>
            )
          }}
        </Card>
      </Spin>
    )
  }
})
