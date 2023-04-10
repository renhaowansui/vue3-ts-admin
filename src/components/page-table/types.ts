import { FormItemRule } from 'element-plus'
export interface ITableColumn {
  prop: string
  label: string
  width?: number
  minWidth?: number
  align?: 'left' | 'center' | 'right'
  fixed?: 'true' | 'left' | 'right'
  formatter?: (row: any, column: any) => string
}
