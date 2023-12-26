import Mock from 'mockjs'

import '@/mock/profileMock'
import '@/mock/userMock'

import '@/mock/dashboardMock'
import '@/mock/listMock'
import '@/mock/messageMock'
import '@/mock/formMock'
Mock.setup({
  timeout: '100-300'
})
