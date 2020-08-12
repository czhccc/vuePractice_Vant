<template>
  <div class="cart-list">
    <scroll class="content" :data="[cartList]" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :goodsData="item" />
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

  import {mapGetters} from 'vuex'

	export default {
		name: "CartList",
    components: {
		  Scroll,
      CartListItem
    },
    computed: {
		  ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh() // 进入时重新刷新better-scroll，否则bette-scroll不知道添加了新数据
    }
	}
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 44px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
