import { defineStore } from 'pinia'
import { accountLogin, getUserInfo, getRoleMenu } from '@/api/user'
import router from '@/router'
import LocalCache from '@/utils/cache'
export const useUserStore = defineStore('user', {
  state: () => ({
    token: LocalCache.getData('token') || '',
    userInfo: LocalCache.getData('userInfo') || {},
    menuInfo: LocalCache.getData('menuInfo') || []
  }),
  actions: {
    async accountLogin(params: any) {
      const result = await accountLogin(params)
      const { token, id } = result.data
      this.$state.token = token
      LocalCache.setData('token', token)
      this.getUserInfo(id)
    },
    async getUserInfo(id: string) {
      const { data: userInfo } = await getUserInfo(id)
      this.$state.userInfo = userInfo
      LocalCache.setData('userInfo', userInfo)

      const { data: menuInfo } = await getRoleMenu(userInfo.role.id)
      this.$state.menuInfo = menuInfo
      LocalCache.setData('menuInfo', menuInfo)

      router.push('/home')
    }
  }
})
