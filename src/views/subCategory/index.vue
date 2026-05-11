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
        type="card"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="最新商品" name="first">最新商品</el-tab-pane>
        <el-tab-pane label="最高人气" name="second">最高人气</el-tab-pane>
        <el-tab-pane label="评论最多" name="third">评论最多</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import {useSubCategory} from '@/views/subCategory/components/index.js'
const {subCategoryList, getSubCategory} = useSubCategory()
const handleClick = () => {

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