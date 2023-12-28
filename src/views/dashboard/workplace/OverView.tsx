import { useUserStore } from '@/store'
import { Avatar, Card, Divider, Grid, Space, Statistic, Typography } from '@arco-design/web-vue'
import { IconCaretUp } from '@arco-design/web-vue/es/icon'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ContentChart from './ContentChart'

export default defineComponent({
  name: 'OverView',
  setup() {
    const userStore = useUserStore()
    const { t } = useI18n()

    const dataList = [
      {
        imgSrc:
          '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/c8b36e26d2b9bb5dbf9b74dd6d7345af.svg~tplv-49unhts6dw-image.image',
        value: 2.8,
        precision: 1,
        valueFrom: 0,
        getTitle: () => t('workplace.newFromYesterday'),
        getSuffix: () => (
          <>
            % <IconCaretUp class="text-[green]"></IconCaretUp>
          </>
        )
      },
      {
        imgSrc:
          '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image',
        value: 373.5,
        precision: 1,
        valueFrom: 0,
        getTitle: () => t('workplace.onlineContent'),
        getSuffix: () => (
          <>
            W+ <span class="text-[rgb(var(--gray-8))]">{t('workplace.pecs')}</span>
          </>
        )
      },
      {
        imgSrc:
          '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image',
        value: 368,
        precision: 1,
        valueFrom: 0,
        getTitle: () => t('workplace.putIn'),
        getSuffix: () => (
          <>
            W+ <span class="text-[rgb(var(--gray-8))]">{t('workplace.pecs')}</span>
          </>
        )
      },
      {
        imgSrc:
          '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image',
        value: 8874,
        precision: 1,
        valueFrom: 0,
        getTitle: () => t('workplace.newDay'),
        getSuffix: () => (
          <>
            W+ <span class="text-[rgb(var(--gray-8))]">{t('workplace.pecs')}</span>
          </>
        )
      }
    ]
    return () => (
      <Card bordered={false} class="rounded">
        <Typography.Title class="!mt-0" heading={5}>
          {t('workplace.welcome')}
          &nbsp;
          {userStore.name}
        </Typography.Title>
        <Divider margin={20} />
        <Grid rowGap={16}>
          {dataList.map((item) => (
            <Grid.Item span={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }}>
              <div class="pl-11">
                <Space align="center">
                  <Avatar size={54}>
                    <img src={item.imgSrc} alt="alt" />
                  </Avatar>
                  <div class="flex flex-col">
                    <span class="text-xs">{item.getTitle()}</span>
                    <Statistic
                      valueStyle={{
                        fontWeight: 600
                      }}
                      value={item.value}
                      valueFrom={item.valueFrom}
                      animation
                      show-group-separator
                      v-slots={{
                        suffix: () => item.getSuffix()
                      }}
                    ></Statistic>
                  </div>
                </Space>
              </div>
            </Grid.Item>
          ))}
        </Grid>
        <ContentChart />
      </Card>
    )
  }
})
