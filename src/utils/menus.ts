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
// 获取菜单id
export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(menuList)

  return permissions
}

export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)

  return leftKeys
}
