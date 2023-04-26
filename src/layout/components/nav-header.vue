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
    <div class="right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img src="@/assets/head-img.jpg" />
          {{ userName }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/store'
import { Expand, Fold, ArrowDown } from '@element-plus/icons-vue'
import Breadcrumb from '@/components/breadcrumb/index.vue'
import $bus from '@/utils/eventBus'

export default defineComponent({
  emits: ['collapseAsideMenu'],
  components: {
    Expand,
    Fold,
    Breadcrumb,
    ArrowDown
  },
  setup(props, { emit }) {
    const route = useRoute()
    const userStore = useLoginStore()
    let isCollapse = ref(false)
    const collapseAsideMenu = () => {
      isCollapse.value = !isCollapse.value
      console.log('collapseAsideMenu', JSON.parse(JSON.stringify(route)))
      emit('collapseAsideMenu', isCollapse.value)
      setTimeout(() => {
        $bus.emit('resize')
      }, 200)
    }
    const userName = computed(() => {
      return userStore.userInfo.name
    })

    const handleLogout = () => {
      userStore.resetState()
    }
    return {
      isCollapse,
      collapseAsideMenu,
      userName,
      handleLogout
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
  .right {
    .el-dropdown-link {
      display: flex;
      align-items: center;
      cursor: pointer;
      img {
        height: 30px;
        margin-right: 10px;
        border-radius: 50%;
      }
    }
  }
}
</style>
