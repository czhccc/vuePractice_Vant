<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item, index) in titles" :key="index"
               class="title-item"
               :class="{active: index==currentIndex}"
               @click="titleItemClick(index)">
            {{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navBar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0,
      }
    },
    methods: {
      titleItemClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },
      backClick() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .back {
    margin-top: 6px;
    margin-left: 8px;
  }

  .title {
    display: flex;
    padding: 0 6px;
  }

  .title-item {
    flex: 1;
    font-size: 14px;
  }

  .active {
    color: var(--color-high-text);
  }

  .title-item.active {
    color: var(--color-high-text)
  }
</style>