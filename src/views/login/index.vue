<template>
  <div class="login">
    <div class="login-pane">
      <h1>后台管理系统</h1>
      <el-tabs v-model="tabActive" type="border-card" class="demo-tabs" stretch>
        <el-tab-pane name="account">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><calendar /></el-icon>
              <span>账号登陆</span>
            </span>
          </template>
          <account-pane ref="accountPaneRef" />
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><calendar /></el-icon>
              <span>手机登录</span>
            </span>
          </template>
          <phone-pane ref="phonePaneRef" />
        </el-tab-pane>
      </el-tabs>
      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button type="primary" class="login-btn" @click="handleLoginClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AccountPane from './components/account-pane.vue'
import PhonePane from './components/phone-pane.vue'
import NGrid from '@/components/nGrid/index.vue'
import NGi from '@/components/nGi/index.vue'

export default defineComponent({
  components: {
    AccountPane,
    PhonePane,
    NGrid,
    NGi
  },
  setup() {
    let tabActive = ref('account')
    let isKeepPassword = ref(true)
    let accountPaneRef = ref()
    let phonePaneRef = ref()

    const handleLoginClick = () => {
      console.log('handleLoginClick', accountPaneRef, phonePaneRef)
      if (tabActive.value === 'account') {
        accountPaneRef.value?.submitForm()
      } else {
        phonePaneRef.value?.submitForm()
      }
    }
    return {
      AccountPane,
      PhonePane,
      tabActive,
      isKeepPassword,
      accountPaneRef,
      phonePaneRef,
      handleLoginClick
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url('../../assets/img/login-bg.svg') no-repeat;
  .login-pane {
    width: 320px;
    margin-bottom: 70px;
    h1 {
      text-align: center;
    }
    .account-control {
      display: flex;
      justify-content: space-between;
    }
    .login-btn {
      width: 100%;
      height: 40px;
    }
  }
}
</style>
