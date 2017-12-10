<template>
  <div>
    <div class="pay-detail">
      <ul>
        <li class="p-list" v-for="goods in shopcart" :key="goods.id">
          <mt-switch v-model="goods.isSelected"></mt-switch>
          <img :src="goods.thumb_path">
          <div class="pay-calc">
            <p>{{goods.title}}</p>
            <div class="calc">
              <span>￥{{goods.sell_price}}</span>
              <span @click="jian(goods)">-</span>
              <span>{{goods.pickNum}}</span>
              <span @click="add(goods)">+</span>
              <a href="javascript:;" @click="del">删除</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="show-price">
      <div class="show-1">
        <p>总计(不含运费):</p>
        <span>已经选择商品{{payment.count}}件，总价￥{{payment.total}}元</span>
      </div>
      <div class="show-2">
        <mt-button type="danger" size="large">去结算</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import GoodsTools from '../Commons/GoodsTools.js'
import VueBus from '../Commons/VueBus.js'
  export default{
    beforeRouteLeave (to, from, next) {
      if(confirm('亲，你真的要离开吗？')) {
        //保存当前数据到本地存储
        GoodsTools.saveArr(this.shopcart)
        VueBus.$emit('changeTotalCount',GoodsTools.getTotalCount())
        next()
      }else{
        next(false)
      }
    },
    data:function(){
      return {
        shopcart:[],//购物车
      }
    },
    computed:{
      payment:function() {
        let count = 0
        let total = 0
        //遍历数组
        this.shopcart.forEach(ele=>{
          if (ele.isSelected) {
            count += ele.pickNum //统计数量
            total += ele.pickNum * ele.sell_price //金额
          }
          
        })
        return {
            count,total
          }
      }
    },
    created() {
      //获取工具对象中的goodsObj
      let goodsObj = GoodsTools.getGoods()
      //取出url中的ids
      let ids = Object.keys(goodsObj).join(',')
      //拼接URL
      let url = `goods/getshopcarlist/${ids}`
      // console.log(url)
      this.$axios.get(url)
      .then(res=>{
        this.shopcart = res.data.message
       this.shopcart.forEach(ele => {
          this.$set(ele,'pickNum',goodsObj[ele.id])
          this.$set(ele,'isSelected',true)
        });

      }).
      catch(err=>{
        console.log(err)
      })
    },
    methods:{
      jian:function(obj) {
        obj.pickNum --
        if(obj.pickNum < 0) {
          this.$toast({
           message: '去你妈的',
           duration: 2000,
        })
        obj.pickNum = 0
        }
      },
      add:function(obj) {
        // console.log('执行啦')
        obj.pickNum ++
      },
      del:function(obj) {
        if(confirm('亲，真的要删除吗(*╹▽╹*)')) {
          //找元素索引
          let index = this.shopcart.findIndex(ele => ele.id == obj.id)
          //删除
          this.shopcart.splice(index,1)
        }
      }
    }
  }
</script>
<style scoped>
  .pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
  }
  
  .pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
  }
  
  .pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
  }
  
  .pay-detail ul li > :nth-child(1),
  .pay-detail ul li > :nth-child(3) {
    display: inline-block;
  }
  
  .pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
  }
  
  .pay-detail ul li > :nth-child(1) {
    line-height: 80px;
  }
  
  .calc:nth-child(1) {
    color: red;
    font-size: 20px;
  }
  
  .calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
  }
  
  .calc a {
    margin-left: 20px;
  }
  
  .show-1,
  .show-2 {
    display: inline-block;
  }
  
  .show-1,
  .show-2 {
    margin-left: 30px;
  }
  
  .show-price {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
