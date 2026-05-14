import request from '@/utils/request'

// 生成订单信息
export const generateOrderAPI = () => {
  return request({
    url: '/member/order/pre',
    method: 'GET'
  })
}
