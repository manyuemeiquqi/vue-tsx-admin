import Mock from 'mockjs'
import { type MockParams } from './type'
import { isLogin } from '@/utils/auth'
import setupMock, { successResponseWrap, failResponseWrap } from '@/mock/setupMock'
setupMock({
  setup() {
    // 用户信息
    Mock.mock(new RegExp('/api/user/info'), () => {
      // if (isLogin()) {
      const a = true
      if (a) {
        const role = window.localStorage.getItem('userRole') || 'admin'
        return successResponseWrap({
          name: '王立群',
          avatar:
            '//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
          email: 'wangliqun@email.com',
          job: 'frontend',
          jobName: '前端艺术家',
          organization: 'Frontend',
          organizationName: '前端',
          location: 'beijing',
          locationName: '北京',
          introduction: '人潇洒，性温存',
          personalWebsite: 'https://www.arco.design',
          phone: '150****0000',
          registrationDate: '2013-05-10 12:10:00',
          accountId: '15012312300',
          certification: 1,
          role
        })
      }
      return failResponseWrap(null, '未登录', 50008)
    })

    // 登录
    Mock.mock(new RegExp('/api/user/login'), (params: MockParams) => {
      const { username, password } = JSON.parse(params.body)
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', 50000)
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000)
      }
      if (username === 'admin' && password === 'admin') {
        window.localStorage.setItem('userRole', 'admin')
        return successResponseWrap({
          token: '12345'
        })
      }
      if (username === 'user' && password === 'user') {
        window.localStorage.setItem('userRole', 'user')
        return successResponseWrap({
          token: '54321'
        })
      }
      return failResponseWrap(null, '账号或者密码错误', 50000)
    })

    // 登出
    Mock.mock(new RegExp('/api/user/logout'), () => {
      return successResponseWrap(null)
    })

    // 用户的服务端菜单
    Mock.mock(new RegExp('/api/user/menu'), () => {
      const menuList = [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {
            locale: 'menu.server.dashboard',
            requiresAuth: true,
            icon: 'icon-dashboard',
            order: 1
          },
          children: [
            {
              path: 'workplace',
              name: 'Workplace',
              meta: {
                locale: 'menu.server.workplace',
                requiresAuth: true
              }
            },
            {
              path: 'https://arco.design',
              name: 'arcoWebsite',
              meta: {
                locale: 'menu.arcoWebsite',
                requiresAuth: true
              }
            }
          ]
        }
      ]
      return successResponseWrap(menuList)
    })

    // 最新项目
    Mock.mock(new RegExp('/api/user/my-project/list'), () => {
      const contributors = [
        {
          name: '秦臻宇',
          email: 'qingzhenyu@arco.design',
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
        },
        {
          name: '于涛',
          email: 'yuebao@arco.design',
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
        },
        {
          name: '宁波',
          email: 'ningbo@arco.design',
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp'
        },
        {
          name: '郑曦月',
          email: 'zhengxiyue@arco.design',
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp'
        },
        {
          name: '宁波',
          email: 'ningbo@arco.design',
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp'
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
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
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
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
          name: '火山引擎智能应用团队',
          peopleNumber: Mock.Random.natural(10, 100)
        },
        {
          id: 2,
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
          name: '企业级产品设计团队',
          peopleNumber: Mock.Random.natural(5000, 6000)
        },
        {
          id: 3,
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
          name: '前端/UE小分队',
          peopleNumber: Mock.Random.natural(10, 5000)
        },
        {
          id: 4,
          avatar:
            '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp',
          name: '内容识别插件小分队',
          peopleNumber: Mock.Random.natural(10, 100)
        }
      ])
    })
  }
})
