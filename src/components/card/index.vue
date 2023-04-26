<template>
  <div class="component-card">
    <el-card class="box-card">
      <template #header>
        <span>{{ title }}</span>
      </template>
      <div>
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: '默认标题'
  }
})
</script>

<style lang="less" scoped>
.component-card {
  height: 100%;
}
</style>
