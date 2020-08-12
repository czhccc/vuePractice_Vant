<template>
  <div class="tab-control">
    <!-- 只是文字不一样，就没有必要使用插槽，而是只传入要显示的文字 -->
    <div class="tab-control-item" v-for="(item, index) in tabControl" :key="index"
         :class="{active: index === currentIndex}"
         @click="changeIndex(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      tabControl: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        currentIndex: 0
      }
    },
    methods: {
      changeIndex(index) {
        this.currentIndex = index
        this.$emit('tabClick', this.currentIndex)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>