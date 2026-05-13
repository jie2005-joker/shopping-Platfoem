import request from '@/utils/request'

// 加入购物车列表
export const addCartAPI = (data) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data
  })
}

// 获取购物车列表
export const getCartListAPI = () => {
  return request({
    url: '/member/cart',
    method: 'GET'
  })
}

// 删除购物车中商品
export const deleteCartAPI = (id) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      id
    }
  })
}