import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Pinia from './store'
import '@/assets/css/index.less'
import registerComponent from '@/global/register-component'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(Router)
app.use(Pinia)
app.use(registerComponent)
app.mount('#app')
