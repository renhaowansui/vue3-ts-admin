<template>
  <div>Home123</div>
  <div>{{ userStore }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/store/user'
export default defineComponent({
  setup() {
    const userStore = useUserStore()
    return {
      userStore
    }
  }
})
</script>

<style scoped></style>
