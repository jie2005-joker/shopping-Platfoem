import { ref,onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getSubCategoryAPI } from '@/apis/Category'


// console.log(route)
export function useSubCategory() {
  const route = useRoute()
  const subCategoryList = ref({})
  const getSubCategory = async () => {

    const res = await getSubCategoryAPI(route.params.id)
    // console.log(res)
    subCategoryList.value = res.result
  }
  onMounted(() => {
    getSubCategory()
  })
  return {
    subCategoryList,
    getSubCategory
  }
}