<template>
  <div class="container">
    <div class="header">
      <h3>{{title}}<span>{{subTitle}}</span></h3>
    </div>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
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
  }
}
</style>