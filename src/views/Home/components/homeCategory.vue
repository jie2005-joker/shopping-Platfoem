<template>
  <div class="category" @mouseleave="handleHiddenList">
    <ul>
      <li 
      v-for="item in categoryStore.categoryList" 
      :key="item.id"
      :class="{'active': currentId === item.id}"
      @mouseenter="handleShowList(item)"
      >
        <RouterLink to="/">{{item.name}}</RouterLink>
        <RouterLink v-for="i in item.children.slice(0,2)" :key="i.id" to="/" >{{i.name}}</RouterLink>
      </li>
    </ul>
    <div class="category-menu" v-if="currentCategory">
      <div class="title">
        <span>{{currentCategory.name}}模块</span>
        <span class="sub-title">根据您的购买或浏览记录推荐</span>
      </div>
      <div class="content">
          <RouterLink v-for="good in currentCategory.goods" :key="good.id" :to="`/details/${good.id}`" class="content-item">
            <img :src="good.picture" alt="">
            <div class="info">
              <div class="title">{{good.name}}</div>
              <div class="desc">{{good.desc}}</div>
              <div class="price"><span>¥</span>{{good.price}}</div>
            </div>
          </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useCategoryStore} from '@/stores/categoryStore'
import {ref} from 'vue'
// 获取分类列表
const categoryStore = useCategoryStore()

// 当前选中的分类
const currentCategory = ref(null)

// 当前选中的分类id
const currentId = ref(null)

// 隐藏分类列表
const hide = () => {
  // 200ms后隐藏分类列表
  timer = setTimeout(() => {
    currentId.value = null
    currentCategory.value = null
  }, 200)
}
const clearTimer = () => clearTimeout(timer)
const handleShowList = (item) => {
  // console.log(item)
  clearTimer()
  currentCategory.value = item
  currentId.value = item.id
}

let timer = null

const handleHiddenList = () => {
  hide()
}
</script>

<style scoped lang="scss"> 
.category{
  width: 250px;
  height: 495px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 9999;
  li{
    height: 55px;
    color: #fff;
    line-height: 55px;
    padding-left: 40px;
    a{
      height: 100%;
      color: #fff;
      font-size: 14px;
      margin-right: 5px;
      &:first-child{
        font-size: 16px;
        margin-right: 12px;
      }
    }
  }
  .active{
    background: $xtxColor;
  }
  .category-menu{
    position: absolute;
    top: 0px;
    left: 250px;
    width: 990px;
    height: 100%;
    padding: 10px;
    background: #fff;
    border: 1px solid #e5e5e5;
    .title{
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 6px;
      .sub-title{
        color: #373535;
        font-weight: 500;
        font-size: 12px;
        margin-left: 10px;
      }
    }
    .content{
      width: 100%;
      // height: 90%;
      height: 450px;
      
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, minmax(100px, 1fr));
      grid-gap: 8px;
      .content-item{
        display: flex;
        align-items: center;
        gap: 10px;
        // text-align: right;
        border: 1px solid #e5e5e5;
        padding: 10px;
        border-radius: 10px;
        img{
          width: 100px;
          height: 100px;
        }
        .info{
          .title{
            overflow: hidden;
            display: -webkit-box;
            line-clamp: 2;
            -webkit-line-clamp: 2; /* 控制显示行数，改数字即可 */
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            font-size: 18px;
            font-weight: 600;
            /* 必须设置宽度/高度限制 */
            width: 180px;
          }
          .desc{
             white-space: nowrap; /* 强制不换行 */
             overflow: hidden;    /* 溢出部分隐藏 */
             text-overflow: ellipsis; /* 溢出显示省略号... */
  
              /* 必须给容器设置宽度，否则不生效 */
             width: 180px;
             color: #999;
          }
          .price{
            font-size: 20px;
            color: $priceColor;
            span{
              margin-right: 2px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>