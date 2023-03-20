<template>
  <div class="nav-menu">
    <div class="title">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <span v-if="!isCollapse">后台管理系统</span>
    </div>
    <el-menu
      class="el-menu-vertical"
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
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { Document } from '@element-plus/icons-vue'
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
    const userStore = useUserStore()
    const menuList = computed(() => userStore.$state.menuInfo)
    console.log('menuList', menuList)

    const handleMenuItemClick = (item: any) => {
      console.log('handleMenuItemClick', item)
      router.push({
        path: item.url ?? '/404'
      })
    }
    return {
      menuList,
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
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;

    .img {
      height: 50%;
      margin: 0 10px;
    }

    span {
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
