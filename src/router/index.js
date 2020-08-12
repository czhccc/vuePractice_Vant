// 1.导入 路由 和 组件
import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Detail = () => import('../views/detail/Detail')
const Cart = () => import('../views/cart/Cart' )
const Profile= () => import('../views/profile/Profile')

// 2.通过Vue.use(插件)，安装插件
Vue.use(VueRouter)

// 3.创建VueRouter对象
const routes = [ // 将路由定义抽出
  {
    path: '',
    redirect: '/home' // 重定向
  },
  {
    path: '/home', // path是URL显示的路径
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/detail/:iid',
    component: Detail
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]
const router = new VueRouter({
  // 4.配置路由和组件之间的应用关系
  routes,
  mode: 'history' // 改变路径的方式为H5的history模式，默认为URL的hash模式
})

// 5.导出
export default router