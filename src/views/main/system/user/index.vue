<template>
  <div class="page-user">
    <page-tabulation
      module="users"
      tableColumnSlotKey="name"
      :formQueryConfig="formQueryConfig"
      :tableColumnConfig="tableColumnConfig"
      :dialogQueryConfig="initDialogQueryConfig"
    >
      <template #enable="scope">
        <span>{{ +scope.row.enable === 1 ? '启用' : '禁用' }}</span>
      </template>
    </page-tabulation>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
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
    label: '用户名',
    placeholder: '请输入用户名'
  },
  {
    prop: 'realname',
    type: 'input',
    label: '真实姓名',
    placeholder: '请输入真实姓名'
  },
  {
    prop: 'cellphone',
    type: 'input',
    label: '电话号码',
    placeholder: '请输入电话号码'
  },
  {
    prop: 'enable',
    type: 'select',
    label: '用户状态',
    placeholder: '请选择用户状态',
    selectOption: [
      { title: '启用', value: 1 },
      { title: '禁用', value: 0 }
    ]
  },
  {
    prop: 'createAt',
    type: 'datepicker',
    label: '创建时间',
    otherOption: {
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      type: 'daterange'
    }
  }
]
const tableColumnConfig = [
  { prop: 'name', label: '用户名', width: 100 },
  { prop: 'realname', label: '真实姓名', width: 100 },
  { prop: 'cellphone', label: '手机号码', width: 160 },
  { prop: 'enable', label: '状态', width: 100 },
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
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名',
    rules: [{ required: true }]
  },
  {
    prop: 'realname',
    label: '真实姓名',
    type: 'input',
    placeholder: '请输入真实姓名',
    rules: [{ required: true }]
  },
  {
    prop: 'password',
    label: '用户密码',
    type: 'input',
    placeholder: '请输入密码',
    rules: [{ required: true }],
    otherOption: {
      type: 'password',
      showPassword: true
    }
  },
  {
    prop: 'cellphone',
    label: '电话号码',
    type: 'input',
    placeholder: '请输入电话号码',
    rules: [{ required: true }]
  },
  {
    prop: 'departmentId',
    label: '选择部门',
    type: 'select',
    placeholder: '请选择部门',
    selectOption: departmentStore.entireList,
    rules: [{ required: true }]
  },
  {
    prop: 'roleId',
    label: '选择角色',
    type: 'select',
    placeholder: '请选择角色',
    selectOption: roleStore.entireList,
    rules: [{ required: true }]
  }
]
const initDialogQueryConfig = computed(() => {
  dialogQueryConfig.find((item: IFormQueryItem) => {
    if (item.prop === 'departmentId') {
      console.log('departmentIddepartmentId')
      item.selectOption = departmentStore.entireList.map((selectItem: any) => {
        return { label: selectItem.name, value: selectItem.id }
      })
    }
    if (item.prop === 'roleId') {
      console.log('roleIdroleId')
      item.selectOption = roleStore.entireList.map((selectItem: any) => {
        return { label: selectItem.name, value: selectItem.id }
      })
    }
  })
  return dialogQueryConfig
})

const getDialogSelectData = () => {
  departmentStore.getEntireList()
  roleStore.getEntireList()
}

getDialogSelectData()
</script>

<style scoped></style>
