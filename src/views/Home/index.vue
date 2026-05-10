<template>
  <div class="home">
    <homeCategory />
    <homeBanner />
    <homeNew />
    <homeHot />
    <homeBrand />
   <homeProduct />

  </div>
</template>

<script setup>
import homeProduct from './components/homeProduct.vue'
import homeHot from './components/homeHot.vue'
import homeNew from './components/homeNew.vue'
import homeBanner from './components/homeBanner.vue'
import homeCategory from './components/homeCategory.vue'
import homeBrand from './components/homeBrand.vue'


</script>

<style scoped>
.home{
  width: 1240px;
  margin: 0 auto;
  position: relative;
}
</style>