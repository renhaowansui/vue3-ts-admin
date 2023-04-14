import { defineStore } from 'pinia'
import { getDepartmentList } from '@/service/main/system/department'

export const useDepartmentStore = defineStore('department', {
  state: () => ({
    entireList: []
  }),
  actions: {
    async getEntireList() {
      const { data } = await getDepartmentList({
        offset: 0,
        size: 1000
      })
      this.$state.entireList = data.list
    }
  }
})
