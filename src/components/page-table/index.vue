<template>
  <div class="page-table">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-table :data="tableData" row-key="id" border>
      <el-table-column
        v-if="showIndexColumn"
        class-name="index-column"
        type="index"
        label="序号"
        width="56"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-for="column in tableColumnConfig"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :formatter="column.formatter"
      >
        <template #default="scope">
          <slot :name="column.prop" :row="scope.row"
            ><span>{{
              column.formatter
                ? column.formatter(scope.row, column)
                : scope.row[column.prop]
            }}</span></slot
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ITableColumn } from './types'

export default defineComponent({
  props: {
    tableData: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: true
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    tableColumnConfig: {
      type: Array as PropType<ITableColumn[]>,
      required: true
    }
  }
})
</script>

<style lang="less" scoped>
.page-table {
  height: 100%;
  .header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  ::v-deep(.el-table) {
    .index-column {
      .el-table__placeholder {
        display: none !important;
      }
    }
  }
}
</style>
