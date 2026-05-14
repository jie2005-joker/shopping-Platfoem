// 对用户信息进行管理
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login } from '@/apis/login'
import {useCartStore} from '@/stores/cartStore'
import {mergeCartAPI} from '@/apis/cart'
export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  const userInfo = ref({})
  const getUserInfo = async ({ account, password }) => {
    const res = await login({
      account,
      password
    })
    userInfo.value = res.result
    localStorage.setItem('user', JSON.stringify(userInfo.value))
    const mergeRes = await mergeCartAPI(
      cartStore.cartList.map(item=> {
        return {
          skuId: item.skuId,
          selected: item.selected,
          count: item.count
        }
      })
    )
    cartStore.refreshCartList()
  }

  // 清空用户信息
  const clearUserInfo = () => {
    userInfo.value = null
    localStorage.removeItem('user')
    cartStore.clearCart()
  }
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
})
