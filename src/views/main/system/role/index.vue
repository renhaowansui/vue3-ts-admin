<template>
  <div class="page-user">
    <page-tabulation
      module="role"
      :formQueryConfig="formQueryConfig"
      :tableColumnConfig="tableColumnConfig"
      :dialogQueryConfig="dialogQueryConfig"
      :otherInfo="otherInfo"
      @add="handleAdd"
      @edit="handleEdit"
    >
      <template #dialog>
        <el-tree
          ref="menuTreeRef"
          :data="menuData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="checkedKeys"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </template>
    </page-tabulation>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, nextTick } from 'vue'
import { useLoginStore } from '@/store'
import PageTabulation from '@/components/page-tabulation/index.vue'
import { IFormQueryItem } from '@/components/page-search/types'
import { menuMapLeafKeys } from '@/utils/menus'

const userStore = useLoginStore()
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

const menuTreeRef = ref()
const menuData = computed(() => {
  return userStore.menuInfo
})
const checkedKeys = ref([])
const otherInfo = ref({})
const setCheckedKeys = () => {
  nextTick(() => {
    menuTreeRef.value.setCheckedKeys(checkedKeys.value, false)
  })
}
const handleAdd = () => {
  checkedKeys.value = []
  console.log('handleAdd', checkedKeys.value)
  setCheckedKeys()
}
const handleEdit = (row: any) => {
  checkedKeys.value = []
  const menuCheckKeys = menuMapLeafKeys(row.menuList)
  checkedKeys.value = menuCheckKeys as []
  setCheckedKeys()
}
const handleCheckChange = (data: any, data2: any) => {
  const { checkedKeys, halfCheckedKeys } = data2
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}
</script>

<style scoped></style>
