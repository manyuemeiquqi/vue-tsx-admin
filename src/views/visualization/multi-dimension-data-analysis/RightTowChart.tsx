import ChartComponent from '@/components/chart-component'
import useChartOption from '@/hooks/chartOption'
import { Card, Space } from '@arco-design/web-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const { chartOption: radarChartOption } = useChartOption((isDark) => {
      return {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 20
        },
        legend: {
          show: true,
          top: 'center',
          right: '0',
          orient: 'vertical',
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            color: isDark ? '#ffffff' : '#4E5969'
          }
        },
        radar: {
          center: ['40%', '50%'],
          radius: 80,
          indicator: [
            { name: '国际', max: 6500 },
            { name: '财经', max: 22000 },
            { name: '科技', max: 30000 },
            { name: '其他', max: 38000 },
            { name: '体育', max: 52000 },
            { name: '娱乐', max: 25000 }
          ],
          axisName: {
            color: isDark ? '#ffffff' : '#1D2129'
          },
          axisLine: {
            lineStyle: {
              color: isDark ? '#484849' : '#E5E6EB'
            }
          },
          splitLine: {
            lineStyle: {
              color: isDark ? '#484849' : '#E5E6EB'
            }
          },
          splitArea: {
            areaStyle: {
              color: []
            }
          }
        },
        series: [
          {
            type: 'radar',
            areaStyle: {
              opacity: 0.2
            },
            data: [
              {
                value: [4850, 19000, 19000, 29500, 35200, 20000],
                name: '纯文本',
                symbol: 'none',
                itemStyle: {
                  color: isDark ? '#6CAAF5' : '#249EFF'
                }
              },
              {
                value: [2250, 17000, 21000, 23500, 42950, 22000],
                name: '图文类',
                symbol: 'none',
                itemStyle: {
                  color: isDark ? '#A079DC' : '#313CA9'
                }
              },
              {
                value: [5850, 11000, 26000, 27500, 46950, 18000],
                name: '视频类',
                symbol: 'none',
                itemStyle: {
                  color: isDark ? '#3D72F6' : '#21CCFF'
                }
              }
            ]
          }
        ]
      }
    })
    const { chartOption: barChartOption } = useChartOption((isDark) => {
      return {
        grid: {
          left: 44,
          right: 20,
          top: 0,
          bottom: 20
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            formatter(value: number, idx: number) {
              if (idx === 0) return String(value)
              return `${Number(value) / 1000}k`
            }
          },
          splitLine: {
            lineStyle: {
              color: isDark ? '#484849' : '#E5E8EF'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['点赞量', '评论量', '分享量'],
          axisLabel: {
            show: true,
            color: '#4E5969'
          },
          axisTick: {
            show: true,
            length: 2,
            lineStyle: {
              color: '#A9AEB8'
            },
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: isDark ? '#484849' : '#A9AEB8'
            }
          }
        },
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        series: [
          {
            data: [1033, 1244, 1520],
            type: 'bar',
            barWidth: 7,
            itemStyle: {
              color: '#4086FF',
              borderRadius: 4
            }
          }
        ]
      }
    })
    return () => (
      <Space direction="vertical" fill>
        <Card>
          <ChartComponent height="200px" options={barChartOption.value} />
        </Card>
        <Card>
          <ChartComponent height="200px" options={radarChartOption.value} />
        </Card>
      </Space>
    )
  }
})
