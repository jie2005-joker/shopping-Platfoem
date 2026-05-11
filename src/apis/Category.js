import request from '@/utils/request'

// 获取分类数据
export const getTopCategoryAPI = (id) => {
  return request({
    url:'/category',
    params:{
      id
    }
  })
}

// 获取二级分类商品列表
export const getSubCategoryAPI = (id) => {
  return request({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}