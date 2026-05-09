<template>
  <div class="container">
    <div class="header">
      <h3>{{title}}<span>{{subTitle}}</span></h3>
    </div>
    <div class="body">
      <ul>
        <li class="item" v-for="item in goodsList" :key="item.id">
          <a href="/">
            <img :src="item.picture" alt="" :title="item.name">
            <div class="info">
              <p class="title">{{item.name}}</p>
              <p class="price"><span>¥</span>{{item.price}}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  goodsList: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.container{
  
 padding-top: 10px;
  .header{
    margin: 20px 0;
    h3{
      font-size: 30px;
      color: #333;
      span{
        font-size: 16px;
        color: #c1c1c1;
        margin-left: 20px;
        font-weight: 400;
      }
    }
  }
  .body{
    width: 100%;
    height: 404px;
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
  }
}
</style>