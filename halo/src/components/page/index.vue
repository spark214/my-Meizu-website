<template>
  <div>
    <v-header></v-header>
    <div class="carousel">
      <el-carousel height="680px"  trigger="click">
        <el-carousel-item v-for="item in banner" :key="item">
         <div class="banner-content" :style="item"></div>
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
            backgroundImage: "url(http://p9f6ljki4.bkt.clouddn.com/Banner_15.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",

           },
          {backgroundImage: "url(http://p9f6ljki4.bkt.clouddn.com/Banner_Ep52.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition:"center",
         },
          {backgroundImage: "url(http://p9f6ljki4.bkt.clouddn.com/Banner_POP.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",
      },
        ]
      }
    },
    components:{
      vHeader,vFooter
    },
    methods:{
      banner(){

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
