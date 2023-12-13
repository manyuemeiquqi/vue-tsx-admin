import { Card, Divider, Typography, Link, Grid, Statistic } from '@arco-design/web-vue'
import { computed, defineComponent, ref, h } from 'vue'

import { graphic } from 'echarts'
import useChartOption from '@/hooks/chartOption'
import Chart from '@/components/chart-component/index'
import { type AnyObject } from '@/types/global'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import { IconEdit, IconHeart, IconThumbUp, IconUser } from '@arco-design/web-vue/es/icon'
import { queryDataOverview } from '@/api/visualization'
export default defineComponent({
  setup() {
    function graphicFactory(side: AnyObject) {
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
    const tooltipItemsHtmlString = (items: any[]) => {
      return items
        .map(
          (el) => `<div class="content-panel">
          <p>
            <span style="background-color: ${el.color}" class="tooltip-item-icon"></span><span>${
              el.seriesName
            }</span>
          </p>
          <span class="tooltip-value">${el.value.toLocaleString()}</span>
        </div>`
        )
        .reverse()
        .join('')
    }
    const generateSeries = (
      name: string,
      lineColor: string,
      itemBorderColor: string,
      data: number[]
    ): any => {
      return {
        name,
        data,
        stack: 'Total',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: lineColor
        },
        emphasis: {
          focus: 'series',
          itemStyle: {
            color: lineColor,
            borderWidth: 2,
            borderColor: itemBorderColor
          }
        },
        lineStyle: {
          width: 2,
          color: lineColor
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.1,
          color: lineColor
        }
      }
    }
    const chartsData = ref<number[]>([])
    const { chartOption } = useChartOption(() => {
      return {
        grid: {
          left: '2.6%',
          right: '4',
          top: '40',
          bottom: '40'
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
            show: false
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
            formatter(value: number, idx: number) {
              if (idx === 0) return String(value)
              return `${value / 1000}k`
            }
          },
          splitLine: {
            lineStyle: {
              // color: dark ? '#2E2E30' : '#F2F3F5'
              color: '#F2F3F5'
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            // const [firstElement] = params as ToolTipFormatterParams[]
            const [firstElement] = params as any[]
            return `<div>
              <p class="tooltip-title">${firstElement.axisValueLabel}</p>
              ${tooltipItemsHtmlString(params as any[])}
            </div>`
          },
          className: 'echarts-tooltip-diy'
        },
        graphic: {
          elements: [
            {
              type: 'text',
              left: '2.6%',
              bottom: '18',
              style: {
                text: '12.10',
                textAlign: 'center',
                fill: '#4E5969',
                fontSize: 12
              }
            },
            {
              type: 'text',
              right: '0',
              bottom: '18',
              style: {
                text: '12.17',
                textAlign: 'center',
                fill: '#4E5969',
                fontSize: 12
              }
            }
          ]
        },
        series: [
          generateSeries('内容生产量', '#722ED1', '#F5E8FF', contentProductionData.value),
          generateSeries('内容点击量', '#F77234', '#FFE4BA', contentClickData.value),
          generateSeries('内容曝光量', '#33D1C9', '#E8FFFB', contentExposureData.value),
          generateSeries('活跃用户数', '#3469FF', '#E8F3FF', activeUsersData.value)
        ]
      }
    })

    const graphicElements = ref([graphicFactory({ left: '2.6%' }), graphicFactory({ right: 0 })])

    const contentProductionData = ref<number[]>([])

    const contentClickData = ref<number[]>([])
    const contentExposureData = ref<number[]>([])
    const activeUsersData = ref<number[]>([])
    const fetchData = async () => {
      try {
        const data = (await queryDataOverview()).data
        xAxis.value = data.xAxis
        data.data.forEach((el: any) => {
          if (el.name === '内容生产量') {
            contentProductionData.value = el.value
          } else if (el.name === '内容点击量') {
            contentClickData.value = el.value
          } else if (el.name === '内容曝光量') {
            contentExposureData.value = el.value
          }
          activeUsersData.value = el.value
        })
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        console.log()
      }
    }

    const isDark = ref(false) //TODO 需要从themes 里面获取，暂时这么写
    const statisticDataList = computed(() => [
      {
        title: t('multiDAnalysis.dataOverview.contentProduction'),
        value: 1902,
        prefix: {
          icon: <IconEdit />,
          background: isDark.value ? '#593E2F' : '#FFE4BA',
          iconColor: isDark.value ? '#F29A43' : '#F77234'
        }
      },
      {
        title: t('multiDAnalysis.dataOverview.contentClick'),
        value: 2445,
        prefix: {
          icon: <IconThumbUp />,
          background: isDark.value ? '#3D5A62' : '#E8FFFB',
          iconColor: isDark.value ? '#6ED1CE' : '#33D1C9'
        }
      },
      {
        title: t('multiDAnalysis.dataOverview.contentExposure'),
        value: 3034,
        prefix: {
          icon: <IconHeart />,
          background: isDark.value ? '#354276' : '#E8F3FF',
          iconColor: isDark.value ? '#4A7FF7' : '#165DFF'
        }
      },
      {
        title: t('multiDAnalysis.dataOverview.activeUsers'),
        value: 1293,
        prefix: {
          icon: <IconUser />,
          background: isDark.value ? '#3F385E' : '#F5E8FF',
          iconColor: isDark.value ? '#8558D3' : '#722ED1'
        }
      }
    ])
    fetchData()
    const { t } = useI18n()
    return () => (
      <Card class="general-card " title={t('multiDAnalysis.card.title.dataOverview')}>
        <Grid.Row>
          {statisticDataList.value.map((item) => (
            <Grid.Col span={6}>
              <Statistic
                title={item.title}
                animation
                showGroupSeparator
                valueFrom={0}
                value={item.value}
              >
                {{
                  prefix: () => <>{item.prefix.icon}</>
                }}
              </Statistic>
            </Grid.Col>
          ))}
        </Grid.Row>

        <div>
          <Chart height="289px" options={chartOption.value}></Chart>
        </div>
      </Card>
    )
  }
})
