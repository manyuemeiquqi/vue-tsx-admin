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
  Select,
  Link,
  Avatar,
  RangePicker
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
import { computed, defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { type Pagination } from '@/types/global'

import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface'
export default defineComponent({
  setup() {
    const basePagination: Pagination = {
      current: 1,
      pageSize: 20
    }
    const pagination = ref({
      ...basePagination
    })
    const { t } = useI18n()
    function getColumns() {
      return [
        {
          title: t('searchTable.columns.index'),
          dataIndex: 'index',
          render: ({ rowIndex }: any) => (
            <Typography>
              {rowIndex + 1 + (pagination.value.current - 1) * pagination.value.pageSize}
            </Typography>
          )
        },
        {
          title: t('searchTable.columns.number'),
          dataIndex: 'number'
        },
        {
          title: t('searchTable.columns.name'),
          dataIndex: 'name'
        },
        {
          title: t('searchTable.columns.contentType'),
          dataIndex: 'contentType',
          render: ({ record }: any) => {
            const map: Record<string, string> = {
              img: '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image',
              horizontalVideo:
                '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image',
              verticalVideo:
                '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image'
            }
            return (
              <>
                <Space>
                  <Avatar size={16} shape="square">
                    <img alt="avatar" src={map[record.contentType]} />
                  </Avatar>
                  {t(`searchTable.form.contentType.${record.contentType}`)}
                </Space>
              </>
            )
          }
        },
        {
          title: t('searchTable.columns.filterType'),
          dataIndex: 'filterType',
          render: ({ record }: any) => <>{t(`searchTable.form.filterType.${record.filterType}`)}</>
        },
        {
          title: t('searchTable.columns.count'),
          dataIndex: 'count'
        },
        {
          title: t('searchTable.columns.createdTime'),
          dataIndex: 'createdTime'
        },
        {
          title: t('searchTable.columns.status'),
          dataIndex: 'status',
          render: ({ record }: any) => {
            return (
              <Space>
                <Badge status={record.status === 0 ? 'danger' : 'success'}></Badge>
                {t(`searchTable.form.status.${record.status}`)}
              </Space>
            )
          }
        },
        {
          title: t('searchTable.columns.operations'),
          dataIndex: 'operations',
          headerCellStyle: { paddingLeft: '15px' },
          render: () => <Link>{t('searchTable.columns.operations.view')}</Link>
        }
      ]
    }
    const formData = ref<{
      number: string
      name: string
      createdTime: string | number | Date[]
      contentType: string
      filterType: string
      status: string
    }>({
      number: '',
      name: '',
      contentType: '',
      filterType: '',
      createdTime: [],
      status: ''
    })
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
    const contentTypeOptions = computed<SelectOptionData[]>(() => [
      {
        label: t('searchTable.form.contentType.img'),
        value: 'img'
      },
      {
        label: t('searchTable.form.contentType.horizontalVideo'),
        value: 'horizontalVideo'
      },
      {
        label: t('searchTable.form.contentType.verticalVideo'),
        value: 'verticalVideo'
      }
    ])
    const filterTypeOptions = computed<SelectOptionData[]>(() => [
      {
        label: t('searchTable.form.filterType.artificial'),
        value: 'artificial'
      },
      {
        label: t('searchTable.form.filterType.rules'),
        value: 'rules'
      }
    ])
    const statusOptions = computed<SelectOptionData[]>(() => [
      {
        label: t('searchTable.form.status.online'),
        value: 'online'
      },
      {
        label: t('searchTable.form.status.offline'),
        value: 'offline'
      }
    ])
    fetchData()
    return () => (
      <Card class="general-card " title={t('menu.list.searchTable')}>
        <Grid.Row>
          <Grid.Col flex={1}>
            <Form model={formData}>
              <Grid.Row>
                <Grid.Col span={8}>
                  <Form.Item field="number" label={t('searchTable.form.number')}>
                    <Input
                      v-model={formData.value.number}
                      placeholder={t('searchTable.form.number.placeholder')}
                    />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item field="name" label={t('searchTable.form.name')}>
                    <Input
                      v-model={formData.value.name}
                      placeholder={t('searchTable.form.name.placeholder')}
                    />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item field="contentType" label={t('searchTable.form.contentType')}>
                    <Input
                      v-model={formData.value.contentType}
                      placeholder={t('searchTable.form.selectDefault')}
                    />
                  </Form.Item>
                </Grid.Col>

                <Grid.Col span={8}>
                  <Form.Item field="filterType" label={t('searchTable.form.filterType')}>
                    <Select
                      v-model={formData.value.filterType}
                      options={filterTypeOptions.value}
                      placeholder={t('searchTable.form.selectDefault')}
                    />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item field="createdTime" label={t('searchTable.form.createdTime')}>
                    <RangePicker v-model={formData.value.createdTime} />
                  </Form.Item>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Form.Item field="status" label={t('searchTable.form.status')}>
                    <Select
                      v-model={formData.value.status}
                      options={statusOptions.value}
                      placeholder={t('searchTable.form.selectDefault')}
                    />
                  </Form.Item>
                </Grid.Col>
              </Grid.Row>
            </Form>
          </Grid.Col>
          <Divider direction="vertical" class=" h-20" />
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
        </Grid.Row>
        <Divider />
        <div class="flex justify-between mb-4">
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
          <Space>
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
            <Tooltip content={t('searchTable.actions.columnSetting')}>
              <Popover trigger="click" position="bl">
                {{
                  content: () =>
                    showColumns.value.map((item) => (
                      <div>
                        <IconDragArrow />
                        <Checkbox />
                        <div>{item.title}</div>
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
          </Space>
        </div>
        <Table
          loading={loading.value}
          data={renderData.value}
          bordered={false}
          columns={getColumns() as any}
        ></Table>
      </Card>
    )
  }
})
