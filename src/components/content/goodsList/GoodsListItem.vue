<template>
  <div class="goods-list-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goods.title}}</p>
      <span class="price">{{goods.price}}</span>
      <span class="collect">{{goods.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goods.img || this.goods.image || this.goods.show.img
      }
    },
    methods: {
      imageLoad() {
        // GoodsListItem 组件 与 Home 组件 之间的层级嵌套不方便进行交互
        // 因此这里采用事件总线的方式，使 GoodsListItem 组件 与 Home 组件 之间进行事件交互，在 Home 组件 中接收事件
        if(this.$route.path.indexOf('/home') != -1) {
          this.$bus.$emit('homeItemImageLoad')
        } else {
          this.$bus.$emit('detailItemImageLoad')
        }
         // 需要先在 main.js 文件中定义事件总线
      },
      itemClick() {
        this.$router.push('/detail/' + this.goods.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-list-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-list-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>