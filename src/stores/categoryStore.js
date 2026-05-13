import {ref} from 'vue'
import {defineStore} from 'pinia'
import {getGoodsList} from '@/apis/index'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])
  const getCategoryList = () => {
    getGoodsList().then(res => {
      categoryList.value = res.result
    })
  }
  return {categoryList, getCategoryList}
})
