import server from '@/utils/request'

export function getGoodsList() {
  return server({
    url: 'home/category/head'
  })
}

// 获取轮播图的图片
export function getBannerList(params = {}) {
  const {distributionSite = "1"} = params
  return server({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}

// 获取新鲜好物模块列表
export function getFreshGoodsList() {
  return server({
    url: '/home/new'
  })
}

// 获取人气推荐模块列表
export function getHotGoodsList() {
  return server({
    url: '/home/hot'
  })
}

// 热门品牌模块
export function getBrandList() {
  return server({
    url: '/home/brand'
  })
}

// 获取商品列表
export function getProductList() {
  return server({
    url: '/home/goods'
  })
}