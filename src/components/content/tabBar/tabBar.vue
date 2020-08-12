<template>
  <div id="main-tab-bar">
    
    <van-tabbar route v-model="active" active-color="#ff5777">
      <van-tabbar-item replace to="/home" icon="home-o">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? require('@/assets/img/tabbar/home_active.svg') : require('@/assets/img/tabbar/home.svg')" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="search">
        <span>分类</span>
        <template #icon="props">
          <img :src="props.active ? require('@/assets/img/tabbar/category_active.svg') : require('@/assets/img/tabbar/category.svg')" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="friends-o" :badge="cartCount">
        <span>购物车</span>
        <template #icon="props">
          <img :src="props.active ? require('@/assets/img/tabbar/shopcart_active.svg') : require('@/assets/img/tabbar/shopcart.svg')" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item  replace to="/profile" icon="setting-o">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? require('@/assets/img/tabbar/profile_active.svg') : require('@/assets/img/tabbar/profile.svg')" />
        </template>
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vant';

  import {mapGetters} from 'vuex'

  import {cartLength} from 'vuex'

  export default {
    name: "MainTabBar",
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem
    },
    data() {
      return {
        active: 0,
      }
    },
    computed: {
      cartCount() { // 用于显示购物车的商品数量
		    return this.$store.getters.cartLength
      }
    },
  }
</script>

<style scoped>

</style> 