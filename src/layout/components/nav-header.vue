<template>
  <div class="nav-header">
    <div class="left">
      <div class="collapse-icon" @click="collapseAsideMenu">
        <el-icon>
          <Expand v-if="isCollapse" />
          <Fold v-else />
        </el-icon>
      </div>
      <div>
        <breadcrumb />
      </div>
    </div>
    <div class="right">right</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Expand, Fold } from '@element-plus/icons-vue'
import Breadcrumb from '@/components/breadcrumb/index.vue'

export default defineComponent({
  emits: ['collapseAsideMenu'],
  components: {
    Expand,
    Fold,
    Breadcrumb
  },
  setup(props, { emit }) {
    const route = useRoute()
    let isCollapse = ref(false)
    const collapseAsideMenu = () => {
      isCollapse.value = !isCollapse.value
      console.log('collapseAsideMenu', JSON.parse(JSON.stringify(route)))
      emit('collapseAsideMenu', isCollapse.value)
    }
    return {
      isCollapse,
      collapseAsideMenu
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .collapse-icon {
      cursor: pointer;
      margin-right: 20px;
      line-height: 100%;
      i {
        font-size: 24px;
      }
    }
  }
}
</style>
