<template>
  <div>
    <GoodsList :goodsDate="goodsList" />
  </div>
</template>

<script>
  import GoodsList from 'components/content/goodsList/GoodsList'

  export default {
    name: "CateGoodsList",
    components: {
      GoodsList,
    },
    props: {
      goodsList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
