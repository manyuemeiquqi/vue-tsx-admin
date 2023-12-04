import { queryPolicyList, type PolicyParams, type PolicyRecord } from '@/api/list'
import useLoading from '@/hooks/loading'
import {
  Button,
  Card,
  Table,
  Typography,
  Badge,
  Grid,
  Divider,
  Form,
  Space,
  Upload,
  Tooltip,
  Dropdown,
  Popover,
  Checkbox,
  Input,
  Select
} from '@arco-design/web-vue'
import {
  IconDownload,
  IconDragArrow,
  IconLineHeight,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconSettings
} from '@arco-design/web-vue/es/icon'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    function getColumns() {
      return [
        {
          title: t('searchTable.columns.id'),
          dataIndex: 'id',
          render: (value: any) => <Typography>{value}</Typography>
        },
        {
          title: t('searchTable.columns.name'),
          dataIndex: 'name'
        },
        {
          title: t('searchTable.columns.contentType'),
          dataIndex: 'contentType',
          render: (value: any) => <div></div>
        },
        {
          title: t('searchTable.columns.filterType'),
          dataIndex: 'filterType',
          render: () => <div></div>
        },
        {
          title: t('searchTable.columns.contentNum'),
          dataIndex: 'count',
          render() {
            return Number(1).toLocaleString()
          }
        },
        {
          title: t('searchTable.columns.createdTime'),
          dataIndex: 'createdTime',
          render: <div>1212</div>
        },
        {
          title: t('searchTable.columns.status'),
          dataIndex: 'status',
          render: (x: any) => {
            if (x === 0) {
              return <Badge status="danger"></Badge>
            }
            return <Badge status="success"></Badge>
          }
        },
        {
          title: t('searchTable.columns.operations'),
          dataIndex: 'operations',
          headerCellStyle: { paddingLeft: '15px' },
          render: () => (
            <Button type="text" size="small">
              {t('searchTable.columns.operations.view')}
            </Button>
          )
        }
      ]
    }
    const formData = ref({})
    const densityList = [
      {
        name: t('searchTable.size.mini'),
        value: 'mini'
      },
      {
        name: t('searchTable.size.small'),
        value: 'small'
      },
      {
        name: t('searchTable.size.medium'),
        value: 'medium'
      },
      {
        name: t('searchTable.size.large'),
        value: 'large'
      }
    ]
    const showColumns = ref<any[]>([])
    const { loading, setLoading } = useLoading()

    const renderData = ref<PolicyRecord[]>([])
    const fetchData = async (params: PolicyParams = { current: 1, pageSize: 20 }) => {
      setLoading(true)
      try {
        const { data } = await queryPolicyList(params)
        renderData.value = data.list
        // pagination.current = params.current
        // pagination.total = data.total
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => (
      <Card class="general-card " title={t('menu.list.searchTable')}>
        {/* <Grid.Row>
          <Grid.Col flex={1}>
            <Form model={formData}>
              <Form.Item field="number" label={t('searchTable.form.number')}>
                <Input
                  v-model={formData.value.number}
                  placeholder={t('searchTable.form.number.placeholder')}
                />
              </Form.Item>
              <Form.Item field="name" label={t('searchTable.form.name')}>
                <Input
                  v-model={formData.value.name}
                  placeholder={t('searchTable.form.name.placeholder')}
                />
              </Form.Item>
              <Form.Item field="contentType" label={t('searchTable.form.contentType')}>
                <Input
                  v-model={formData.value.contentType}
                  placeholder={t('searchTable.form.selectDefault')}
                />
              </Form.Item>
              <Form.Item field="status" label={t('searchTable.form.status')}>
                <Select
                  v-model={formData.value.status}
                  options={statusOptions}
                  placeholder={t('searchTable.form.selectDefault')}
                />
              </Form.Item>
            </Form>
          </Grid.Col>
          <Divider direction="vertical" />
          <Grid.Col flex={'86px'}>
            <Space direction="vertical">
              <Button
                v-slots={{
                  icon: () => <IconSearch></IconSearch>
                }}
              >
                {t('searchTable.form.search')}
              </Button>
              <Button
                v-slots={{
                  icon: () => <IconRefresh></IconRefresh>
                }}
              >
                {t('searchTable.form.reset')}
              </Button>
            </Space>
          </Grid.Col>
        </Grid.Row> */}
        <Divider />
        <Grid.Row>
          <Grid.Col span={12}>
            <Space>
              <Button
                v-slots={{
                  icon: () => <IconPlus />
                }}
                type="primary"
              >
                {t('searchTable.operation.create')}
              </Button>
              <Upload action="/">
                {{
                  'upload-button': () => <Button>{t('searchTable.operation.import')}</Button>
                }}
              </Upload>
            </Space>
          </Grid.Col>
          <Grid.Col span={12}>
            <Button
              v-slots={{
                icon: () => <IconDownload />
              }}
            >
              {t('searchTable.operation.download')}
            </Button>
            <Tooltip content={t('searchTable.actions.refresh')}>
              {
                <div>
                  <IconRefresh size="18" />
                </div>
              }
            </Tooltip>
            <Dropdown>
              {{
                default: () => (
                  <Tooltip content={t('searchTable.actions.density')}>
                    {
                      <div>
                        <IconLineHeight size="18" />
                      </div>
                    }
                  </Tooltip>
                ),
                content: () =>
                  densityList.map((item) => (
                    <Dropdown.Option value={item.value}>
                      <span>{item.name}</span>
                    </Dropdown.Option>
                  ))
              }}
            </Dropdown>
            <Tooltip>
              <Popover>
                {{
                  content: () =>
                    showColumns.value.map((item) => (
                      <div>
                        <IconDragArrow />
                        <Checkbox />
                        <div></div>
                      </div>
                    )),
                  default: () => (
                    <div>
                      <IconSettings></IconSettings>
                    </div>
                  )
                }}
              </Popover>
            </Tooltip>
          </Grid.Col>
        </Grid.Row>
        <Typography.Title heading={6}>121</Typography.Title>
        {/* <Table
          loading={loading.value}
          data={renderData.value}
          bordered={false}
          columns={getColumns() as any}
        ></Table> */}
      </Card>
    )
  }
})
