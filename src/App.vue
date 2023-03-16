<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import request from '@/service'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    request
      .get({
        url: '/home/multidata',
        interceptors: {
          requestInterceptor(config: any) {
            console.log('单个请求拦截成功', config)
            return config
          },
          responseInterceptor(err: any) {
            console.log('单个请求响应拦截成功', err)
            return err
          }
        }
      })
      .then((res: any) => {
        console.log('res', res)
      })
      .catch((err: any) => {
        console.log('err', err)
      })
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
