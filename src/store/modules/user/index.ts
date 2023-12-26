import { defineStore } from 'pinia'
import { getUserInfo, type UserInfo } from '@/api/user'

export default defineStore('userStore', {
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
    },

    switchRoles() {
      return new Promise<string>((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user'
        resolve(this.role)
      })
    },
    async refreshUserInfo() {
      const res = await getUserInfo()
      this.setUserInfo(res.data)
    }
  }
})
