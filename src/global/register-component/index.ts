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
  ElTable,
  ElTableColumn,
  ElPagination,
  ElInput,
  ElIcon,
  ElSelect,
  ElOption,
  ElTimePicker,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElRow,
  ElCol,
  ElTree,
  ElDropdown,
  ElDropdownItem,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem,
  ElMenuItemGroup,
  ElDropdownMenu,
  ElTag
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
  ElMenuItemGroup,
  ElSubMenu,
  ElMenuItem,
  ElCheckbox,
  ElLink,
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElInput,
  ElIcon,
  ElSelect,
  ElOption,
  ElTimePicker,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElRow,
  ElCol,
  ElTree,
  ElDropdownMenu,
  ElDropdown,
  ElDropdownItem,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem,
  ElTag
]

const registerComponent = {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name, component)
    })
  }
}

export default registerComponent
