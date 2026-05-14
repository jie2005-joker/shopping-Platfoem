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
export const deleteCartAPI = (ids) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

// 合并购物车商品
export const mergeCartAPI = (data) => {
  return request({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}

// 新增收货地址信息
export const addAddressAPI = (data) => {
  return request({
    url: '/member/address',
    method: 'POST',
    data
  })
}

// 删除收货地址
export const deleteAddressAPI = (id) => {
  return request({
    url: `/member/address/${id}`,
    method: 'DELETE'
  })
}