import useLoading from '@/hooks/loading'
import { Card, Table, Link, Typography, RadioGroup, Space, Spin } from '@arco-design/web-vue'
import { defineComponent, ref, watch } from 'vue'
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
    const typeValue = ref<string>('text')
    watch(typeValue, () => {
      fetchData(typeValue.value)
    })
    fetchData(typeValue.value)
    const columns = [
      {
        title: '排名',
        dataIndex: 'key',
        width: 65
      },
      {
        title: '内容标题',
        dataIndex: 'title',
        render: ({ record }: any) => <Typography.Text ellipsis>{record.title}</Typography.Text>
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
            <Space size="small">
              <span>{record.increases}%</span>
              {record.increases !== 0 && <IconCaretUp class="  text-xs  text-[red]" />}
            </Space>
          )
        }
      }
    ]

    return () => (
      <Spin loading={loading.value} class="w-full">
        <Card class="general-card" title={t('workplace.popularContent')}>
          {{
            extra: () => <Link>{t('workplace.viewMore')}</Link>,
            default: () => (
              <Space size={10} direction="vertical" fill>
                <RadioGroup
                  type="button"
                  v-model={typeValue.value}
                  options={[
                    { label: t('workplace.popularContent.text'), value: 'text' },
                    { label: t('workplace.popularContent.image'), value: 'image' },
                    { label: t('workplace.popularContent.video'), value: 'video' }
                  ]}
                ></RadioGroup>
                <Table
                  bordered={false}
                  data={renderList.value}
                  tableLayoutFixed
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
