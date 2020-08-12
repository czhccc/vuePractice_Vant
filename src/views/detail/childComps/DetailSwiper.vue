<template>
  <div>

    <van-swipe class="my-swipe" v-if="swiperImages.length" :autoplay="3000" indicator-color="white" :stop-propagation="false">
      <van-swipe-item v-for="(item, index) in swiperImages" :key="index">
        <img class="img" v-lazy="item" alt="">
      </van-swipe-item>
    </van-swipe>
    
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vant';

  export default {
    name: "DetailSwiper",
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem
    },
    props: {
      swiperImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
  }
</script>

<style scoped>
  .my-swipe .van-swipe-item {
    height: 330px;
    width: 100%;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }

  .img {
    height: 100%;
    width: 100%;
  }
</style>