export type AnyObject = {
  [key: string]: unknown
}

export type GetParams = {
  body: string
  type: string
  url: string
}
export type OKResponse = 'ok'

export type Pagination = {
  current: number
  pageSize: number
  total?: number
}
