import RhRequest from '@/service/index'

export function getDepartmentList(params: any) {
  return RhRequest.post({
    url: '/department/list',
    data: params
  })
}
