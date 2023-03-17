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
  ElMenuItem,
  ElCheckbox,
  ElLink,
  ElForm,
  ElFormItem,
  ElInput
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
  ElMenuItem,
  ElCheckbox,
  ElLink,
  ElForm,
  ElFormItem,
  ElInput
]

const registerComponent = {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name, component)
    })
  }
}

export default registerComponent
