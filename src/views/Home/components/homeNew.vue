<template>
  <homePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
    <ul>
        <li class="item" v-for="item in freshGoodsList" :key="item.id">
          <router-link href="/">
            <img v-img-lazy="item.picture" alt="" :title="item.name">
            <div class="info">
              <p class="title">{{item.name}}</p>
              <p class="price"><span>¥</span>{{item.price}}</p>
            </div>
          </router-link>
        </li>
      </ul>
  </homePanel>
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

<style scoped lang="scss">
 ul{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      .item{
        width: 303px;
        height: 100%;
        background: #EEF9F4;
        img{
          width: 303px;
          height: 303px;
        }
        .info{
          text-align: center;
          .title{
            font-size: 20px;
            color: #333;
            margin: 10px;
            white-space: nowrap; /* 强制不换行 */
  overflow: hidden;    /* 溢出部分隐藏 */
  text-overflow: ellipsis; /* 溢出显示省略号... */
  width: 280px;
          }
          .price{
            font-size: 22px;
            color: $priceColor;
            span{
              font-size: 18px;
              margin-right: 5px;
            }
          }
        }
      }
    }
</style>