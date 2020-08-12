<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: { // 用于判断是否需要实时监听滚动的位置
        type: Number,
        default: 0
      },
      click: {
        type: Boolean,
        default: true
      },
      pullUpLoad: { // 是否需要上拉加载更多
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      // 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: this.click,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position)
        })
      }

      // 监听上拉事件
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    computed: {
      
    },
    methods: {
      /* 注意：Home页面不要使用封装的scrollY()方法，而是直接获取，否则会有返回Home页面时回到顶部的bug */
      // 用于Home.vue中获取离开页面时记录的Y值
      // scrollY() {
      //   return this.scroll.y
      // },
      // 返回顶部
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      // 完成上拉
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      // 刷新
      refresh() {
        this.scroll && this.scroll.refresh()
      },
    }
  }
</script>

<style scoped>

</style>