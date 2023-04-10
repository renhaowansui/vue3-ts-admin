<template>
  <div>
    <page-search v-model="formData" :formQueryList="formQueryConfig">
      <template #header>
        <h2>高级查询</h2>
      </template>
      <template #footer>
        <el-button type="primary">查询</el-button>
      </template>
    </page-search>
    <page-table
      :tableData="tableData"
      :tableColumnConfig="tabltableColumnConfig"
    >
      <template #name="row">
        <el-button>{{ row }}</el-button>
      </template>
    </page-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import PageSearch from '@/components/page-search/index.vue'
import PageTable from '@/components/page-table/index.vue'
import { IFormQueryItem } from '@/components/page-search/types'
export default defineComponent({
  components: {
    PageSearch,
    PageTable
  },
  setup() {
    let formData = reactive({
      user: '',
      region: ''
    })
    let formQueryConfig = [
      { prop: 'user', label: '姓名', type: 'input' },
      {
        prop: 'region',
        label: '出生地',
        type: 'select',
        placeholder: '请选择',
        selectOption: [
          {
            label: '长沙',
            value: '0'
          },
          {
            label: '深圳',
            value: '1'
          }
        ]
      },
      {
        prop: 'createdtime',
        label: '创建时间',
        type: 'datepicker',
        otherOption: {
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          type: 'daterange'
        }
      }
    ] as IFormQueryItem[]
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No'
      },
      {
        date: '2016-05-02',
        name: 'Tom2',
        address: 'No. 189, Grove St'
      },
      {
        date: '2016-05-04',
        name: 'Tom3',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom4',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]
    const tabltableColumnConfig = [
      { prop: 'name', label: '姓名', width: 100 },
      { prop: 'address', label: '地址', width: 200 },
      {
        prop: 'date',
        label: '创建时间',
        formatter: (row: any) => {
          return row.date.split('-')[0]
        }
      }
    ]
    return {
      PageSearch,
      PageTable,
      formData,
      formQueryConfig,
      tableData,
      tabltableColumnConfig
    }
  }
})
</script>

<style scoped></style>
