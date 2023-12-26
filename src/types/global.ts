export type AnyObject = {
  [key: string]: unknown
}

export type Options = {
  value: unknown
  label: string
}

export type NodeOptions = {
  children?: NodeOptions[]
} & Options

export type GetParams = {
  body: null
  type: string
  url: string
}

export type PostData = {
  body: string
  type: string
  url: string
}

export type Pagination = {
  current: number
  pageSize: number
  total?: number
}

export type TimeRanger = [string, string]

export type TagProps = {
  title: string
  name: string
  fullPath: string
  query?: any
  ignoreCache?: boolean
}

export type TabBarState = {
  tagList: TagProps[]
  cacheTabList: Set<string>
}
