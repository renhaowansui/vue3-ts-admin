import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useLoginStore } from '@/store/index'
// 获取路由组件的方法
const _import = require('@/router/_import_' + process.env.NODE_ENV)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

let hasAsyncRoutes = false
let mainRedirectPath = ''

router.beforeEach((to) => {
  console.log('to', to)
  const userStore = useLoginStore()
  const token = userStore.$state.token
  const menu = userStore.$state.menuInfo
  if (to.path !== '/login') {
    if (!token) {
      return '/login'
    }
    if (!hasAsyncRoutes) {
      addAsyncRouter(menu)
      router.addRoute({
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/views/404/index.vue')
      })
      if (to.path === '/main') {
        return mainRedirectPath
      } else {
        router.replace(to)
      }
    }
  }
})
function addAsyncRouter(menuList: any[]) {
  menuList = JSON.parse(JSON.stringify(menuList))
  for (const item of menuList) {
    if (item.type === 2) {
      // const compoentFile = importAll(require.context('@/views', true, /\.vue$/))
      // console.log('compoentFile', compoentFile)
      // console.log('cache', cache)
      if (!mainRedirectPath) mainRedirectPath = item.url
      router.addRoute('main', {
        path: item.url,
        name: item.name,
        component: _import(item.url)
      })
    } else {
      addAsyncRouter(item.children)
    }
  }
  hasAsyncRoutes = true
  console.log('router', router.getRoutes(), router)
}

export default router
