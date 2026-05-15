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
  const loading = ref(false)
  // 加载更多
const loadMore = async () => {
    if (disabled.value || loading.value) return

    loading.value = true
    try {
      const res = await getSubCategoryGoodsAPI(data.value)
      goodsList.value = [...goodsList.value, ...res.result.items]
      pages.value = res.result.pages

      if (data.value.page >= pages.value) {
        disabled.value = true
      } else {
        data.value.page++
      }
    } finally {
      loading.value = false
    }
  }
   const initLoad = async () => {
    await loadMore('bottom')
    // 内容不足时继续加载
    while (!disabled.value && goodsList.value.length < 20) {
      await loadMore('bottom')
    }
  }
  onMounted(() => {
    getGoods()
    initLoad()
  })
  return {
    goodsList,
    getGoods,
    disabled,
    loadMore,
    data,
    initLoad,
    loading
  }
}