<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.name">{{
      item.name
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { mapBreadCrumbMenu } from '@/utils/menus'
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/store'

export default defineComponent({
  setup() {
    const route = useRoute()
    const userStore = useLoginStore()
    const breadcrumbList = computed(() => {
      return mapBreadCrumbMenu(route.path, userStore.menuInfo)
    })
    return { breadcrumbList }
  }
})
</script>

<style scoped></style>
