<template>
  <div class="layout">
    <el-container class="container">
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <nav-menu :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <nav-header @collapseAsideMenu="collapseAsideMenu" />
        </el-header>
        <el-main>
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from './components/nav-menu.vue'
import NavHeader from './components/nav-header.vue'
export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)
    const collapseAsideMenu = (val: boolean) => {
      isCollapse.value = val
    }
    return {
      isCollapse,
      collapseAsideMenu
    }
  }
})
</script>

<style lang="less" scoped>
.layout,
.container {
  height: 100%;
}

.el-main {
  height: calc(100% - 48px);

  .page-info {
    background-color: #fff;
    border-radius: 5px;
  }
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}
.el-header {
  display: flex;
  height: 48px !important;
  color: #333;
  text-align: center;
  align-items: center;
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
