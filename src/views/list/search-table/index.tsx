import { queryPolicyList, type PolicyParams, type PolicyRecord } from '@/api/list'
import useLoading from '@/hooks/loading'
import { type Pagination } from '@/types/global'
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Dropdown,
  Popover,
  Space,
  Table,
  Tooltip,
  Upload,
  type TableColumnData,
  Badge,
  Link,
  Avatar,
  Typography
} from '@arco-design/web-vue'
import {
  IconDownload,
  IconDragArrow,
  IconLineHeight,
  IconPlus,
  IconRefresh,
  IconSettings
} from '@arco-design/web-vue/es/icon'
import { cloneDeep } from 'lodash'
import Sortable from 'sortablejs'
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import TableSearchForm from './TableSearchForm'
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
    type TableSize = 'medium' | 'mini' | 'small' | 'large'
    const tableSize = ref<TableSize>('medium')
    const densityList = computed(() => [
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
    ])
    const handleSelectDensity = (val: unknown) => {
      tableSize.value = val as TableSize
    }
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
    const handleSearch = () => {}
    const colList = ref([
      {
        getTitle: () => t('searchTable.columns.number'),
        dataIndex: 'number',
        checked: true
      },
      {
        getTitle: () => t('searchTable.columns.name'),
        dataIndex: 'name',
        checked: true
      },
      {
        getTitle: () => t('searchTable.columns.contentType'),
        dataIndex: 'contentType',
        render: ({ record }: { record: PolicyRecord }) => {
          const map: Record<PolicyRecord['contentType'], string> = {
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
        },
        checked: true
      },
      {
        getTitle: () => t('searchTable.columns.filterType'),
        dataIndex: 'filterType',
        render: ({ record }: { record: PolicyRecord }) => (
          <>{t(`searchTable.form.filterType.${record.filterType}`)}</>
        ),
        checked: true
      },
      {
        getTitle: () => t('searchTable.columns.count'),
        dataIndex: 'count',
        checked: true
      },
      {
        getTitle: () => t('searchTable.columns.createdTime'),
        dataIndex: 'createdTime',
        checked: true
      },
      {
        getTitle: () => t('searchTable.columns.status'),
        dataIndex: 'status',
        render: ({ record }: { record: PolicyRecord }) => {
          return (
            <Space>
              <Badge status={record.status === 'offline' ? 'danger' : 'success'}></Badge>
              {t(`searchTable.form.status.${record.status}`)}
            </Space>
          )
        },
        checked: true
      },
      {
        getTitle: () => t('searchTable.columns.operations'),
        dataIndex: 'operations',
        render: () => <Link>{t('searchTable.columns.operations.view')}</Link>,
        checked: true
      }
    ])
    const exchangeArray = <T extends Array<any>>(
      array: T,
      beforeIdx: number,
      newIdx: number,
      isDeep = false
    ): T => {
      const newArray = isDeep ? cloneDeep(array) : array
      if (beforeIdx > -1 && newIdx > -1) {
        // 先替换后面的，然后拿到替换的结果替换前面的
        newArray.splice(beforeIdx, 1, newArray.splice(newIdx, 1, newArray[beforeIdx]).pop())
      }
      return newArray
    }
    const popupVisibleChange = (val: boolean) => {
      if (val) {
        nextTick(() => {
          const el = document.getElementById('tableSetting') as HTMLElement
          new Sortable(el, {
            onEnd(e: any) {
              const { oldIndex, newIndex } = e
              exchangeArray(colList.value, oldIndex, newIndex)
            }
          })
        })
      }
    }
    const tableColumns = computed(() => {
      return colList.value
        .filter((col) => col.checked)
        .map((item) => {
          const ret: TableColumnData = {
            title: item.getTitle(),
            dataIndex: item.dataIndex
          }
          if (item.render) ret.render = item.render as unknown as TableColumnData['render']
          return ret
        })
    })
    return () => (
      <Card class="general-card " title={t('menu.list.searchTable')}>
        <TableSearchForm />
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
            <Upload action="/" showFileList={false}>
              {{
                'upload-button': () => <Button>{t('searchTable.operation.import')}</Button>
              }}
            </Upload>
          </Space>
          <Space size="medium">
            <Button
              v-slots={{
                icon: () => <IconDownload />
              }}
            >
              {t('searchTable.operation.download')}
            </Button>
            <Tooltip content={t('searchTable.actions.refresh')}>
              <IconRefresh class="cursor-pointer" onClick={handleSearch} size="18" />
            </Tooltip>
            <Dropdown onSelect={handleSelectDensity}>
              {{
                default: () => (
                  <Tooltip content={t('searchTable.actions.density')}>
                    <IconLineHeight class="cursor-pointer" size="18" />
                  </Tooltip>
                ),
                content: () =>
                  densityList.value.map((item) => (
                    <Dropdown.Option value={item.value}>
                      <span>{item.name}</span>
                    </Dropdown.Option>
                  ))
              }}
            </Dropdown>
            <Tooltip content={t('searchTable.actions.columnSetting')}>
              <Popover trigger="click" position="left" onPopupVisibleChange={popupVisibleChange}>
                {{
                  content: () => (
                    <div id="tableSetting">
                      {colList.value.map((item) => (
                        <div class="w-32">
                          <Space>
                            <IconDragArrow class="cursor-move" />
                            <Checkbox v-model={item.checked} />
                            <div
                              class="text-ellipsis whitespace-nowrap  overflow-hidden w-20"
                              title={item.getTitle()}
                            >
                              {item.getTitle()}
                            </div>
                          </Space>
                        </div>
                      ))}
                    </div>
                  ),
                  default: () => <IconSettings size="18" class="cursor-pointer" />
                }}
              </Popover>
            </Tooltip>
          </Space>
        </div>
        <Table
          loading={loading.value}
          data={renderData.value}
          bordered={false}
          size={tableSize.value}
          columns={tableColumns.value}
        ></Table>
      </Card>
    )
  }
})
