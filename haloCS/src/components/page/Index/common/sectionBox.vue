<template>
  <div class="sectionBox clearfix">
    <h1 class="sectionBox_title" @click="goCate()">{{title}}</h1>
    <div class="sectionBox_left clearfix"  v-if="img.length > 0">
      <img :src="img[0].img" width="615px" @click="goProduct(img[0].id)">
    </div>
    <div class="sectionBox_right" v-if="img.length > 0">
      <img :src="img[1].img" width="615px" @click="goProduct(img[1].id)">
      <img :src="img[2].img" width="303px" @click="goProduct(img[2].id)">
      <img :src="img[3].img" width="303px" @click="goProduct(img[3].id)">
    </div>


  </div>
</template>
<script>
  export default {
    props: {
      img: {
        type:Array
      },
      title: {
        type:String
      }
    },
    data() {
      return {}
    },
    methods: {
      goCate() {
        let id;
        if(this.title == '手机'){
          id = 0;
        }else{
          id = 0
        }
        this.$router.push({path: "/mallList", query: {cateId: id}})
      },
      goRouter(that) {
        this.$router.push({path: "/" + that});
      },
      goProduct(id){
        if (id <= 10)
          this.$router.push({path: "/mallProductPhone", query: {proId: id}})
        else
          this.$router.push({path: "/mallProductOther", query: {proId: id}})
      },
    }
  }
</script>
<style>
  .sectionBox {
    margin-top: 20px;
    cursor: pointer;
  }

  .sectionBox_title {
    font-weight: 400;
    color: #666;
    margin-bottom: 10px;
  }

  .sectionBox_left {
    float: left;
  }

  .sectionBox_right {
    float: right;
    width: 619px;
    position: relative;
    left: 3px;
  }

  .sectionBox_right img {
    margin-right:4px;
    margin-bottom: 5px;
  }
</style>
