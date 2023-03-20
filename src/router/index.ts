import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/index'
// 获取路由组件的方法
// const _import = require('@/router/_import_' + process.env.NODE_ENV)

const routes: RouteRecordRaw[] = [
  {
    path: '/main',
    name: 'main',
    component: () => import('@/view/main/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/view/404/index.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

let hasAsyncRoutes = false

router.beforeEach((to) => {
  console.log('to', to)
  if (to.path !== '/login') {
    const userStore = useUserStore()
    const token = userStore.$state.token
    const menu = userStore.$state.menuInfo
    if (!token) {
      return '/login'
    }
    console.log('hasAsyncRoutes', hasAsyncRoutes)
    if (!hasAsyncRoutes) {
      console.log('menu', JSON.parse(JSON.stringify(menu)))
      addAsyncRouter(menu)
    }
    return true
  }
})
function addAsyncRouter(menuList: any[]) {
  menuList = JSON.parse(JSON.stringify(menuList))
  for (const item of menuList) {
    if (item.type === 2) {
      // const compoentFile = importAll(require.context('@/view', true, /\.vue$/))
      // console.log('compoentFile', compoentFile)
      // console.log('cache', cache)
      router.addRoute('main', {
        path: item.url,
        name: item.name,
        component: () => require(`@/view${item.url}.vue`).default
      })
    } else {
      addAsyncRouter(item.children)
    }
  }
  hasAsyncRoutes = true
  console.log('router', router.getRoutes(), router)
}

export default router
