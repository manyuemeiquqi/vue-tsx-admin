import { useUserStore } from '@/store'
import {
  RadioGroup,
  Table,
  Space,
  Tabs,
  Card,
  Avatar,
  Typography,
  Radio,
  Button,
  Link,
  Tag,
  Grid
} from '@arco-design/web-vue'
import { IconMore } from '@arco-design/web-vue/es/icon'
import { computed, defineComponent, h, compile } from 'vue'
import { useI18n } from 'vue-i18n'
import type { TableColumnData, TableData } from '@arco-design/web-vue/es/table/interface.d'
export default defineComponent({
  setup() {
    const userInfo = useUserStore()
    const { t } = useI18n()

    const columns = computed(() => {
      return [
        {
          title: t('monitor.list.title.order'),
          render({ rowIndex }: { record: TableData; column: TableColumnData; rowIndex: number }) {
            return <span>{rowIndex + 1}</span>
          }
        },
        {
          title: t('monitor.list.title.cover'),
          render({ record }: { record: TableData; column: TableColumnData; rowIndex: number }) {
            return (
              <div class="  h-16  relative">
                <img class="h-full" src={record.cover} />
                {record.status === -1 && (
                  <Tag color="red" class="absolute top-1 left-1">
                    {t('monitor.list.tag.auditFailed')}
                  </Tag>
                )}
              </div>
            )
          }
        },
        {
          title: t('monitor.list.title.name'),
          dataIndex: 'name'
        },
        {
          dataIndex: 'duration',
          title: t('monitor.list.title.duration')
        },
        {
          dataIndex: 'id',
          title: t('monitor.list.title.id')
        }
      ]
    })
    interface PreviewRecord {
      cover: string
      name: string
      duration: string
      id: string
      status: number
    }
    const data: PreviewRecord[] = [
      {
        cover:
          'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp',
        name: '视频直播',
        duration: '00:05:19',
        id: '54e23ade',
        status: -1
      }
    ]
    return () => (
      <Space direction="vertical" size="medium" fill>
        <Card class="general-card" title={t('monitor.title.studioPreview')}>
          {{
            default: () => (
              <div>
                <img
                  class=" w-full max-w-xl  block  my-0 mx-auto mb-4  "
                  src="http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp"
                />
                <Grid.Row align="center" justify="space-between">
                  <Space size="small">
                    <Avatar size={24}>
                      <img src={userInfo.avatar} alt="alt" />
                    </Avatar>
                    <Typography.Text>
                      {userInfo.name}
                      {t('monitor.studioPreview.studio')}
                    </Typography.Text>
                  </Space>
                  <Typography.Text class="text-[var(--color-text-3)]">
                    36,000 {t('monitor.studioPreview.watching')}
                  </Typography.Text>
                </Grid.Row>
              </div>
            ),
            extra: () => <IconMore />
          }}
        </Card>
        <Card class="general-card">
          <Tabs defaultActiveKey="liveMethod">
            <Tabs.TabPane key="liveMethod" title={t('monitor.tab.title.liveMethod')}></Tabs.TabPane>
            <Tabs.TabPane
              key="onlinePopulation"
              title={t('monitor.tab.title.onlinePopulation')}
            ></Tabs.TabPane>
          </Tabs>
          <Space size="medium" direction="vertical" fill class="mb-4">
            <RadioGroup defaultValue="1" type="button">
              <Radio value="1">{t('monitor.liveMethod.normal')}</Radio>
              <Radio value="2">{t('monitor.liveMethod.flowControl')}</Radio>
              <Radio value="3">{t('monitor.liveMethod.video')}</Radio>
              <Radio value="4">{t('monitor.liveMethod.web')}</Radio>
            </RadioGroup>
            <Grid.Row justify="space-between" align="center">
              <Link>{t('monitor.editCarousel')}</Link>
              <Button disabled>{t('monitor.startCarousel')}</Button>
            </Grid.Row>
          </Space>
          <Table
            class="mb-4"
            columns={columns.value}
            pagination={false}
            data={data}
            bordered={false}
          ></Table>

          <Typography.Text class=" text-center block">
            {t('monitor.list.tip.rotations')} {data.length}
            {t('monitor.list.tip.rest')}
          </Typography.Text>
        </Card>
      </Space>
    )
  }
})
