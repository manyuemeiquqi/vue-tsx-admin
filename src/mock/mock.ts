import Mock from 'mockjs'

import '@/mock/detailMock'
import '@/mock/userMock'

import '@/mock/dashboardMock'
Mock.setup({
  timeout: '600-1000'
})
