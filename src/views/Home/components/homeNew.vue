<template>
  <homePanel :goodsList="freshGoodsList" title="新鲜好物" subTitle="新鲜出炉 品质靠谱"/>
 </template>

<script setup>
import homePanel from '@/views/Home/components/homePanel.vue';
import { getFreshGoodsList } from '@/apis/index'
import { onMounted,ref } from 'vue'
const freshGoodsList = ref([])
onMounted(() => {
  getFreshGoodsList().then(res => {
    // console.log(res)
    freshGoodsList.value = res.result
  })
})
</script>

<style scoped>
</style>