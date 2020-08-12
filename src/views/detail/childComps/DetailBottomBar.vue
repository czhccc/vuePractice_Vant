<template>
  <div class="bottom-bar">

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="onClickIcon1" text="客服" dot color="#07c160" />
      <van-goods-action-icon icon="shop-o" @click="onClickIcon2" text="店铺" />
      <van-goods-action-icon icon="star" @click="onClickIcon3" text="收藏" :color="isStared ? '#ff5000' : '#A9A9A9'" />
      <van-goods-action-button type="warning" @click="onClickButton1" text="加入购物车" />
      <van-goods-action-button type="danger" @click="onClickButton2" text="立即购买" />
    </van-goods-action>

  </div>
</template>

<script>
  
  import { GoodsAction, GoodsActionIcon, GoodsActionButton, Toast } from 'vant';

	export default {
		name: "DetailBottomBar",
    components: {
      [GoodsAction.name]: GoodsAction,
      [GoodsActionIcon.name]: GoodsActionIcon,
      [GoodsActionButton.name]: GoodsActionButton,
      [Toast.name]: Toast,
    },
    data() {
      return {
        isStared: false
      }
    },
    methods: {
      onClickIcon1() {
        Toast('点击客服图标');
      },
      onClickIcon2() {
        Toast('点击店铺图标');
      },
      onClickIcon3() {
        this.isStared = !this.isStared
        if (this.isStared) {
          Toast('收藏成功');
        } else {
          Toast('取消收藏');
        }
      },
      onClickButton1() {
        Toast('已成功加入购物车');
        this.$emit('addCart')
      },
      onClickButton2() {
        Toast('点击立即购买按钮');
      },
    }
	}
</script>

<style scoped>

</style>
