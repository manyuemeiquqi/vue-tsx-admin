import Mock from 'mockjs'
import dayjs from 'dayjs'

import qs from 'query-string'
import setupMock, { successResponseWrap } from '@/mock/setupMock'
const textList = [
  {
    key: 1,
    clickNumber: '346.3w+',
    title: '经济日报：财政政策要精准提升…',
    increases: 35
  },
  {
    key: 2,
    clickNumber: '324.2w+',
    title: '双12遇冷，消费者厌倦了电商平…',
    increases: 22
  },
  {
    key: 3,
    clickNumber: '318.9w+',
    title: '致敬坚守战“疫”一线的社区工作…',
    increases: 9
  },
  {
    key: 4,
    clickNumber: '257.9w+',
    title: '普高还是职高？家长们陷入选择…',
    increases: 17
  },
  {
    key: 5,
    clickNumber: '124.2w+',
    title: '人民快评：没想到“浓眉大眼”的…',
    increases: 37
  }
]
const imageList = [
  {
    key: 1,
    clickNumber: '15.3w+',
    title: '杨涛接替陆慷出任外交部美大司…',
    increases: 15
  },
  {
    key: 2,
    clickNumber: '12.2w+',
    title: '图集：龙卷风袭击美国多州房屋…',
    increases: 26
  },
  {
    key: 3,
    clickNumber: '18.9w+',
    title: '52岁大姐贴钱照顾自闭症儿童八…',
    increases: 9
  },
  {
    key: 4,
    clickNumber: '7.9w+',
    title: '杭州一家三口公园宿营取暖中毒',
    increases: 0
  },
  {
    key: 5,
    clickNumber: '5.2w+',
    title: '派出所副所长威胁市民？警方调…',
    increases: 4
  }
]
const videoList = [
  {
    key: 1,
    clickNumber: '367.6w+',
    title: '这是今日10点的南京',
    increases: 5
  },
  {
    key: 2,
    clickNumber: '352.2w+',
    title: '立陶宛不断挑衅致经济受损民众…',
    increases: 17
  },
  {
    key: 3,
    clickNumber: '348.9w+',
    title: '韩国艺人刘在石确诊新冠',
    increases: 30
  },
  {
    key: 4,
    clickNumber: '346.3w+',
    title: '关于北京冬奥会，文在寅表态',
    increases: 12
  },
  {
    key: 5,
    clickNumber: '271.2w+',
    title: '95后现役军人荣立一等功',
    increases: 2
  }
]
const haveReadIds: number[] = []
const getMessageList = () => {
  return [
    {
      id: 1,
      type: 'message',
      title: '郑曦月',
      subTitle: '的私信',
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp',
      content: '审批请求已发送，请查收',
      time: '今天 12:30:01'
    },
    {
      id: 2,
      type: 'message',
      title: '宁波',
      subTitle: '的回复',
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
      content: '此处 bug 已经修复',
      time: '今天 12:30:01'
    },
    {
      id: 3,
      type: 'message',
      title: '宁波',
      subTitle: '的回复',
      avatar:
        '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
      content: '此处 bug 已经修复',
      time: '今天 12:20:01'
    },
    {
      id: 4,
      type: 'notice',
      title: '续费通知',
      subTitle: '',
      avatar: '',
      content: '您的产品使用期限即将截止，如需继续使用产品请前往购…',
      time: '今天 12:20:01',
      messageType: 3
    },
    {
      id: 5,
      type: 'notice',
      title: '规则开通成功',
      subTitle: '',
      avatar: '',
      content: '内容屏蔽规则于 2021-12-01 开通成功并生效',
      time: '今天 12:20:01',
      messageType: 1
    },
    {
      id: 6,
      type: 'todo',
      title: '质检队列变更',
      subTitle: '',
      avatar: '',
      content: '内容质检队列于 2021-12-01 19:50:23 进行变更，请重新…',
      time: '今天 12:20:01',
      messageType: 0
    }
  ].map((item) => ({
    ...item,
    status: haveReadIds.indexOf(item.id) === -1 ? 0 : 1
  }))
}
setupMock({
  setup() {
    Mock.mock(new RegExp('/api/data-chain-growth'), (params: any) => {
      const { quota } = JSON.parse(params.body)
      const getLineData = () => {
        return {
          xAxis: new Array(12).fill(0).map((_item, index) => `${index + 1}日`),
          data: {
            name: quota,
            value: new Array(12).fill(0).map(() => Mock.Random.natural(1000, 3000))
          }
        }
      }
      return successResponseWrap({
        count: Mock.Random.natural(1000, 3000),
        growth: Mock.Random.float(20, 100, 2, 2),
        chartData: getLineData()
      })
    })
    // v2
    Mock.mock(new RegExp('/api/data-overview'), () => {
      const generateLineData = (name: string) => {
        return {
          name,
          count: Mock.Random.natural(20, 2000),
          value: new Array(8).fill(0).map(() => Mock.Random.natural(800, 4000))
        }
      }
      const xAxis = new Array(8).fill(0).map((_item, index) => {
        return `12.1${index}`
      })
      return successResponseWrap({
        xAxis,
        data: [
          generateLineData('内容生产量'),
          generateLineData('内容点击量'),
          generateLineData('内容曝光量'),
          generateLineData('活跃用户数')
        ]
      })
    })
    Mock.mock(new RegExp('/api/content-data'), () => {
      const presetData = [58, 81, 53, 90, 64, 88, 49, 79]
      const getLineData = () => {
        const count = 8
        return new Array(count).fill(0).map((el, idx) => ({
          x: dayjs()
            .day(idx - 2)
            .format('YYYY-MM-DD'),
          y: presetData[idx]
        }))
      }
      return successResponseWrap([...getLineData()])
    })
    Mock.mock(new RegExp('/api/popular/list'), (params: any) => {
      const { type = 'text' } = qs.parseUrl(params.url).query
      if (type === 'image') {
        return successResponseWrap([...videoList])
      }
      if (type === 'video') {
        return successResponseWrap([...imageList])
      }
      return successResponseWrap([...textList])
    })
    Mock.mock(new RegExp('/api/message/list'), () => {
      return successResponseWrap(getMessageList())
    })

    Mock.mock(new RegExp('/api/message/read'), (params: { body: string }) => {
      const { ids } = JSON.parse(params.body)
      haveReadIds.push(...(ids || []))
      return successResponseWrap(true)
    })

    Mock.mock(new RegExp('/api/content-period-analysis'), () => {
      const getLineData = (name: string) => {
        return {
          name,
          value: new Array(12).fill(0).map(() => Mock.Random.natural(30, 90))
        }
      }
      return successResponseWrap({
        xAxis: new Array(12).fill(0).map((_item, index) => `${index * 2}:00`),
        data: [getLineData('纯文本'), getLineData('图文类'), getLineData('视频类')]
      })
    })

    Mock.mock(new RegExp('/api/content-publish'), () => {
      const generateLineData = (name: string) => {
        const result = {
          name,
          x: [] as string[],
          y: [] as number[]
        }
        new Array(12).fill(0).forEach((_item, index) => {
          result.x.push(`${index * 2}:00`)
          result.y.push(Mock.Random.natural(1000, 3000))
        })
        return result
      }
      return successResponseWrap([
        generateLineData('纯文本'),
        generateLineData('图文类'),
        generateLineData('视频类')
      ])
    })

    Mock.mock(new RegExp('/api/popular-author/list'), () => {
      const generateData = () => {
        const list = new Array(7).fill(0).map((_item, index) => ({
          ranking: index + 1,
          author: Mock.mock('@ctitle(5)'),
          contentCount: Mock.mock(/[0-9]{4}/),
          clickCount: Mock.mock(/[0-9]{4}/)
        }))
        return {
          list
        }
      }
      return successResponseWrap({
        ...generateData()
      })
    })
  }
})
