<template>
  <div class="page-user">
    <page-tabulation
      module="users"
      tableColumnSlotKey="name"
      :formQueryConfig="formQueryConfig"
      :tableColumnConfig="tableColumnConfig"
    >
      <template #name="scope">
        <span>{{ scope.row.createAt }}</span>
      </template>
    </page-tabulation>
  </div>
</template>

<script lang="ts" setup>
import PageTabulation from '@/components/page-tabulation/index.vue'
import { IFormQueryItem } from '@/components/page-search/types'
import { formatDate } from '@/utils/format'

const formQueryConfig: IFormQueryItem[] = [
  {
    prop: 'realname',
    label: '姓名',
    type: 'input'
  },
  { prop: 'cellphone', label: '手机号', type: 'input' }
]
const tableColumnConfig = [
  { prop: 'name', label: '用户名', width: 100 },
  { prop: 'realname', label: '姓名', width: 100 },
  { prop: 'cellphone', label: '手机号', width: 160 },
  {
    prop: 'createAt',
    label: '创建时间',
    formatter: (row: any) => {
      return formatDate(row.createAt)
    }
  },
  {
    prop: 'handler',
    label: '操作'
  }
]
</script>

<style scoped></style>
