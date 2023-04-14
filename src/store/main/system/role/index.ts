import { defineStore } from 'pinia'
import { getRoleList } from '@/service/main/system/role'

export const useRoleStore = defineStore('role', {
  state: () => ({
    entireList: []
  }),
  actions: {
    async getEntireList() {
      const { data } = await getRoleList({
        offset: 0,
        size: 1000
      })
      this.$state.entireList = data.list
    }
  }
})
