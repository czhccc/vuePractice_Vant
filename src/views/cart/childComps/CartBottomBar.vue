<template>
  <div class="bottom-bar">

    <van-submit-bar class="van-submit-bar" :price="totalPrice" button-text="提交订单" 
                    :loading="isLoading ? true : false"
                    :disabled="isDisabled ? true : false"
                    @submit="onSubmit">
      <check-button class="check-button" :isChecked="isSelectAll" @click.native="checkClick"/>
      <span class="text">全选</span>
    </van-submit-bar>

  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import { SubmitBar, Toast } from 'vant';

  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

	export default {
		name: "BottomBar",
    components: {
      CheckButton,
      [SubmitBar.name]: SubmitBar,
      [Toast.name]: Toast
    },
    data() {
      return {
        checked: '',
        theTotalPrice: 0,
        isLoading: false,
      }
    },
    computed: {
      ...mapGetters(['cartList', 'cartLength']),
      // 计算总价格
      totalPrice() { 
        return Number(this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2))*100
      },
      // 是否全部选中
      isSelectAll() { 
        if(this.cartLength === 0) { // 如果购物车中没有商品，则返回 false
          this.isDisable = true
          return false
        }
        return !this.cartList.find(item => !item.checked) // 如果有不被选中的商品，则返回 false
      },
      // 判断是否禁用 提交订单 按钮
      isDisabled() {
        return !this.cartList.find(item => item.checked)
      }
    },
    methods: {
      ...mapActions(['outFromCart']),
      // 点击 购买订单 按钮
      onSubmit() {
        this.isLoading = true
        setTimeout(() => {
          this.isLoading = false
          Toast('购买成功');
          const allGoods = this.cartList
          const selectedGoodsiid = []
          allGoods.forEach((item, index) => {
            if(item.checked) {
              const theiid = item.iid
              selectedGoodsiid.push(theiid)
            }
          })
          this.outFromCart(selectedGoodsiid)
        }, 2000)
      },
      checkClick() {
        if(this.isSelectAll) { // 如果商品全部被选中
          this.cartList.forEach(item => item.checked = false)
        } else { // 商品 全部不选中 或者 部分不选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
    },

	}
</script>

<style scoped>
  .van-submit-bar {
    margin-bottom: 50px;
  }

  .bottom-bar .check-button {
    margin-top: 4px;
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .text {
    margin-top: 4px;
    margin-left: 20px;
  }
</style>
