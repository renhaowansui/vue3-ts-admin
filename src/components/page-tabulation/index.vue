<template>
  <div class="page-tabulation">
    <page-search
      v-model="formData"
      :formQueryList="formQueryConfig"
      @submit="handleSearch"
    >
    </page-search>
    <page-table :tableData="tableData" :tableColumnConfig="tableColumnConfig">
      <template #header>
        <el-button type="primary" size="mini" @click="handleAdd"
          >新增</el-button
        >
      </template>
      <template #[tableColumnSlotKey]="scope">
        <slot :name="tableColumnSlotKey" :row="scope.row"></slot>
      </template>
      <template #handler="scope: { row: any }">
        <div class="handle-btns">
          <el-button size="mini" type="text" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.row)">
            刪除
          </el-button>
        </div>
      </template>
    </page-table>
    <page-pagination
      class="page-pagination"
      :total="tableTotalCount"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></page-pagination>
    <page-dialog
      v-model="dialogOption.visible"
      :dialogQueryList="dialogQueryConfig"
      v-bind="dialogOption"
      @close="dialogClose"
      @confirm="dialogConfirm"
    ></page-dialog>
  </div>
</template>

<script lang="ts" setup>
import rhRequest from '@/service/index'
import { ref, defineProps, PropType } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import PageSearch from '@/components/page-search/index.vue'
import PageTable from '@/components/page-table/index.vue'
import PagePagination from '@/components/page-pagination/index.vue'
import PageDialog from '@/components/page-dialog/index.vue'
import { ITableColumn } from '../page-table/types'
import { IFormQueryItem } from '../page-search/types'

const props = defineProps({
  module: {
    type: String,
    required: true
  },
  formQueryConfig: {
    type: Array as PropType<IFormQueryItem[]>,
    default: () => []
  },
  dialogQueryConfig: {
    type: Array as PropType<IFormQueryItem[]>,
    default: () => []
  },
  tableColumnConfig: {
    type: Array,
    default: () => []
  },
  tableColumnSlotKey: {
    type: String
  },
  tableHeaderSlotKey: {
    type: String
  },
  tableFooterSlotKey: {
    type: String
  }
})

let formData = ref({
  offset: 0,
  size: 10
})
let tableData = ref<ITableColumn[]>([])
let tableTotalCount = ref<number>(0)
let dialogOption = ref({
  visible: false,
  type: '',
  title: '',
  data: {}
})

// 列表查询
const getList = async () => {
  const { data } = await rhRequest.post({
    url: `/${props.module}/list`,
    data: formData.value
  })
  tableData.value = data.list || []
  tableTotalCount = data.totalCount || 0
}
const handleSearch = () => {
  formData.value.offset = 0
  getList()
}
const currentChange = (val: number) => {
  formData.value.offset = (val - 1) * formData.value.size
  getList()
}
const sizeChange = (val: number) => {
  formData.value.size = val
  getList()
}
// 弹窗操作
const handleAdd = () => {
  dialogOption.value = {
    visible: true,
    type: 'add',
    title: '新增',
    data: {}
  }
}
const handleEdit = (row: any) => {
  let dialogFormData: any = {
    id: row.id
  }
  props.dialogQueryConfig.forEach((item: IFormQueryItem) => {
    dialogFormData[item.prop] = row[item.prop]
  })
  console.log('dialogFormData', dialogFormData)
  dialogOption.value = {
    visible: true,
    type: 'edit',
    title: '编辑',
    data: dialogFormData
  }
}
const handleDelete = (row: any) => {
  ElMessageBox.confirm('是否确认删除该记录？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const { code } = await rhRequest.delete({
      url: `/${props.module}/${row.id}`
    })
    if (code === 0) {
      ElMessage.success('删除成功')
      getList()
    }
  })
}
const dialogConfirm = (params: any) => {
  if (dialogOption.value.type === 'add') {
    add(params)
  } else {
    edit(params)
  }
}
const add = async (params: any) => {
  const { code } = await rhRequest.post({
    url: `/${props.module}`,
    data: params.value
  })
  if (code === 0) {
    ElMessage.success('创建成功')
    dialogClose()
    getList()
  }
}
const edit = async (params: any) => {
  console.log('params', params)
  const { code } = await rhRequest.patch({
    url: `/${props.module}/${params.value.id}`,
    data: params.value
  })
  if (code === 0) {
    ElMessage.success('编辑成功')
    dialogClose()
    getList()
  }
}
const dialogClose = () => {
  dialogOption.value = {
    visible: false,
    type: 'add',
    title: '',
    data: {}
  }
}
getList()
</script>

<style lang="less" scoped>
.page-tabulation {
  .page-pagination {
    margin-top: 10px;
  }
}
</style>
