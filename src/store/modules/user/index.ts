import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/global'
const useUserStore = defineStore('userStore', {
  state: (): UserInfo => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: ''
  }),
  getters: {
    userInfo(state: UserInfo): UserInfo {
      return { ...state }
    }
  },
  actions: {
    setUserInfo(payload: Partial<UserInfo>) {
      this.$patch(payload)
    },
    resetUserInfo() {
      this.$reset()
    }
  }
})

export default useUserStore
