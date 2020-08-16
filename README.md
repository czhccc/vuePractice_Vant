# myvue

真实项目接口请自行联系老师微信coderwhy001

模仿coderwhy王红元老师的Vue商城项目

将之前的写的项目使用vant进行重构
并且：

1. 完成视频中的内容

   

2. 解决轮播图bug，不能进行轮播的问题

   ​	原因：数据没有请求到时，轮播图相关内容已经进行渲染

   ​	解决方法：在<Swiper>组件中添加：v-if="banners.length"

   

3. 解决Home页面离开返回后不会停留在原来位置的问题（尝试20+次，没有再出现bug）

   ​	原因：未知

   ​	解决方法：在deactivated()生命周期函数中记录离开时的Y值时，不要像视频中一样进行封装，而是直接获取
   
   ​		正确：this.saveY = -this.$refs.scroll.scroll.y
   
   ​		错误：this.saveY = -this.$refs.scroll.scrollY （scrollY为Scroll.vue中的方法：scrollY() {return this.scroll.y}）

   

4. 修复商品详情页面顶部导航栏跳转位置不准确的问题

   ​	原因：css .content { height: calc(100% - 44px); } calc属性会影响到顶部导航栏的跳转，计算元素的 offsetTop 属性时需要 -44 px

   

5. 增加购物车中视频数量的角标，并完成购物车中订交订单按钮的相应逻辑：选中的商品点击提交订单按钮后从购物车中移除

   

6. 使用图片懒加载


7. 完善部分细节



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
