<template>
  <div class="home">
    
    <nav-bar class="home-nav-bar"><template v-slot:center>购物街</template></nav-bar>

    <tab-control class="tab-control" :tabControl="tabControl" v-show="isTabControlFixed" @tabClick="tabClick" ref="tabControl1"/>

    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll" :pullUpLoad="true" @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!-- 推荐 -->
      <home-recommend :recommend="recommend" />
      <!-- 本周流行图片 -->
      <home-feature />
      <!-- tabControl -->
      <tab-control :tabControl="tabControl" @tabClick="tabClick" ref="tabControl2"/>
      <!-- 商品列表 -->
      <goods-list :goodsDate="goods[goodsType].list" />

    </scroll>

    <!-- 回到顶部 -->
    <back-top @click.native="backTop" v-show="isShowBackTop" />

  </div>
</template>

<script>

  import NavBar from "components/common/navBar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommend from "./childComps/HomeRecommend";
  import HomeFeature from "./childComps/HomeFeature";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goodsList/GoodsList";

  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import {debounce} from "common/utils";

  import {backTopMixin} from 'common/mixin'

  import {getHomeMultiData, getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    mixins: [backTopMixin], // 回到顶部按钮
    data() {
      return {
        tabControl: ['流行', '新款', '精选'], // tabControl中要展示的文字
        banners: [], // 轮播图的数据
        recommend: [], // 推荐的数据
        goods: { // 展示的商品的数据结构，page记录当前请求的页数，list存放请求到的数据
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        goodsType: 'pop', // 当前的商品数据的类型，默认为 'pop'
        tabControlTop: 0, // 记录滚动的位置，判断商品切换栏(tabControl)下拉到什么时候才有吸顶效果
        isTabControlFixed: false, // 记录商品切换栏(tabControl)是否吸顶效果
        saveY: 0 // 记录离开首页时的位置
      }
    },
    created() {
      // 1.请求多个数据
      this.getMultiData()

      // 2.请求展示的商品的数据
      this.getGoodsData('pop') // 请求'流行'相关数据
      this.getGoodsData('new') // 请求'新款'相关数据
      this.getGoodsData('sell') // 请求'精选'相关数据
    },
    mounted() {
      /* 图片加载完成后 better-scroll 刷新内容高度 */
      // 使用防抖函数防止图片加载后的刷新过于频繁
      // 监听item中图片的加载完成 采用事件总线的方式，由 GoodsListItem组件 emit 事件，在这里进行接收
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('homeItemImageLoad', () => {
        refresh()
      })
    },
    activated() {
      this.$refs.scroll.scrollTo(0, -this.saveY, 10)
      this.$refs.scroll.refresh() // 刷新 better-scroll
    },
    deactivated() {
      this.saveY = -this.$refs.scroll.scroll.y
      // this.saveY = -this.$refs.scroll.scrollY // 不要使用封装的scrollY，而是直接获取，否则会有回到顶部的bug
    },
    methods: {
      /*
      网络请求相关的方法
       */
      getMultiData() { // 请求多个数据
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list // 保存轮播图的数据
          this.recommend = res.data.recommend.list // 保存推荐的数据
        })
      },
      getGoodsData(type) { // 请求展示的商品的数据
        const page = this.goods[type].page + 1 // 请求下一页的数据，因此先取得下一页的页码
        getHomeGoods(type, page).then(res => { // 发送请求，获取数据
          this.goods[type].list.push(...res.data.list) // 将请求到的数据保存
          this.goods[type].page += 1 // 数据获取完成后，当前的页码需要+1

          this.$refs.scroll.finishPullUp() // 完成上拉加载更多后，刷新 better-scroll
        })
      },
      /* 监听轮播图的图片加载完成之后，获取 offsetTop，用来计算商品切换栏（tabControl）下拉到什么时候才需要吸顶效果
          接收 HomeSwiper 组件中发出的事件，确保轮播图的图片加载完成后再获取 offsetTop
            因为轮播图的图片比较大，因此，轮播图的图片加载完成时，其他的小图片也应当也已经加载完成，所以只需要监听轮播图的图片加载完成即可 */
      swiperImageLoad() {
        // 获取 offsetTop 不能在 mounted() 生命周期函数中进行，因为图片还没加载完成，获取的 offsetTop 是不包括图片的
        // 每个组件都有 $el 属性，用于获取组件中的元素
        this.tabControlTop = this.$refs.tabControl2.$el.offsetTop
      },

      /*
      事件监听相关的方法
       */
      tabClick(index) { // 改变展示的商品的类型
        switch (index) {
          case 0:
            this.goodsType = 'pop';break;
          case 1:
            this.goodsType = 'new';break;
          case 2:
            this.goodsType = 'sell';break;
        }

        //  2个tabControl保持一致
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() { // 右下角按钮返回顶部
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) { // 监听滚动的位置
        this.isTabControlFixed = (-position.y) > this.tabControlTop // 判断商品切换栏(tabControl)是否要吸顶效果(position: fixed)
        this.showBackTop(position) // 是否显示 backTop 按钮
      },
      loadMore() { // 上拉加载更多
        this.getGoodsData(this.goodsType) // 给当前的类型的商品请求新的数据
      }
    }
  }
</script>

<style scoped>
  .home {
    height: 100vh;
    position: relative;
  }

  .home-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }

  /* 因为tab-control的父元素content为 overflow: hidden，所以sticky属性不能起作用 */
  /* .tab-control {
    position: sticky;
    top: 45px;
  } */
  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden; 
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>