<template>
  <div class="page-user">
    <page-tabulation
      module="story"
      :tableColumnConfig="tableColumnConfig"
      :addBtnShow="false"
    >
    </page-tabulation>
  </div>
</template>

<script lang="ts" setup>
import PageTabulation from '@/components/page-tabulation/index.vue'
import { formatDate } from '@/utils/format'

const tableColumnConfig = [
  { prop: 'title', label: '标题', width: 160 },
  { prop: 'content', label: '内容' },
  {
    prop: 'createAt',
    label: '创建时间',
    width: 180,
    formatter: (row: any) => {
      return formatDate(row.createAt)
    }
  }
]
</script>

<style scoped></style>
