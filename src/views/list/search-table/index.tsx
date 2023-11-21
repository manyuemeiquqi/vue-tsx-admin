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
  Checkbox
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
          render: <div></div>
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
    const formData = {}
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
    return () => (
      <Card>
        <Grid.Row>
          <Grid.Col flex={1}>
            <Form model={formData}></Form>
          </Grid.Col>
          <Divider direction="vertical" />
          <Grid.Col flex={'86px'}>
            <Space>
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
        </Grid.Row>
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
        <Table columns={getColumns() as any}></Table>
      </Card>
    )
  }
})
