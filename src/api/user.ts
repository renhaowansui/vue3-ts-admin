import rhRequest from '@/service/index'

export function accountLogin(params: any) {
  return rhRequest.post({
    url: '/login',
    data: params
  })
}

export function getUserInfo(id: string) {
  return rhRequest.get({
    url: '/users/' + id
  })
}

export function getRoleMenu(id: string) {
  return rhRequest.get({
    url: '/role/' + id + '/menu'
  })
}
