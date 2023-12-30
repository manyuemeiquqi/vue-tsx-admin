import { ResCode } from '@/types/constants'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isDEV = import.meta.env.MODE === 'development'

export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
  //  if (!mock && isDEV) setup() // correct
  if (!mock) setup()
}

export const successResponseWrap = (data: unknown) => {
  return {
    data,
    status: 'ok',
    msg: '请求成功',
    code: ResCode.success
  }
}

export const failResponseWrap = (data: unknown, msg: string, code = ResCode.error) => {
  return {
    data,
    status: 'fail',
    msg,
    code
  }
}
