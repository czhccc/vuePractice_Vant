<template>
  <div class="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar class="detail-nav-bar" ref="navBar" @titleClick="titleClick"/>

    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <!-- 轮播图 -->
      <detail-swiper ref="swiper" :swiperImages="swiperImages"/>
      <!-- 商品基础信息 -->
      <detail-base-info :goods="goods"/>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"/>
      <!-- 商品详情信息 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <!-- 商品参数信息 -->
      <detail-param-info ref="param" :paramInfo="paramInfo"/>
      <!-- 用户评价信息 -->
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <!-- 推荐商品 -->
      <goods-list ref="recommend" :goodsDate="recommends"/>
    </scroll>

    <!-- 回到顶部按钮 -->
    <back-top class="back-top" @click.native="backTop" v-show="isShowBackTop" />

    <!-- 购物车栏 -->
    <detail-bottom-bar @addCart="addGoodsToCart" />

  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goodsList/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";

  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail";

  import { debounce } from "common/utils";

  import { backTopMixin } from 'common/mixin'

  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar
    },
    mixins: [backTopMixin], // 回到顶部按钮
    data() {
      return {
        iid: null, // 从主页跳转所携带的信息
        swiperImages: [], // 轮播图的图片
        goods: {}, // 商品信息
        shop: {}, // 店铺信息
        detailInfo: {}, // 商品的详情信息
        paramInfo: {}, // 参数的信息
        commentInfo: {}, // 评论的信息
        recommends: [], // 推荐商品的信息

        themeTopYs: [], // 每一个模块对应的Y值
        getThemeTopYs: null, // 防抖的对应模块跳转函数
        currentIndex: 0, // 记录当前的模块的index
      }
    },
    created() {
      this._getGoodsData() // 获取商品的数据
      this._getRecommendData() // 获取推荐商品的数据
      this._getOffsetTops() // 获取总的offsetTop，用于顶部导航栏的跳转
    },
    mounted() {
      this._refresh() // 图片加载完成后 better-scroll 刷新内容高度
    },
    methods: {
      ...mapActions(['addToCart']),
      _getGoodsData() { // 获取数据
        // 保存传入的iid
        this.iid = this.$route.params.iid

        // 根据 iid 请求商品数据
        getDetail(this.iid).then(res => {
          const data = res.result
          this.swiperImages = data.itemInfo.topImages // 保存轮播图的图片
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services) // 保存商品信息
          this.shop = new Shop(data.shopInfo) // 保存店铺信息
          this.detailInfo = data.detailInfo // 保存商品的详情信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule) // 保存参数信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0] // 保存评论信息
          }
        })
      },
      _getRecommendData() { // 获取商品推荐的数据
        getRecommend().then(res => {
          this.recommends = res.data.list
        })
      },
      _getOffsetTops() { // 获取总的offsetTop，用于顶部导航栏的跳转
        this.getThemeTopYs = debounce(() => {
          // .content { height: calc(100% - 44px); } // calc属性会影响到顶部导航栏的跳转，这里需要 -44 px
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop-44)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
        }, 60)
      },
      _refresh() { // 图片加载完成后 better-scroll 刷新内容高度
        // 使用防抖函数防止图片加载后的刷新过于频繁
        const refresh = debounce(this.$refs.scroll.refresh, 50)
        // 监听item中图片的加载完成 采用事件总线的方式，由 GoodsListItem组件 emit 事件，在这里进行接收
        this.$bus.$on('detailItemImageLoad', () => {
          refresh()
        })
      },
      imageLoad() { // 监听图片加载完成
        this.$refs.scroll.refresh() // 图片加载完成后刷新better-scroll
        this.getThemeTopYs() // 图片加载完成后获取总的offsetTop，用于顶部导航栏的跳转
      },
      titleClick(index) { // 根据navbar的按钮跳转到相应的位置
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) { // 监听滚动
        // 获取 Y 值
        const positionY = -position.y
        let length = this.themeTopYs.length;
        for (let i = 0; i < length; i++) {
          if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i===length-1 && positionY>=this.themeTopYs[i]))) {
            this.currentIndex = i;
            this.$refs.navBar.currentIndex = this.currentIndex
          }
        }

        this.showBackTop(position) // 是否显示 backTop 按钮
      },
      addGoodsToCart() { // 接收ButtomBar加入购物车按钮发出的事件，将商品添加到购物车
        const product = {}
        product.image = this.swiperImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 映射action后，直接调用action中的addToCart方法，将商品加入购物车
        this.addToCart(product)
      }
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;

    height: 100vh;
    padding-bottom: 60px;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }

  .back-top {
    margin-bottom: 15px;
  }

</style>