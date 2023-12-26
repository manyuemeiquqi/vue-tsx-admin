import Mock from 'mockjs'

import.meta.glob('./modules/*.ts', {
  eager: true
})

Mock.setup({
  timeout: '100-300'
})
