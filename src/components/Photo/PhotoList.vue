<template>
  <div class="tmpl">
    <!-- 引入返回导航 -->
    <nev-bar title="图文分享"></nev-bar>
    <div class="photo-header">
      <ul>
        <li v-for="category in categories" :key="category.id">
          <a @click="getImgs(category.id)" href="javascript:;">{{category.title}}</a>
        </li>
      </ul>
    </div>
    <div class="photo-list">
      <ul>
        <li v-for="pic in imgs" :key="pic.id">
          <router-link :to="{name:'photo.detail',params:{imgId:pic.id}}">
                          <img v-lazy="pic.img_url">
                          <p>
                              <span>{{pic.title}}</span>
                              <br>
                              <span>{{pic.zhaiyao}}</span>
                          </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    data:function() {
      return {
        categories:[],
        imgs:[]
      }
    },
    methods:{
      getImgs:function(id) {
        this.$axios.get('getimages/' + id).then(res=>{
          this.imgs = res.data.message
          if(this.imgs.length == 0){
                    this.$toast({
                      message: '提示:没有图片了',
                      duration: 5000
                    });
                }
        })
      }
    },
    created(){
      var categoryId = this.$route.params.categoryId
      this.$axios.all([
        this.$axios.get('getimgcategory'),
        this.$axios.get('getimages/' + categoryId)
      ])
      .then(this.$axios.spread((categoryRes,imgRes)=>{
        this.categories = categoryRes.data.message
        this.imgs = imgRes.data.message
      }))
    }
  }
</script>
<style>
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
  .photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
  }
  
  .photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
  }
  
  /*下面的图片*/
  
  .photo-list li {
    list-style: none;
    position: relative;
  }
  
  .photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
  }
  
  .photo-list ul {
    padding-left: 0px;
    margin: 0;
  }
  
  .photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
  }
  
  .photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
  }
</style>
