import server from '@/utils/request'

export function getGoodsList() {
  return server({
    url: 'home/category/head'
  })
}

// 获取轮播图的图片
export function getBannerList() {
  return server({
    url: '/home/banner'
  })
}

// 获取新鲜好物模块列表
export function getFreshGoodsList() {
  return server({
    url: '/home/new'
  })
}
