// 购物车状态管理
import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { getCartListAPI,addCartAPI, deleteCartAPI } from '@/apis/cart'
import { ElMessage } from 'element-plus'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

  const cartList = ref([])
  // 新增购物车商品
  const addCart = async (goods) => {
    // console.log(isLogin)
    //  console.log("添加购物车",goods)
    // 判断用户是否处于登录状态,如果是,则将购物车商品添加到接口中;否则添加到本地购物车中.
    if(isLogin.value){
      // 登录状态,添加到接口中
      const res = await addCartAPI({
        skuId: goods.skuId,
        count: goods.count
      })
      ElMessage.success('添加成功')
     
      // 更新本地购物车列表
      // 从接口中获取最新的购物车列表
      refreshCartList()
    }else{
      // 未登录状态,添加到本地购物车中
        // 有相同商品，更新数量
        // console.log(111)
      const item = cartList.value.find(item => item.skuId === goods.skuId)
      if(item){
        item.count += goods.count
      }else{
        // 无相同商品，添加到购物车
        cartList.value.push(goods)
      }
    }}

    // 删除购物车商品,如果是登录状态,则删除接口中的商品;否则删除本地购物车中的商品.
    const delGoods = async (ids) => {
      if(isLogin.value){
        // 登录状态,删除接口中的商品
        const res = await deleteCartAPI([ids])
        console.log("删除接口中的商品",res)
        // console.log(res)
        ElMessage.success('删除成功')
        // 更新本地购物车列表
        refreshCartList()
      }else{
        // 未登录状态,删除本地购物车中的商品
        cartList.value = cartList.value.filter(item => item.skuId !== ids)
      }
    }

    // 清空购物车
    const clearCart = () => {
      cartList.value = []
    }

    // 刷新购物车列表
    const refreshCartList = async () => {
      const cartListRes = await getCartListAPI()
      cartList.value = cartListRes.result
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
  // 全选/取消全选商品
  const selectAllGoods = () => {
    selectAll.value = !selectAll.value
    if(selectAll.value){
      isAllSelected.value = true
    }else{
      isAllSelected.value = false
    }
    // 将购物车中所有商品的selected属性设置为和全选按钮一样的状态
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
    if(isAllSelected.value){
      selectAll.value = true
    }else{
      selectAll.value = false
    }
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
    singleSelect,
    clearCart,
    refreshCartList
  }
},{
  persist: true
})
