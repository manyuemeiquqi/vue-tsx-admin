import { Card, Link, Table } from '@arco-design/web-vue'
import axios from 'axios'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const columns = [
      {
        title: t('dataAnalysis.popularAuthor.column.ranking'),
        dataIndex: 'ranking'
      },
      {
        title: t('dataAnalysis.popularAuthor.column.author'),
        dataIndex: 'author'
      },
      {
        title: t('dataAnalysis.popularAuthor.column.content'),
        dataIndex: 'contentCount'
      },
      {
        title: t('dataAnalysis.popularAuthor.column.click'),
        dataIndex: 'clickCount'
      }
    ]

    const tableData = ref<any>({ list: [] })
    const fetchData = async () => {
      try {
        // setLoading(true)
        const { data } = await axios.get<any>('/api/popular-author/list')
        console.log('data: ', data)
        tableData.value.list = data.list
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        // setLoading(false)
      }
    }
    fetchData()
    return () => (
      <Card
        class="general-card"
        title={t('dataAnalysis.popularAuthor')}
        v-slots={{
          extra: () => <Link>{t('workplace.viewMore')}</Link>
        }}
      >
        <Table
          pagination={false}
          bordered={false}
          columns={columns}
          data={tableData.value.list}
        ></Table>
      </Card>
    )
  }
})
