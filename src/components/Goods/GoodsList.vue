<template>
  <div :style="'height:' + height">
    <nev-bar title="商品列表"></nev-bar>
  <mt-loadmore :bottom-method="loadBottom" ref="loadmore" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded">
  

    <ul ref="ul">
      <li v-for="goods in goodsList" :key="goods.id">
        <router-link :to="{name:'goods.detail',params:{goodsId:goods.id}}">
           <img :src="goods.img_url">
            <div class="title">{{goods.title|converTitle(25)}}</div>
            <div class="desc">
            <div class="sell">
               <span>￥{{goods.sell_price}}</span>
                  <s>￥{{goods.market_price}}</s>
                 </div>
             <div class="detail">
            <div class="hot">
                热卖中
              </div>
              <div class="count">
                   剩{{goods.stock_quantity}}件
                 </div>
                </div>
         </div>
    </router-link>
      </li>
    </ul>
    </mt-loadmore>
  </div>
</template>
<script>
export default {
  props:['appRefs'],
  data: function() {
    return {
      goodsList: [],
      isAutoFill:false, //是否自动检测，并调用loadBototm
      allLoaded:false,//数据是否全部加载完毕，如果是，禁止函数调用
      page:1,
      height:''
    };
  },
  methods:{
    //触发上啦刷新
   loadBottom() {
     this.$axios.get(`getgoods?pageindex=${this.page}`)
     .then(res=>{
      //  判断是否还有数据
      if(res.data.message.length == 0) {
        this.$toast({
           message: '提示:没有更多数据了',
           duration: 2000,
            
        })
        this.allLoaded = true// 若数据已全部获取完毕
        // return
      }
      // 追加下一页内容
        this.goodsList = this.goodsList.concat(res.data.message)
        //自增
        this.page ++
        //从loading状态通知回到pull初始状态
        this.$refs.loadmore.onBottomLoaded()
     })
     .catch(err=>console.log(err))
},
  changeHeight:function() {//改变父盒子的高
    this.height = document.documentElement.clientHeight -
    this.appRefs.header.$el.offsetHeight
  }
  },
  mounted:function() {
    this.changeHeight()
  },
  created() {
    this.page = this.$route.query.page || 1;
    this.$axios.get(`getgoods?pageindex=${this.page}`).then(res => {
      this.goodsList = res.data.message;

      this.page++;
    });
  }
};
</script>
<style scoped>

ul {
    overflow: hidden;
}
li {
    width: 50%;
    float: left;
    padding: 6px;
    box-sizing: border-box;
}


li > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
    width: 100%;
    display: block;


}

li > a:not(.mui-btn) img {
     width: 100%;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

img {
    height: 200px;
}
</style>
