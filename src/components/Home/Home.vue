<template>
  <div>
    <my-swipe url="getlunbo"></my-swipe>

    <!-- 九宫格 -->
    <my-ul>
      <my-li v-for="(router,index) in routerPic" :key="index">
        <router-link :to="router.routers">
          <div :class="'pic '+ router.className">
            {{router.title}}
          </div>
        </router-link>
      </my-li>
    </my-ul>
  </div>
</template>
<script>
  export default {
     
    data:function() {
      return {
       imgs:[],
       
       routerPic:[{
         className:'news',
         title:'新闻列表',
         routers:{name:'news.list'}
       },{
         className:'photo',
         title:'图文分享',
         routers:{name:'photo.list',params:{categoryId:0}}
       },{
         className:'goodslist',
         title:'商品列表',
         routers:{name:'goods.list',query:{page:1}}
       },{
         className:'feedback',
         title:'留言反馈',
         routers:{name:'news.list'}
       },{
         className:'search',
         title:'所搜咨询',
         routers:{name:'news.list'}
       },{
         className:'callme',
         title:'联系我们',
         routers:{name:'news.list'}
       }]
      }
    }
   }
</script>
<style scoped>

  /*九宫格样式  */
 
  ul li a {
    display: block;
  }

 


  .pic{
    background-size: 50px;
        background-repeat: no-repeat;
        background-position: 40px 35px;  
        font-size: 20px;
    font-family: 'Microsoft YaHei';
    color: #000;
  }
  .news {
    background-image: url(../../static/img/news.png);
  }
  .photo {
    background-image: url(../../static/img/picShare.png);
  }
  .goodslist {
    background-image: url(../../static/img/goodShow.png);
  }
  .feedback {
    background-image: url(../../static/img/feedback.png);
  }
    .search {
    background-image: url(../../static/img/search.png);
  }
  .callme {
    background-image: url(../../static/img/callme.png);
  }
</style>

