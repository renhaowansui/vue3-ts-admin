<template>
  <div class="page-user">
    <page-tabulation
      module="category"
      :formQueryConfig="formQueryConfig"
      :tableColumnConfig="tableColumnConfig"
      :dialogQueryConfig="dialogQueryConfig"
    >
    </page-tabulation>
  </div>
</template>

<script lang="ts" setup>
import { useDepartmentStore, useRoleStore } from '@/store'
import PageTabulation from '@/components/page-tabulation/index.vue'
import { IFormQueryItem } from '@/components/page-search/types'
import { formatDate } from '@/utils/format'

const departmentStore = useDepartmentStore()
const roleStore = useRoleStore()
const formQueryConfig: IFormQueryItem[] = [
  {
    prop: 'name',
    type: 'input',
    label: '类别',
    placeholder: '请输入类别'
  }
]
const tableColumnConfig = [
  { prop: 'name', label: '类别', width: 100 },
  {
    prop: 'createAt',
    label: '创建时间',
    formatter: (row: any) => {
      return formatDate(row.createAt)
    }
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    formatter: (row: any) => {
      return formatDate(row.updateAt)
    }
  },
  {
    prop: 'handler',
    label: '操作'
  }
]
const dialogQueryConfig: IFormQueryItem[] = [
  {
    prop: 'name',
    label: '类别',
    type: 'input',
    placeholder: '请输入类别',
    rules: [{ required: true }]
  }
]

const getDialogSelectData = () => {
  departmentStore.getEntireList()
  roleStore.getEntireList()
}

getDialogSelectData()
</script>

<style scoped></style>
