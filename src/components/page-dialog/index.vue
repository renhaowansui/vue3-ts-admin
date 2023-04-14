<template>
  <el-dialog
    v-model="show"
    :title="title"
    :width="width"
    @opened="handleOpen"
    @close="handleClose"
  >
    <page-search
      ref="pageSearchRef"
      v-model="formData"
      :formQueryList="dialogQueryList"
      labelWidth="80px"
      :colWidthNumber="24"
      :isShowButtonGroup="false"
    ></page-search>
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'
import PageSearch from '@/components/page-search/index.vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '30%'
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  dialogQueryList: {
    type: Array,
    default: () => []
  },
  data: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['update:modelValue', 'close', 'confirm'])
const pageSearchRef = ref()
let formData = ref({})
const show = computed(() => {
  return props.modelValue
})
const handleOpen = () => {
  // 初始化编辑数据
  if (props.data && Object.keys(props.data).length > 0) {
    Object.assign(formData.value, props.data)
    console.log('123', formData.value)
  } else {
    for (let key in formData.value) {
      delete formData.value[key]
    }
  }
}
const handleClose = () => {
  pageSearchRef.value.resetFields()
  emits('update:modelValue', false)
  emits('close')
}
const handleConfirm = async () => {
  let isValid = await pageSearchRef.value.searchSubmit()
  if (isValid) {
    emits('confirm', formData.value)
  }
}
</script>

<style lang="scss" scoped></style>
