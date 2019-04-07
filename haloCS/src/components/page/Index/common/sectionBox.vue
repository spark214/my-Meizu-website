<template>
  <div class="sectionBox clearfix">
    <h1 class="sectionBox_title" @click="goCate(1)">{{title}}</h1>
    <div class="sectionBox_left clearfix" @click="goProduct(38)">
      <img :src="img[0]" width="615px" @click="goProduct(38)">
    </div>
    <div class="sectionBox_right">
      <img :src="img[1]" width="615px" @click="goProduct(1)">
      <img :src="img[2]" width="303px" @click="goProduct(2)">
      <img :src="img[3]" width="303px" @click="goProduct(3)">
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
      goCate(id) {
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
