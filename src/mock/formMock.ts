import Mock from 'mockjs'
import setupMock, { successResponseWrap } from '@/mock/setupMock'

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/channel-form/submit'), () => {
      return successResponseWrap('ok')
    })
    Mock.mock(new RegExp('/api/channel-form/group'), () => {
      return successResponseWrap('ok')
    })
  }
})
