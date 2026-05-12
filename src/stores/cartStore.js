// 购物车状态管理
import { defineStore } from 'pinia'
import { ref,computed } from 'vue'

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

  // 删除购物车商品
  const delGoods = (skuId) => {
    cartList.value = cartList.value.filter(item => item.skuId !== skuId)
  }

  // 计算商品总数量
  const totalCount = computed(() => {
    return cartList.value.reduce((pre, cur) => pre + cur.count, 0)
  })

  // 计算商品总金额
  const totalPrice = computed(() => {
    return cartList.value.reduce((pre, cur) => pre + cur.price * cur.count, 0)
  })

  // 计算选中商品数量
  const selectedCount = computed(() => {
    return cartList.value.filter(item => item.selected).reduce((pre, cur) => pre + cur.count, 0)
  })
  // 计算选中商品总金额
  const selectedPrice = computed(() => {
    return cartList.value.filter(item => item.selected).reduce((pre, cur) => pre + cur.price * cur.count, 0)
  })

  // 全选/取消全选
  const selectAll = ref(false)
  // 检测是否全选了商品
  // const isAllSelected = computed(() => {
  //   return cartList.value.every(item => item.selected)
  // })
  // 全选/取消全选商品
  const selectAllGoods = () => {
    selectAll.value = !selectAll.value
    cartList.value.forEach(item => {
      item.selected = selectAll.value
    })
  }

  // 单选商品
  const isAllSelected = ref(false)
  const singleSelect = (i) => {
    // i.selected = selected
    i.selected = !i.selected
    // 检测是否全选了商品
    isAllSelected.value = cartList.value.every(item => item.selected)
  }

  return {
    cartList,
    addCart,
    delGoods,
    totalCount,
    totalPrice,
    selectedCount,
    selectedPrice,
    selectAll,
    selectAllGoods,
    isAllSelected,
    singleSelect
  }
},{
  persist: true
})
