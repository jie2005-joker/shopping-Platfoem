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