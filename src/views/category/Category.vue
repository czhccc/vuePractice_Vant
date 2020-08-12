<template>
  <div class="category">

    <nav-bar class="category-nav-bar"><template v-slot:center>商品分类</template></nav-bar>
    <div class="content">
      <Scroll>
        <CateMenu :categories="categories" @selectItem="selectItem" />
      </Scroll>

      <Scroll class="scroll" ref="scroll">
        <CateGrid :subcategories="showSubcategory" />
        <TabControl :tabControl="['流行', '新品', '销量']" @tabClick="tabClick" />
        <CateGoodsList :goodsList="showCategoryDetail" />
      </Scroll>
    </div>

  </div>
</template>

<script>

  import NavBar from 'components/common/navBar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  import CateMenu from './childComps/CateMenu'
  import CateGrid from './childComps/CateGrid'
  import TabControl from 'components/content/tabControl/TabControl'
  import CateGoodsList from './childComps/CateGoodsList'
  
  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";

  import {debounce} from "common/utils";

  export default {
    name: "Category",
    components: {
      NavBar,
      CateMenu,
      Scroll,
      CateGrid,
      TabControl,
      CateGoodsList
    },
    data() {
      return {
        categories: [], // Menu的文字
        categoryData: {}, // 分类的数据，这里需要注意数据结构
        currentIndex: -1, // Menu的当前下标
        currentType: '', // 当前tabControl的种类
      }
    },
    computed: {
      showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    created() {
      this._getCategory() // 请求分类数据
    },
    mounted() {
      /* 图片加载完成后 better-scroll 刷新内容高度 */
      // 使用防抖函数防止图片加载后的刷新过于频繁
      // 监听item中图片的加载完成 采用事件总线的方式，由 GoodsListItem组件 emit 事件，在这里进行接收
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('detailItemImageLoad', () => {
        refresh()
      })
    },
    methods: {
      /* 事件监听 */
      selectItem(index) {
        this._getSubcategories(index)
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
      },

      /* 网络请求 */
      _getCategory() {
		    getCategory().then(res => {
		      // 获取分类数据
		      this.categories = res.data.category.list
          // 初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 请求第一个分类的数据，初始化
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail('pop')
          this._getCategoryDetail('new')
          this._getCategoryDetail('sell')
        })
      },
      _getCategoryDetail(type) {
        this.currentType = type
		    // 获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
    },
  }
</script>

<style scoped>
  .category {
    margin-top: 44px;
  }

  .category-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    font-weight: 700;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  .scroll {
    height: 100%;
    flex: 1;
  }
</style>