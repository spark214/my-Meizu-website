<template>
  <div>
    <v-header></v-header>
    <div class="carousel">
      <el-carousel height="680px"  trigger="click">
        <el-carousel-item v-for="(item,index) in banner" :key="item" @click="banner(index)">
         <div class="banner-content" :style="item" ></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import vHeader from '../common/header/page/header';
  import vFooter from '../common/footer';
  export default {
    data(){
      return{
        banner:[
          {
            backgroundImage: "url(http://img.tozlam.cn/Banner_15.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",

           },
          {backgroundImage: "url(http://img.tozlam.cn/Banner_Ep52.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition:"center",
         },
          {backgroundImage: "url(http://img.tozlam.cn/Banner_POP.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",
      },
        ],
        ids:[1,31,69]
      }
    },
    components:{
      vHeader,vFooter
    },
    methods:{
      banner(index){
       var id=ids[index]
          if (id <= 10)
            this.$router.push({path: "/mallProductPhone", query: {proId: id}})
          else
            this.$router.push({path: "/mallProductOther", query: {proId: id}})

      }
    }
  }
</script>
<style>
  .banner-content{
    width: 100%;
    height: 680px;
  }
</style>
