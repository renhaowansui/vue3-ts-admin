import rhRequest from '@/service/index'

export function getDepartmentList(params: any) {
  return rhRequest.post({
    url: '/department/list',
    data: params
  })
}
