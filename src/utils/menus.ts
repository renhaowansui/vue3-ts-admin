import { IBreadcrumb } from '@/components/breadcrumb/types'
// 路由地址获取获取对应菜单
export function mapPathToMenu(
  path: string,
  menuList: any[],
  breadCrumbMenu?: any[]
): any {
  for (const menu of menuList) {
    if (menu.type === 1) {
      const findMenu = mapPathToMenu(path, menu.children ?? [])
      if (findMenu) {
        breadCrumbMenu?.push(menu)
        breadCrumbMenu?.push(findMenu)
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === path) {
      return menu
    }
  }
}
// 路由地址获取对应菜单数组（面包屑）
export function mapBreadCrumbMenu(path: string, menuList: any[]) {
  const breadCrumbMenu: IBreadcrumb[] = []
  mapPathToMenu(path, menuList, breadCrumbMenu)
  return breadCrumbMenu
}
