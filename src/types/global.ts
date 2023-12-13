export interface AnyObject {
  [key: string]: unknown
}

export interface Options {
  value: unknown
  label: string
}

export interface NodeOptions extends Options {
  children?: NodeOptions[]
}

export interface GetParams {
  body: null
  type: string
  url: string
}

export interface PostData {
  body: string
  type: string
  url: string
}

export interface Pagination {
  current: number
  pageSize: number
  total?: number
}

export type TimeRanger = [string, string]

export interface GeneralChart {
  xAxis: string[]
  data: Array<{ name: string; value: number[] }>
}

export type RoleType = '' | '*' | 'admin' | 'user'
export interface UserInfo {
  name?: string
  avatar?: string
  job?: string
  organization?: string
  location?: string
  email?: string
  introduction?: string
  personalWebsite?: string
  jobName?: string
  organizationName?: string
  locationName?: string
  phone?: string
  registrationDate?: string
  accountId?: string
  certification?: number
  role: RoleType
}

export interface TagProps {
  title: string
  name: string
  fullPath: string
  query?: any
  ignoreCache?: boolean
}

export interface TabBarState {
  tagList: TagProps[]
  cacheTabList: Set<string>
}

export interface Pagination {
  current: number
  pageSize: number
  total?: number
}

export interface GeneralChart {
  xAxis: string[]
  data: Array<{ name: string; value: number[] }>
}
