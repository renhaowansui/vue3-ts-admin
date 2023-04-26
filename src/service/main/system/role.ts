import RhRequest from '@/service/index'

export function getRoleList(params: any) {
  return RhRequest.post({
    url: '/role/list',
    data: params
  })
}
