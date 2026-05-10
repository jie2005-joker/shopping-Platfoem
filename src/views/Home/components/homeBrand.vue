<template>
  <homePanel title="热门品牌" subTitle="国际经典 品质认证">
    <div class="content">
      <div class="arrow arrow-left" @click="prevPage" v-show="currentPage > 1">
        <span>‹</span>
      </div>
      <RouterLink v-for="item in displayList" :key="item.id" class="content-item">
        <img :src="item.picture" :title="item.name">
      </RouterLink>
      <div class="arrow arrow-right" @click="nextPage" v-show="currentPage < totalPages">
        <span>›</span>
      </div>
    </div>
    <div class="pagination-info">
      {{ currentPage }} / {{ totalPages }}
    </div>
  </homePanel>
</template>

<script setup>
import homePanel from './homePanel.vue'
import { getBrandList } from '@/apis/index'
import { onMounted, ref, computed } from 'vue'

const brandList = ref([])
const currentPage = ref(1)
const pageSize = 5

const displayList = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return brandList.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(brandList.value.length / pageSize)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

onMounted(() => {
  getBrandList().then(res => {
    brandList.value = res.result
  })
})
</script>

<style scoped lang="scss">
.content{
  display: flex;
  align-items: center;
  gap: 10px;
  img{
    width: 244px;
    height: 306px;
  }
  .arrow{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 24px;
    color: #666;
    &:hover{
      background: #e0e0e0;
      color: #333;
    }
    &.arrow-left{
      margin-right: 10px;
    }
    &.arrow-right{
      margin-left: 10px;
    }
  }
}
.pagination-info{
  text-align: center;
  margin-top: 10px;
  color: #999;
  font-size: 14px;
}
</style>