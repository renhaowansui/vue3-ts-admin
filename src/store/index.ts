import { createPinia } from 'pinia'
import { useLoginStore } from './login/index'
import { useUserStore } from './main/system/user'

export const Pinia = createPinia()

export { useLoginStore, useUserStore }
