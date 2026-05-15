<template>
  <div class="container">
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/category/'+ subCategoryList.parentId }">{{ subCategoryList.parentName }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ subCategoryList.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs
        v-model="data.sortField"
        type="card"
        class="demo-tabs"
        @tab-change="handleTabChange"
      >
        <el-tab-pane label="最新商品" name="publishTime">最新商品</el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum">最高人气</el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum">评论最多</el-tab-pane>
      </el-tabs>
       <el-scrollbar ref="scrollbarRef" height="1200px" @scroll="handleScroll">
    <div class="body">
      <goodsItem v-for="item in goodsList" :key="item.id" :goods="item"/>
      <div v-if="loading" class="load-tip">加载中...</div>
      <div v-else-if="disabled && goodsList.length > 0" class="load-tip">没有更多了</div>
    </div>
  </el-scrollbar>
    </div>
    
  </div>
</template>

<script setup>
import {useSubCategory} from '@/views/subCategory/components/index.js'
import {useGoods} from '@/views/subCategory/components/useGoods.js'
import goodsItem from '@/views/Home/components/goodsItem.vue'
import { ref } from 'vue'
import InfiniteList from 'vue3-infinite-list'

const {subCategoryList} = useSubCategory()
const {goodsList, getGoods, data, disabled, loadMore, loading} = useGoods()


const handleTabChange = () => {
  // console.log("切换了tab", data.value.sortField)
  data.value.page = 1
  getGoods()
}
 const scrollbarRef = ref()

  const handleScroll = ({ scrollTop }) => {
    const scrollbar = scrollbarRef.value
    if (!scrollbar) return

    const wrap = scrollbar.wrapRef
    if (!wrap) return

    const { scrollHeight, clientHeight } = wrap
    const distance = scrollHeight - scrollTop - clientHeight

    console.log('距离底部:', distance)

    if (distance < 50) {
      loadMore()
    }
  }
</script>

<style scoped lang="scss">
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    .load-tip {
  text-align: center;
  padding: 10px;
  color: #999;
}
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>