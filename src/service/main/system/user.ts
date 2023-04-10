import rhRequest from '@/service/index'

export function getUserList(params: any) {
  return rhRequest.post({
    url: '/users/list',
    data: params
  })
}
