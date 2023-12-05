import ChartComponent from '@/components/chart-component'
import useChartOption from '@/hooks/chartOption'
import {
  Card,
  Space,
  Typography,
  Link,
  Divider,
  Grid,
  GridItem,
  Avatar,
  Statistic
} from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'

import { graphic } from 'echarts'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store'
export default defineComponent({
  setup() {
    function graphicFactory(side: any) {
      return {
        type: 'text',
        bottom: '8',
        ...side,
        style: {
          text: '',
          textAlign: 'center',
          fill: '#4E5969',
          fontSize: 12
        }
      }
    }
    const xAxis = ref<string[]>([])
    const chartsData = ref<number[]>([])
    const graphicElements = ref([graphicFactory({ left: '2.6%' }), graphicFactory({ right: 0 })])
    const { chartOption } = useChartOption(() => {
      return {
        grid: {
          left: '2.6%',
          right: 0,
          top: '10',
          bottom: '30'
        },
        xAxis: {
          type: 'category',
          offset: 2,
          data: xAxis.value,
          boundaryGap: false,
          axisLabel: {
            color: '#4E5969',
            formatter(value: number, idx: number) {
              if (idx === 0) return ''
              if (idx === xAxis.value.length - 1) return ''
              return `${value}`
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            interval: (idx: number) => {
              if (idx === 0) return false
              if (idx === xAxis.value.length - 1) return false
              return true
            },
            lineStyle: {
              color: '#E5E8EF'
            }
          },
          axisPointer: {
            show: true,
            lineStyle: {
              color: '#23ADFF',
              width: 2
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisLabel: {
            formatter(value: any, idx: number) {
              if (idx === 0) return value
              return `${value}k`
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#E5E8EF'
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            const [firstElement] = params as any[]
            return `<div>
                <p class="tooltip-title">${firstElement.axisValueLabel}</p>
                <div class="content-panel"><span>总内容量</span><span class="tooltip-value">${(
                  Number(firstElement.value) * 10000
                ).toLocaleString()}</span></div>
              </div>`
          },
          className: 'echarts-tooltip-diy'
        },
        graphic: {
          elements: graphicElements.value
        },
        series: [
          {
            data: chartsData.value,
            type: 'line',
            smooth: true,
            // symbol: 'circle',
            symbolSize: 12,
            emphasis: {
              focus: 'series',
              itemStyle: {
                borderWidth: 2
              }
            },
            lineStyle: {
              width: 3,
              color: new graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: 'rgba(30, 231, 255, 1)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(36, 154, 255, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(111, 66, 251, 1)'
                }
              ])
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(17, 126, 255, 0.16)'
                },
                {
                  offset: 1,
                  color: 'rgba(17, 128, 255, 0)'
                }
              ])
            }
          }
        ]
      }
    })

    const fetchData = async () => {
      //   setLoading(true)
      try {
        const { data: chartData } = await axios.get<any[]>('/api/content-data')

        chartData.forEach((el: any, idx: number) => {
          xAxis.value.push(el.x)
          chartsData.value.push(el.y)
          if (idx === 0) {
            graphicElements.value[0].style.text = el.x
          }
          if (idx === chartData.length - 1) {
            graphicElements.value[1].style.text = el.x
          }
        })
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        // setLoading(false)
      }
    }
    fetchData()
    const userInfo = useUserStore()
    const { t } = useI18n()

    const dataList = [
      {
        imgSrc:
          '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image',
        value: 368,
        precision: 1,
        valueFrom: 0,
        title: t('workplace.onlineContent'),
        suffix: () => (
          <>
            W+ <span class="unit">{t('workplace.pecs')}</span>
          </>
        )
      },
      {
        imgSrc:
          '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image',
        value: 368,
        precision: 1,
        valueFrom: 0,
        title: t('workplace.onlineContent'),
        suffix: () => (
          <>
            W+ <span class="unit">{t('workplace.pecs')}</span>
          </>
        )
      },
      {
        imgSrc:
          '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image',
        value: 368,
        precision: 1,
        valueFrom: 0,
        title: t('workplace.onlineContent'),
        suffix: () => (
          <>
            W+ <span class="unit">{t('workplace.pecs')}</span>
          </>
        )
      },
      {
        imgSrc:
          '//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image',
        value: 368,
        precision: 1,
        valueFrom: 0,
        title: t('workplace.onlineContent'),
        suffix: () => (
          <>
            W+ <span class="unit">{t('workplace.pecs')}</span>
          </>
        )
      }
    ]
    return () => (
      <Card
        class="general-card"
        v-slots={{
          title: () => (
            <Typography.Title heading={5}>
              {t('workplace.welcome')}
              {userInfo.name}
            </Typography.Title>
          )
        }}
      >
        <Divider />
        <Grid colGap={12} rowGap={16}>
          {dataList.map((item) => (
            <Grid.Item span={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 }}>
              <Avatar size={54}>
                <img src={item.imgSrc} alt="alt" />
              </Avatar>
              <Statistic
                value={item.value}
                valueFrom={item.valueFrom}
                animation
                show-group-separator
                title={item.title}
                v-slots={{
                  suffix: () => item.suffix()
                }}
              ></Statistic>
            </Grid.Item>
          ))}
        </Grid>
        <Card>
          <Typography.Paragraph>
            内容数据
            <span>（近一年）</span>
          </Typography.Paragraph>
          <Link>查看更多</Link>

          <ChartComponent height="298px" options={chartOption.value} />
        </Card>
      </Card>
    )
  }
})
