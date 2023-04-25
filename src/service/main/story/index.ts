import rhRequest from '@/service/index'

export function getStoryList() {
  return rhRequest.get({
    url: '/story/list'
  })
}

export function addStory(params: any) {
  return rhRequest.post({
    url: '/story',
    data: params
  })
}
