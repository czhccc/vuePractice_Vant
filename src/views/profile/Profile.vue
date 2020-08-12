<template>
  <div class="profile">

    <nav-bar class="profile-nav-bar"><template v-slot:center>我的信息</template></nav-bar>
    <ProfileTop />
    <ProfileList :list-data="orderList" class="order-list" />
    <ProfileList :list-data="serviceList" class="service-list" />
    
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar'
  import ProfileTop from './childComps/ProfileTop'
  import ProfileList from './childComps/ProfileList'

  import TabControl from "components/content/tabControl/TabControl";

  export default {
    name: "Profile",
    components: {
      NavBar,
      ProfileTop,
      ProfileList,
      TabControl
    },
    data() {
      return {
        orderList: [
          {icon: '#order', icon: require('../../assets/img/profile/message.svg'), info: '我的消息'},
          {icon: '#point', icon: require('../../assets/img/profile/shopping.svg'), info: '积分商城'},
          {icon: '#vip', icon: require('../../assets/img/profile/vip.svg'), info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', icon: require('../../assets/img/profile/cart.svg'), info: '我的购物车'},
          {icon: '#download', icon: require('../../assets/img/profile/pointer.svg'), info: '下载购物APP'},
        ]
      }
    }
  }
</script>

<style scoped>
  .profile {
    padding-top: 44px;
    margin-bottom: 50px;
  }

  .profile-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    font-weight: 700;
  }

  .tab-control {
    position: sticky;
    top: 60px;
  }
</style>