<template>
  <div>

    <van-swipe class="my-swipe" v-if="banners.length" :autoplay="3000" indicator-color="white" :stop-propagation="false">
      <van-swipe-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img class="img" v-lazy="item.image" alt="" @load="imgLoad">
        </a>
      </van-swipe-item>
    </van-swipe>

  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'vant';

  export default {
    name: "HomeSwiper",
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false,
      }
    },
    methods: {
      imgLoad() { // 监听轮播图的图片加载完成之后，获取 offsetTop，用来计算商品切换栏（tabControl）下拉到什么时候才需要吸顶效果
        // 只需要一张图片加载完成即可，不需要执行四次发送事件，因此，用 isLoad 进行判断
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
  .my-swipe .van-swipe-item {
    width: 100%;
    height: 168px;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }

  .img {
    height: 168px;
    width: 100%;
  }

</style>