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

/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryGoodsAPI = (data) => {
  return request({
    url:'/category/goods/temporary',
    method:'POST',
    data
  })
}

// 获取商品详情
export const getGoodsDetailAPI = (id) => {
  return request({
    url:'/goods',
    params:{
      id
    }
  })
}