import RhRequest from '@/service/index'

export function getGoodsCategoryCount() {
  return RhRequest.get({
    url: '/goods/category/count'
  })
}

export function getGoodsCategorySale() {
  return RhRequest.get({
    url: '/goods/category/sale'
  })
}

export function getGoodsCategoryFavor() {
  return RhRequest.get({
    url: '/goods/category/favor'
  })
}

export function getGoodsSaleTop10() {
  return RhRequest.get({
    url: '/goods/sale/top10'
  })
}

export function getGoodsAddressSale() {
  return RhRequest.get({
    url: '/goods/address/sale'
  })
}
