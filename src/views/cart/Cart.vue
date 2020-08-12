<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>购物车({{length}})</template>
    </nav-bar>
    <cart-list class="cart-list" />
    <cart-bottom-bar />
  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters({
        length: 'cartLength'
      })
    },


  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>