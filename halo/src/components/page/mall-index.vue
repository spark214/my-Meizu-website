<template>
  <div>
    <v-header></v-header>
    <div class="carousel">
      <el-carousel height="680px"  trigger="click">
        <el-carousel-item v-for="item in banner" :key="item">
          <div class="banner-content" :style="item"></div>
        </el-carousel-item>
      </el-carousel>
      <div class="sideBar">
        <el-row>
          <el-col :span="4">
            <el-menu>
              <el-menu-item>
                <span slot="title">手机</span>
              </el-menu-item>
              <el-menu-item>
                <span slot="title">智能设备</span>
              </el-menu-item>
              <el-menu-item>
              <span slot="title">智能穿戴</span>
            </el-menu-item>

            </el-menu>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import vHeader from '../common/header';
  export default {
    data(){
      return{
        banner:[
          {
            backgroundImage: "url(" + require("../../../static/img/Banner_15.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",

          },
          {backgroundImage: "url(" + require("../../../static/img/Banner_Ep52.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition:"center",
          },
          {backgroundImage: "url(" + require("../../../static/img/Banner_POP.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition:"center",
            backgroundSize:"cover",
          },
        ]

      }
    },
    components:{
      vHeader
    },
  }
</script>
