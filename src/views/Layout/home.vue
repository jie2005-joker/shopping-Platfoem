<template>
  <div>
    <LayoutNav />
    <LayoutHeaderFixed />
    <LayoutHeader />
    <RouterView />
    <LayoutFooter />
  </div>
</template>

<script setup>
import LayoutHeaderFixed from '@/views/Layout/components/HeaderFixed.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
import {useCategoryStore} from '@/stores/category'
import {onMounted} from 'vue'

const categoryStore = useCategoryStore()
onMounted(() => {
  categoryStore.getCategoryList()
})
</script>

<style scoped>
</style>