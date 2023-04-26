<template>
  <div class="nav-menu">
    <div class="title">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <span v-if="!isCollapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      class="el-menu-vertical"
      :default-active="defaultActive"
      background-color="#001529"
      text-color="#b7bdc3"
      active-text-color="#FFF"
      unique-opened
      :collapse="isCollapse"
    >
      <el-sub-menu
        v-for="subMenu in menuList"
        :key="subMenu.id"
        :index="subMenu.id + ''"
      >
        <template #title>
          <el-icon><document /></el-icon>
          <span>{{ subMenu.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="item in subMenu.children"
            :key="item.id"
            :index="item.id + ''"
            @click="handleMenuItemClick(item)"
            >{{ item.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoginStore } from '@/store'
import { Document } from '@element-plus/icons-vue'
import { mapPathToMenu } from '@/utils/menus'
export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Document
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const userStore = useLoginStore()
    const menuList = computed(() => userStore.$state.menuInfo)
    const menu = computed(() => mapPathToMenu(route.path, menuList.value))
    const defaultActive = ref(menu.value + '')

    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/404'
      })
    }
    return {
      menuList,
      defaultActive,
      handleMenuItemClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  width: 100%;
  .title {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
    .el-menu-vertical:not(.el-menu--collapse) {
      width: 100%;
      height: calc(100% - 48px);
    }
  }
}
</style>
