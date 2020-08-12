import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

Vue.config.productionTip = false

// 懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
  loading: require("./assets/img/common/placeholder.png")
});

// 用fastclick库解决移动端300ms延迟问题
import FastClick from 'fastclick'
FastClick.attach(document.body)

Vue.prototype.$bus = new Vue() // new 一个 Vue 实例，作为事件总线

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
