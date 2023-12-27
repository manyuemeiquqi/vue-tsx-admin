import type { DescData } from '@arco-design/web-vue/es/descriptions/interface'

export type ServiceRecord = {
  id: number
  title: string
  description: string
  name?: string
  actionType?: string
  icon?: string
  data?: DescData[]
  enable?: boolean
  expires?: boolean
}
export type PolicyRecord = {
  id: string
  number: number
  name: string
  contentType: 'img' | 'horizontalVideo' | 'verticalVideo'
  filterType: 'artificial' | 'rules'
  count: number
  status: 'online' | 'offline'
  createdTime: string
}
export type PolicyQuery = {
  number: string
  name: string
  createdTime: string | number | Date[]
  contentType: string
  filterType: string
  status: string
}
export type PolicyParams = {
  current: number
  pageSize: number
} & Partial<PolicyRecord>

export type PolicyListRes = {
  list: PolicyRecord[]
  total: number
}
