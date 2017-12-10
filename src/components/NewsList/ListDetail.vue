<template>
  <div class="tmpl">
    <nev-bar title="新闻详情"></nev-bar>
    <div class="news-title">
      <p>{{newsInfo.title|converTitle(15)}}</p>
      <div>
        <span>{{newsInfo.click}}</span>
        <span>分类:民生经济</span>
        <span>添加时间:{{newsInfo.add_time|converTime}}</span>
      </div>
    </div>
    <div class="news-content" v-html="newsInfo.content"></div>
  </div>
</template>
<script>
   export default{
     data:function() {
       return {
         newsInfo:{}
       }
     },
     created:function() {
       var newsId = this.$route.query.newsId
       this.$axios.get('getnew/'+newsId).
       then(res=>{
         this.newsInfo = res.data.message[0]
       }).catch(err=>{
         console.log(err)
       })
     }
   }
</script>
<style scoped>
  .news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
  }
  

  
  .news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  
  /*主体文章的左右距离*/
  
  .news-content {
    padding: 10 5;
  }
</style>
