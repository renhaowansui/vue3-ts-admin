<template>
  <div class="page-user">
    <page-tabulation
      module="goods"
      tableColumnSlotKey="imgUrl"
      :formQueryConfig="formQueryConfig"
      :tableColumnConfig="tableColumnConfig"
      :dialogQueryConfig="dialogQueryConfig"
    >
      <template #imgUrl="scope">
        <img class="columnImg" :src="scope.row.imgUrl" />
      </template>
    </page-tabulation>
  </div>
</template>

<script lang="ts" setup>
import PageTabulation from '@/components/page-tabulation/index.vue'
import { IFormQueryItem } from '@/components/page-search/types'
import { ITableColumn } from '@/components/page-table/types'

const formQueryConfig: IFormQueryItem[] = [
  {
    prop: 'name',
    type: 'input',
    label: '商品名称',
    placeholder: '请输入商品名称'
  }
]
const tableColumnConfig: ITableColumn[] = [
  { prop: 'name', label: '商品名称', width: 200 },
  { prop: 'desc', label: '描述', width: 240 },
  { prop: 'imgUrl', label: '图片', width: 160 },
  { prop: 'oldPrice', label: '旧价格', width: 100 },
  { prop: 'newPrice', label: '新价格', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'favorCount', label: '收藏数量', width: 100 },
  { prop: 'saleCount', label: '销售数量', width: 100 },
  { prop: 'inventoryCount', label: '库存', width: 100 },
  {
    prop: 'handler',
    label: '操作',
    width: 100,
    fixed: 'right'
  }
]
const dialogQueryConfig: IFormQueryItem[] = [
  {
    prop: 'name',
    label: '商品名称',
    type: 'input',
    placeholder: '请输入商品名称',
    rules: [{ required: true }]
  },
  {
    prop: 'newPrice',
    label: '最新价格',
    type: 'input'
  }
]
</script>

<style lang="less" scoped>
.page-user {
  .columnImg {
    width: 134px;
  }
}
</style>
