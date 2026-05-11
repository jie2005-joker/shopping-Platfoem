import { getSubCategoryGoodsAPI } from '@/apis/Category'
import { ref,onMounted } from 'vue'
import {useRoute} from 'vue-router'

export function useGoods() {
  const goodsList = ref([])
  const route = useRoute()
  const data = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
  })
  // 获取商品列表
  const pages = ref(1)
  const getGoods = async () => {
    const res = await getSubCategoryGoodsAPI(data.value)
    // console.log(res)
    pages.value = res.result.pages
    goodsList.value = res.result.items
  }

  // 控制何时禁止加载更多
  const disabled = ref(false)

  // 加载更多
const loadMore = async () => {
  // console.log(pages.value)

  if(data.value.page > pages.value){
    // 没有更多了
    disabled.value = true
    return
  }
  const res = await getSubCategoryGoodsAPI(data.value)
  // console.log(res)
  goodsList.value = [...goodsList.value, ...res.result.items]
    data.value.page++
  // console.log(goodsList)
}
  onMounted(() => {
    getGoods()
  })
  return {
    goodsList,
    getGoods,
    disabled,
    loadMore,
    data
  }
}