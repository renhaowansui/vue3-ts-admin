import RhRequest from '@/service/index'

export function getUserList(params: any) {
  return RhRequest.post({
    url: '/users/list',
    data: params
  })
}
