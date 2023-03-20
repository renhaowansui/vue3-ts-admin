import { App } from 'vue'
import {
  ElButton,
  ElTabs,
  ElTabPane,
  ElDialog,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElCheckbox,
  ElLink,
  ElForm,
  ElFormItem,
  ElInput,
  ElIcon
} from 'element-plus'

const components = [
  ElButton,
  ElTabs,
  ElTabPane,
  ElDialog,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElCheckbox,
  ElLink,
  ElForm,
  ElFormItem,
  ElInput,
  ElIcon
]

const registerComponent = {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name, component)
    })
  }
}

export default registerComponent
