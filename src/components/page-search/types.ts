import type { FormItemRule } from 'element-plus'
type IFormQueryType = 'input' | 'select' | 'date' | 'datepicker'

export interface IFormQueryItem {
  prop: string
  label: string
  type: IFormQueryType
  placeholder?: string
  selectOption?: any[]
  otherOption?: any
  rules?: FormItemRule[]
}
