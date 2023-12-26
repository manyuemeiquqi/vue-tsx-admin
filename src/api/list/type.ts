import type { DescData } from '@arco-design/web-vue/es/descriptions/interface'
export interface ChatRecord {
  id: number
  username: string
  content: string
  time: string
  isCollect: boolean
}
export interface ServiceRecord {
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
export interface PolicyRecord {
  id: string
  number: number
  name: string
  contentType: 'img' | 'horizontalVideo' | 'verticalVideo'
  filterType: 'artificial' | 'rules'
  count: number
  status: 'online' | 'offline'
  createdTime: string
}
export interface PolicyQuery {
  number: string
  name: string
  createdTime: string | number | Date[]
  contentType: string
  filterType: string
  status: string
}
export interface PolicyParams extends Partial<PolicyRecord> {
  current: number
  pageSize: number
}

export interface PolicyListRes {
  list: PolicyRecord[]
  total: number
}
