import RhRequest from '@/service/index'

export function getStoryList() {
  return RhRequest.get({
    url: '/story/list'
  })
}

export function addStory(params: any) {
  return RhRequest.post({
    url: '/story',
    data: params
  })
}
