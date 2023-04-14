import { defineStore } from 'pinia'
import { getUserList } from '@/service/main/system/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    tableData: [],
    tableTotalCount: 0
  }),
  actions: {
    async getTableData(params: any) {
      console.log('userStore: getUserList')
      const { data } = await getUserList(params)
      this.$state.tableData = data.list
      this.$state.tableTotalCount = data.totalCount
      console.log('this.$state.userList', data)
    }
  }
})
