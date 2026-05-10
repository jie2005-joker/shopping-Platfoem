<script setup>
import { getTopCategoryAPI } from '@/apis/Category'
import { onMounted, ref, watch } from 'vue'
import {useRoute} from 'vue-router'
import { getBannerList } from '@/apis/index'
import GoodsItem from '@/views/Home/components/goodsItem.vue'
const route = useRoute()
const categoryList = ref([])
const getCategory = () => {
  const id = route.params.id
  if (!id) {
    return
  }
  getTopCategoryAPI(id).then(res => {
  categoryList.value = res.result
  // console.log(categoryList.value)
})
}

const imgURL = ref([])
const getBanner = () => {
  getBannerList().then(res => {
    // console.log(res)
    imgURL.value = res.result.map(item => item.imgUrl)
  })
}

onMounted(() => {
  getCategory()
  getBanner()
})

watch(() => route.params.id, (newVal,oldVal) => {
  if (newVal !== oldVal) {
    getCategory()
  }
})
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryList.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图模块 -->
      <div class="block text-center banner">
        <el-carousel height="495px" motion-blur>
          <el-carousel-item v-for="item in imgURL" :key="item">
            <img v-img-lazy="item" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 子分类模块 -->
       <div class="sub-list">
        <h3>全部分类</h3>
          <ul>
            <li v-for="i in categoryList.children" :key="i.id">
              <RouterLink to="/">
                <img :src="i.picture" />
                <p>{{ i.name }}</p>
              </RouterLink>
            </li>
          </ul>
       </div>
      <div class="ref-goods" v-for="item in categoryList.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
      <div class="body">
        <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
      </div> 
    </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
  .banner{
  width: 1240px;
  height: 495px;
  margin: 0 auto;
  img{
    width: 100%;
    height: 495px;
  }
}
}
</style>

