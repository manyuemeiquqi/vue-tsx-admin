import Mock from 'mockjs'
import { isLogin } from '@/utils/token'
import setupMock, { successResponseWrap, failResponseWrap } from '@/mock/setupMock'
import type { GetParams } from '@/types/global'
import { ResCode } from '@/types/constants'
setupMock({
  setup() {
    // 用户信息
    Mock.mock(new RegExp('/api/user/info'), () => {
      if (isLogin()) {
        const role = window.localStorage.getItem('data-base-role') || 'admin'
        return successResponseWrap({
          name: '蔓越莓曲奇',
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/54520846%20(1).jpg',
          email: '1486498123@email.com',
          job: 'frontend',
          jobName: '前端开发',
          organization: 'Frontend',
          organizationName: '前端',
          location: 'hangzhou',
          locationName: '杭州',
          introduction: '人潇洒，性温存',
          personalWebsite: 'https://www.arco.design',
          phone: '150****0000',
          registrationDate: '2013-05-10 12:10:00',
          accountId: '15012312300',
          certification: 1,
          role
        })
      }
      return failResponseWrap(null, '未登录', ResCode.illegalToken)
    })

    // 登录
    Mock.mock(new RegExp('/api/user/login'), (params: GetParams) => {
      const { username, password } = JSON.parse(params.body)
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', ResCode.error)
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', ResCode.error)
      }
      if (username === 'admin' && password === 'admin') {
        window.localStorage.setItem('data-base-role', 'admin')
        return successResponseWrap({
          token: '12345'
        })
      }
      if (username === 'user' && password === 'user') {
        window.localStorage.setItem('data-base-role', 'user')
        return successResponseWrap({
          token: '54321'
        })
      }
      return failResponseWrap(null, '账号或者密码错误', ResCode.error)
    })

    // 登出
    Mock.mock(new RegExp('/api/user/logout'), () => {
      return successResponseWrap(null)
    })

    // 最新项目
    Mock.mock(new RegExp('/api/user/my-project/list'), () => {
      const contributors = [
        {
          name: '秦臻宇',
          email: 'qingzhenyu@arco.design',
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar3.webp'
        },
        {
          name: '于涛',
          email: 'yuebao@arco.design',
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar3.webp'
        },
        {
          name: '宁波',
          email: 'ningbo@arco.design',
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar2.webp'
        },
        {
          name: '郑曦月',
          email: 'zhengxiyue@arco.design',
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar1.webp'
        },
        {
          name: '宁波',
          email: 'ningbo@arco.design',
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar2.webp'
        }
      ]
      const units = [
        {
          name: '企业级产品设计系统',
          description: 'Arco Design System'
        },
        {
          name: '火山引擎智能应用',
          description: 'The Volcano Engine'
        },
        {
          name: 'OCR文本识别',
          description: 'OCR text recognition'
        },
        {
          name: '内容资源管理',
          description: 'Content resource management '
        },
        {
          name: '今日头条内容管理',
          description: 'Toutiao content management'
        },
        {
          name: '智能机器人',
          description: 'Intelligent Robot Project'
        }
      ]
      return successResponseWrap(
        new Array(6).fill(null).map((_item, index) => ({
          id: index,
          name: units[index].name,
          description: units[index].description,
          peopleNumber: Mock.Random.natural(10, 1000),
          contributors
        }))
      )
    })

    // 最新动态
    Mock.mock(new RegExp('/api/user/latest-activity'), () => {
      return successResponseWrap(
        new Array(7).fill(null).map((_item, index) => ({
          id: index,
          title: '发布了项目 Arco Design System',
          description: '企业级产品设计系统',
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar3.webp'
        }))
      )
    })

    // 访问量
    Mock.mock(new RegExp('/api/user/visits'), () => {
      return successResponseWrap([
        {
          name: '主页访问量',
          visits: 5670,
          growth: 206.32
        },
        {
          name: '项目访问量',
          visits: 5670,
          growth: 206.32
        }
      ])
    })

    // 项目和团队列表
    Mock.mock(new RegExp('/api/user/project-and-team/list'), () => {
      return successResponseWrap([
        {
          id: 1,
          content: '他创建的项目'
        },
        {
          id: 2,
          content: '他参与的项目'
        },
        {
          id: 3,
          content: '他创建的团队'
        },
        {
          id: 4,
          content: '他加入的团队'
        }
      ])
    })

    // 团队列表
    Mock.mock(new RegExp('/api/user/my-team/list'), () => {
      return successResponseWrap([
        {
          id: 1,
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar3.webp',
          name: '火山引擎智能应用团队',
          peopleNumber: Mock.Random.natural(10, 100)
        },
        {
          id: 2,
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar2.webp',
          name: '企业级产品设计团队',
          peopleNumber: Mock.Random.natural(5000, 6000)
        },
        {
          id: 3,
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar2.webp',
          name: '前端/UE小分队',
          peopleNumber: Mock.Random.natural(10, 5000)
        },
        {
          id: 4,
          avatar: 'https://cdn.jsdelivr.net/gh/manyuemeiquqi/my-image-bed/dist/avatar1.webp',
          name: '内容识别插件小分队',
          peopleNumber: Mock.Random.natural(10, 100)
        }
      ])
    })
    Mock.mock(new RegExp('/api/user/certification'), () => {
      return successResponseWrap({
        enterpriseInfo: {
          accountType: '企业账号',
          status: 0,
          time: '2018-10-22 14:53:12',
          legalPerson: '李**',
          certificateType: '中国身份证',
          authenticationNumber: '130************123',
          enterpriseName: '低调有实力的企业',
          enterpriseCertificateType: '企业营业执照',
          organizationCode: '7*******9'
        },
        record: [
          {
            certificationType: 1,
            certificationContent: '企业实名认证，法人姓名：李**',
            status: 0,
            time: '2021-02-28 10:30:50'
          },
          {
            certificationType: 1,
            certificationContent: '企业实名认证，法人姓名：李**',
            status: 1,
            time: '2020-05-13 08:00:00'
          }
        ]
      })
    })

    Mock.mock(new RegExp('/api/user/upload'), () => {
      return successResponseWrap('ok')
    })

    Mock.mock(new RegExp('/api/user/save-info'), () => {
      return successResponseWrap('ok')
    })

    Mock.mock(new RegExp('/api/user/switch-user-role'), () => {
      const role = window.localStorage.getItem('data-base-role') || 'admin'
      const roleValue = role === 'admin' ? 'user' : 'admin'
      window.localStorage.setItem('data-base-role', roleValue)
      return successResponseWrap({
        role: roleValue
      })
    })
  }
})
