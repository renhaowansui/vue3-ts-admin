<template>
  <div class="page-user">
    <page-tabulation
      module="role"
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

const formQueryConfig: IFormQueryItem[] = [
  {
    prop: 'name',
    label: '名称',
    type: 'input'
  },
  { prop: 'intro', label: '介绍', type: 'input' }
]
const dialogQueryConfig: IFormQueryItem[] = [
  {
    prop: 'name',
    label: '角色名称',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入角色名称',
        trigger: 'blur'
      }
    ]
  },
  {
    prop: 'intro',
    label: '角色介绍',
    type: 'input',
    rules: [
      {
        required: true,
        message: '请输入角色介绍',
        trigger: 'blur'
      }
    ]
  }
]
const tableColumnConfig = [
  { prop: 'name', label: '角色名称', width: 200 },
  { prop: 'intro', label: '介绍' },
  {
    prop: 'handler',
    label: '操作'
  }
]
</script>

<style scoped></style>
