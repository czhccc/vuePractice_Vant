<template>
  <div class='profileTop'>
    <div class="middle">
      <div class="avatar">
        <img src="~/assets/img/profile/avatar.svg" alt="">
      </div>
      <div class="login">
        <span>登录 / 注册</span>
      </div>
      <div class="phone">
        <img src="~/assets/img/profile/phone.svg" alt="">
        <span>暂无绑定手机号</span>
      </div>
      <div class="arrow">
        》
      </div>
    </div>
    
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

  </div>
</template>

<script>
  export default {
    name: 'ProfileTop',
    components: {

    },
    data () {return {};},
    computed: {},
    methods: {},
  }
</script>

<style scoped>
  .middle {
    position: relative;
    color: white;
    background-color: var(--color-tint);
    height: 90px;
  }
  .avatar {
    position: relative;
  }
  .avatar img {
    width: 70px;
    height: 70px;
    position: absolute;
    left: 20px;
    top: 10px;
  }
  .login span {
    position: absolute;
    margin-left: 95px;
    margin-top: 25px;
  }
  .phone img {
    width: 25px;
    height: 20px;
    position: absolute;
    margin-left: 88px;
    margin-top: 50px;
  }
  .phone span {
    font-size: 13px;
    position: absolute;
    margin-left: 110px;
    margin-top: 53px;
  }
  .arrow {
    position: absolute;
    margin-left: 290px;
    margin-top: 36px;
  }

  .account {
    display: flex;
  }
  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }
  .account-item:last-of-type {
    margin-right: 0;
  }
  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }
  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }
  .account-info {
    margin-top: 6px;
  }
</style>