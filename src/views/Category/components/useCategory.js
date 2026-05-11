import { ref,onMounted, watch } from 'vue'
import { getTopCategoryAPI } from '@/apis/Category'
import { useRoute,onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  const route = useRoute()
  const categoryList = ref([])
  const getCategory = async (id = route.params.id) => {
    if (!id) {
      return
    }
    const res = await getTopCategoryAPI(id)
    categoryList.value = res.result
    // console.log(categoryList.value)
  }

  // 监听路由变化,watch(() => route.params.id, fetchData),适用于动态参数场景
  // watch(() => route.params.id, (newVal,oldVal) => {
  //   if (newVal !== oldVal) {
  //     getCategory()
  //   }
  // })

  // 使用 onBeforeRouteUpdate路由更新时触发,适用于同组件内路由切换
  onBeforeRouteUpdate((to) => {
    if (to.params.id !== route.params.id) {
      getCategory(to.params.id)
    }
  })
  onMounted(() => {
    getCategory()
  })
  return {
    categoryList
  }
}
