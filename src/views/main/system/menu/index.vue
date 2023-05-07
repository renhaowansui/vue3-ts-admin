<template>
  <div class="page-user">
    <page-tabulation
      module="menu"
      :tableConfig="tableConfig"
      :tableColumnConfig="tableColumnConfig"
      :addBtnShow="false"
    >
    </page-tabulation>
  </div>
</template>

<script lang="ts" setup>
import PageTabulation from '@/components/page-tabulation/index.vue'
import { formatDate } from '@/utils/format'

const tableConfig = {
  showIndexColumn: false
}
const tableColumnConfig = [
  { prop: 'name', label: '菜单名称', width: 200 },
  { prop: 'type', label: '类型', width: 80 },
  { prop: 'url', label: '路径', width: 200 },
  { prop: 'permission', label: '按钮权限', width: 140 },
  {
    prop: 'createAt',
    label: '创建时间',
    width: 180,
    formatter: (row: any) => {
      return formatDate(row.createAt)
    }
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    formatter: (row: any) => {
      return formatDate(row.createAt)
    }
  }
]
</script>

<style scoped></style>
