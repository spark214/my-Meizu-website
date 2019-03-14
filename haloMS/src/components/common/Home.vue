<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>

    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags></v-tags>
      <div class="content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
  import vHead from './Header.vue';
  import vSidebar from './Sidebar.vue';
  import vTags from './Tags.vue';
  import bus from './bus.js';
  export default {
    data:()=>({collapse:false}),
    components:{
      vHead, vSidebar, vTags
    },
    created(){
      bus.$on('collapse',msg=>{
        this.collapse=msg;
      })
    }
  }
</script>
<style>
  .content-box {
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
  }

  .content {
    width: auto;
    padding: 40px;
  }
  .content-collapse{
    left: 65px;
  }
</style>
