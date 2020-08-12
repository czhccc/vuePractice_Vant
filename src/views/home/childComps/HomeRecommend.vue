<template>
  <div class="home-recommend">
    <van-grid :border="false" icon-size="60" >
      <van-grid-item v-for="(item, index) in recommend" :key="index" class="item"
                     :icon="item.image" 
                     :text="item.title" 
                     :url="item.link" />
    </van-grid>
  </div>
</template>

<script>
  import { Grid, GridItem } from 'vant';

  export default {
    name: "HomeRecommend",
    components: {
      [Grid.name]: Grid,
      [GridItem.name]: GridItem
    },
    props: {
      recommend: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>

</style>