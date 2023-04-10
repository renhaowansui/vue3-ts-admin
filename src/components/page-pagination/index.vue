<template>
  <div class="page-pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :small="small"
      :disabled="disabled"
      :background="background"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  emits: ['sizeChange', 'currentChange'],
  props: {
    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => [10, 20, 30, 40]
    },
    total: {
      type: Number,
      default: 0
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    small: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    background: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    let pageSize = ref(10)
    let currentPage = ref(1)

    const handleSizeChange = (val: any) => {
      console.log('handleSizeChange', val)
      emit('sizeChange', val)
    }
    const handleCurrentChange = (val: any) => {
      console.log('handleCurrentChange', val)
      emit('currentChange', val)
    }
    return {
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="less" scoped>
.page-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
