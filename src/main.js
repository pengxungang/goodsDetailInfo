import Vue from 'vue'
import VueRouter from 'vue-router'


// 注入全局过滤器
import Moment from 'moment'
Vue.filter('converTime',(value)=> {
  return Moment(value).format('YYYY-MM-DD')
})
Vue.filter('converTitle',(value,limit)=>{
  if(!value) return

  if(value.length>limit) {
    return value.substr(0,limit) + '...'
  }
  // 返回有数据
  return value
})

import Home from './components/Home/Home.vue'
import App from './components/App.vue'
import Member from './components/Member/Member.vue'
import Search from './components/Search/Search.vue'
import Shopcart from './components/Shopcart/Shopcart.vue'
import NewsList from './components/NewsList/NewsList.vue'
import ListDetail from './components/NewsList/ListDetail.vue'
import PhotoList from './components/Photo/PhotoList.vue'
import PhotoDetail from './components/Photo/PhotoDetail.vue'
// import Comment from './components/Commons/Comment.vue'
import GoodsList from './components/Goods/GoodsList.vue'
import GoodsDetail from './components/Goods/GoodsDetail.vue'


import MyUl from './components/Commons/MyUl.vue'
import MyLi from './components/Commons/MyLi.vue'
import NevBar from './components/Commons/NevBar.vue'
import Comment from './components/Commons/Comment.vue'
import MySwipe from './components/Commons/MySwipe.vue'
// 注入全局事件
Vue.component(MyUl.name, MyUl)
Vue.component(MyLi.name, MyLi)
Vue.component(NevBar.name,NevBar)
Vue.component(Comment.name,Comment)
Vue.component(MySwipe.name,MySwipe)


Vue.use(VueRouter)

// 创建路由
var router = new VueRouter
// 配置路由
router.addRoutes([
  // 重定向
  {path:'/',redirect:{name:'home'}},
  {name:'home',path:'/home',component:Home},//首页
  {name:'member',path:'/member',component:Member},//会员
  { name: 'shopcart', path: '/shopcart', component: Shopcart},//购物车
  { name: 'search', path: '/search', component: Search },//搜索
  {name:'news.list', path:'/news/list',component:NewsList},//新闻列表
  {name:'news.detail',path:'/news/detail',component:ListDetail},//列表详情
  {name:'photo.list',path:'/photo/list/:categoryId',component:PhotoList},//图片共享
  {name:'photo.detail',path:'/photo/detail/:imgId',component:PhotoDetail},//图片详情
  // {name:'test',path:"/test",component:Comment}
  {name:'goods.list',path:'/goods/list',component:GoodsList},//商品列表
  {name:'goods.detail',path:'/goods/detail/:goodsId',component:GoodsDetail}//商品详情
])

import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// MintUi开始
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUi)

import './static/css/global.css'

//Axios开始
import Axios from 'axios'
Vue.prototype.$axios = Axios
//拦截器中实现lodding图标
Axios.interceptors.request.use(config=>{
  MintUi.Indicator.open({
    text:'玩命加载中',
    spinnerType:'triple-bounce'
  })
  return config
})
Axios.interceptors.response.use(response=>{
  MintUi.Indicator.close()
  return response
})
Axios.defaults.baseURL = 'http://vue.studyit.io/api/'


new Vue({
  el:"#app",
  render:c=>c(App),
  router
})