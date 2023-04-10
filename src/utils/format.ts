import { dayjs } from 'element-plus'

export function formatDate(
  time: string | number,
  format = 'YYYY-MM-DD HH:mm:ss'
) {
  return dayjs(time).format(format)
}
