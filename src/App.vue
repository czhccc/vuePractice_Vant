<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <tabBar />
  </div>
</template>

<script>
import tabBar from "./components/content/tabBar/tabBar";

export default {
  name: 'App',
  components: {
    tabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
