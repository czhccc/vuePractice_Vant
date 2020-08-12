<template>
    <div id="list">
      <div v-for="(item, index) in listData" :key="index" class="item">
        <span class="icon">
          <img :src="item.icon" alt="">
        </span>
        <div class="info">{{item.info}}</div>
      </div>
    </div>
</template>

<script>
	export default {
		name: "ListView",
    props: {
		  listData: {
		    type: Array,
        default: function () {
          return []
        }
      }
    }
	}
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
    border-top: thick solid rgb(236, 236, 236);
    border-width: 12px;
  }

  #list .item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }

  .icon img {
    width: 18px;
    height: 18px;
  }

  .item .icon {
    margin-top: 10px;
    position: absolute;
    left: 16px;
    top: -7px;
  }

  .item .info {
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
  }

  .item:last-of-type .info {
    border-bottom: none;
  }
</style>
