<template>
  <div>
    <homePanel title="人气推荐" subTitle="人气推荐 品质靠谱">
      <ul>
        <li class="item" v-for="item in hotGoodsList" :key="item.id">
          <router-link to="/">
            <img :src="item.picture" alt="" :alt="item.alt">
            <div class="info">
              <p class="title">{{item.title}}</p>
              <p class="desc">{{item.alt}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </homePanel>
  </div>
</template>

<script setup>
import homePanel from '@/views/Home/components/homePanel.vue'
import { getHotGoodsList } from '@/apis/index'
import { onMounted,ref } from 'vue'
const hotGoodsList = ref([])
onMounted(() => {
  getHotGoodsList().then(res => {
    // console.log(res)
    hotGoodsList.value = res.result
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
          .desc{
            font-size: 16px;
            color: #a1a1a1;
          }
        }
      }
    }
</style>