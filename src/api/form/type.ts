export type BaseInfoModel = {
  activityName: string
  channelType: string
  promotionTime: string[]
  promoteLink: string
}
export type ChannelInfoModel = {
  advertisingSource: string
  advertisingMedia: string
  keyword: string[]
  pushNotify: boolean
  advertisingContent: string
}

export type GroupFormModel = {
  video: {
    mode: string
    acquisition: {
      resolution: string
      frameRate: number
    }
    encoding: {
      resolution: string
      rate: {
        min: number
        max: number
        default: number
      }
      frameRate: number
      profile: string
    }
  }
  audio: {
    mode: string
    explanation: string
    acquisition: {
      channels: number
    }
    encoding: {
      channels: number
      rate: number
      profile: string
    }
  }
}
