<template>
    <div class="block text-center banner">
      <el-carousel height="495px" motion-blur>
        <el-carousel-item v-for="item in imgURL" :key="item">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script setup>
import { getBannerList } from '@/apis/index'
import { onMounted,ref } from 'vue'
const imgURL = ref([])
onMounted(() => {
  getBannerList().then(res => {
    // console.log(res)
    imgURL.value = res.result.map(item => item.imgUrl)
  })
})
</script>

<style scoped lang="scss">
.banner{
  width: 1240px;
  height: 495px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 90;
  img{
    width: 100%;
    height: 495px;
  }
}
</style>