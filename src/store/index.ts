import { createPinia } from 'pinia'

export const Pinia = createPinia()

export { useLoginStore } from './login/index'
export { useUserStore } from './main/system/user'
export { useRoleStore } from './main/system/role'
export { useDepartmentStore } from './main/system/department'
