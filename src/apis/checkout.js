import request from '@/utils/request'

// 生成订单信息
export const generateOrderAPI = () => {
  return request({
    url: '/member/order/pre',
    method: 'GET'
  })
}

// 提交订单
export const submitOrderAPI = (data) => {
  return request({
    url: '/member/order',
    method: 'POST',
    data
  })
}

// 获取订单详情
export const getOrderDetailAPI = (id) => {
  return request({
    url: `/member/order/${id}`,
    method: 'GET'
  })
}