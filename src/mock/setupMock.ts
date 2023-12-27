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
    code: 20000
  }
}

export const failResponseWrap = (data: unknown, msg: string, code = 50000) => {
  return {
    data,
    status: 'fail',
    msg,
    code
  }
}
