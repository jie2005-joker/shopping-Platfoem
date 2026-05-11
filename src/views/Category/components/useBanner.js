  import { getBannerList } from '@/apis/index'
  import { ref,onMounted } from 'vue'

  export function useBanner() {
    const imgURL = ref([])
    const getBanner = async () => {
      const res = await getBannerList()
      // console.log(res)
      imgURL.value = res.result.map(item => item.imgUrl)
    }
    onMounted(() => {
      getBanner()
    })
  return {
    imgURL,
    getBanner
  }
}