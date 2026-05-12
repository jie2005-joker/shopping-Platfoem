// 购物车状态管理
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const addCart = (goods) => {
  //  console.log("添加购物车",goods)
  // 检查购物车中是否有相同商品
  
    // 有相同商品，更新数量
    const item = cartList.value.find(item => item.skuId === goods.skuId)
    if(item){
      item.count += goods.count
    }else{
      // 无相同商品，添加到购物车
      cartList.value.push(goods)
    }
    // console.log(cartList.value)
    // 保存到本地存储
    // localStorage.setItem('cartList', JSON.stringify(cartList.value))
  }
  return {
    cartList,
    addCart
  }
},{
  persist: true
})
