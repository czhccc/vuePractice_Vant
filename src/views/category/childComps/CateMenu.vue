<template>
  <div class='CateMenu'>
    
    <van-sidebar v-model="currentIndex" @change="onChange(currentIndex)">
      <div v-for="(item, index) in categories" :key="index">
        <van-sidebar-item class="van-sidebar-item" :title="item.title" />
      </div>
    </van-sidebar>

  </div>
</template>

<script>
  import { Sidebar, SidebarItem } from 'vant';

  export default {
    name: 'CateMenu',
    components: {
      [Sidebar.name]: Sidebar,
      [SidebarItem.name]: SidebarItem
    },
    props: {
      categories: Array
    },
    data () {
      return {
        currentIndex: 0,
      };
    },
    methods: {
      onChange(currentIndex) {
        this.$emit('selectItem', currentIndex)
      }
    },
  }
</script>

<style scoped>
  .van-sidebar-item {
    text-align: center;
  }
</style>