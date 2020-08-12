import {TOP_DISTANCE} from "./const";
import BackTop from 'components/content/backTop/BackTop'

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 1000)
    },
    showBackTop(position) {
      this.isShowBackTop = (-position.y) > TOP_DISTANCE
    }
  }
}