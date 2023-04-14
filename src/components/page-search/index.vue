<template>
  <div class="page-search">
    <div class="header">
      <slot name="header" :scope="formData"></slot>
    </div>
    <el-form
      ref="pageFormRef"
      :inline="true"
      :model="formData"
      :label-width="labelWidth"
    >
      <el-row>
        <el-col
          :span="colWidthNumber"
          v-for="item in formQueryList"
          :key="item.prop"
        >
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :rules="item.rules"
          >
            <el-input
              v-if="item.type === 'input'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              v-bind="item.otherOption"
              :clearable="true"
            />
            <el-select
              v-else-if="item.type === 'select'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
            >
              <el-option
                v-for="selectItem in item.selectOption"
                :key="selectItem.value"
                :label="selectItem.label"
                :value="selectItem.value"
                v-bind="item.otherOption"
              />
            </el-select>
            <el-date-picker
              v-else-if="item.type === 'datepicker'"
              v-model="formData[item.prop]"
              v-bind="item.otherOption"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="colWidthNumber"
          v-if="isShowButtonGroup && formQueryList.length > 0"
        >
          <el-button type="primary" @click="searchSubmit">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer" :scope="formData"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import type { IFormQueryItem } from './types'
import { FormInstance } from 'element-plus'
export default defineComponent({
  emits: ['update:modelValue', 'submit'],
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formQueryList: {
      type: Array as PropType<IFormQueryItem[]>,
      required: true
    },
    labelWidth: {
      type: String,
      default: '80px'
    },
    isShowButtonGroup: {
      type: Boolean,
      default: true
    },
    colWidthNumber: {
      type: Number,
      default: 6
    }
  },
  setup(props, { emit }) {
    const pageFormRef = ref<FormInstance>()
    let formData: any = ref({})
    watch(
      props.modelValue,
      (newVal) => {
        console.log('props.modelValue', props.modelValue, newVal)
        formData.value = newVal
      },
      {
        deep: true
      }
    )
    watch(
      formData,
      (newVal) => {
        emit('update:modelValue', newVal)
      },
      {
        deep: true
      }
    )
    const searchSubmit = async () => {
      let isValid = false
      await pageFormRef.value?.validate((valid, fields) => {
        isValid = valid
        if (valid) {
          console.log('submit!')
          emit('submit', formData)
        } else {
          console.log('error submit!', fields)
        }
      })
      return isValid
    }
    const resetFields = () => {
      pageFormRef.value?.resetFields()
    }
    return { pageFormRef, formData, searchSubmit, resetFields }
  }
})
</script>

<style lang="less" scoped>
.page-search {
  text-align: left;
  .el-form {
    .el-form-item {
      width: 100%;
    }
  }
}
</style>
