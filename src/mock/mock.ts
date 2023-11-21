import Mock from 'mockjs'

import '@/mock/detailMock'
import '@/mock/userMock'

import '@/mock/dashboardMock'
import '@/mock/visualizationMock'
Mock.setup({
  timeout: '600-1000'
})
