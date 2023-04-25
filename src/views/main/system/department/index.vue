<template>
  <div class="page-user">
    <page-tabulation
      module="department"
      :formQueryConfig="formQueryConfig"
      :tableColumnConfig="tableColumnConfig"
      :dialogQueryConfig="dialogQueryConfig"
    >
    </page-tabulation>
  </div>
</template>

<script lang="ts" setup>
import PageTabulation from '@/components/page-tabulation/index.vue'
import { IFormQueryItem } from '@/components/page-search/types'
import { formatDate } from '@/utils/format'

const formQueryConfig: IFormQueryItem[] = [
  {
    prop: 'name',
    type: 'input',
    label: '部门名称',
    placeholder: '请输入部门名称'
  },
  {
    prop: 'leader',
    type: 'input',
    label: '领导名称',
    placeholder: '请输入领导名称'
  }
]
const tableColumnConfig = [
  { prop: 'name', label: '部门名称', width: 100 },
  { prop: 'leader', label: '领导', width: 100 },
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
    label: '部门名称',
    type: 'input',
    placeholder: '请输入部门名称',
    rules: [{ required: true }]
  },
  {
    prop: 'leader',
    label: '领导',
    type: 'input',
    placeholder: '请输入领导',
    rules: [{ required: true }]
  }
]
</script>

<style scoped></style>
