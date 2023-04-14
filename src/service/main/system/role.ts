import rhRequest from '@/service/index'

export function getRoleList(params: any) {
  return rhRequest.post({
    url: '/role/list',
    data: params
  })
}
