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
  const getGoods = async () => {
    const res = await getSubCategoryGoodsAPI(data.value)
    // console.log(res)
    goodsList.value = res.result.items
  }
  onMounted(() => {
    getGoods()
  })
  return {
    goodsList,
    getGoods
  }
}