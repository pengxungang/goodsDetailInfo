<template>
  <div>
    <mt-header title="34期信息库" ref="header"> </mt-header>
    <transition name="rv" mode="out-in">
      <router-view class="tmpl" :appRefs="$refs"></router-view>
    </transition>
    
    <mt-tabbar v-model="selected" ref="footer">
      <mt-tab-item id="home">
        <img slot="icon" src="../static/img/index.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="member">
        <img slot="icon" src="../static/img/vip.png">
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img slot="icon" src="../static/img/shopcart.png">
        购物车<mt-badge type="error" size="small">{{num}}</mt-badge>
      </mt-tab-item>
      <mt-tab-item id="search">
        <img slot="icon" src="../static/img/find.png">
        查找
      </mt-tab-item>
  </mt-tabbar>

  </div>
</template>
<script>
 import GoodsTools from './Commons/GoodsTools.js';
 import VueBus from './Commons/VueBus.js'
export default {
  created() {
    //加减小球数量
    VueBus.$on('addShopcart',pickNum=>{
      this.num += pickNum
    })
    //更改小球数量
    VueBus.$on('changeTotalCount',num=>{
      this.num = num
    })
  },
  data:function() {
    return {
      selected:'',
      num:GoodsTools.getTotalCount()//获取商品总数
    }
  },
  watch:{
    selected(newV){
      // console.log(newV)
      // 让锚点值改变
      this.$router.push({
        name:newV
      })
    }
  }
}
</script>
<style scoped>
  .rv-enter-active,.rv-leave-active {
    transition: opacity .5s
  }
  .rv-enter,.rv-leave-to {
    opacity: 0;
  }
  .mint-tabbar {
    position: fixed;
    bottom: 0;
    margin-top: 55px;
  }

</style>
