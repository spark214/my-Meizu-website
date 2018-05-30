<template>
  <div class="sectionBox clearfix">
    <h1 class="sectionBox_title" @click="goRouter('')">{{title}}</h1>
    <div class="sectionBox_left clearfix" @click="goRouter('mallProductPhone')">
      <img :src="img[0]" width="615px" @click="goRouter('mallProductPhone')">
    </div>
    <div class="sectionBox_right">
      <img :src="img[1]" width="615px" @click="goRouter('mallProductPhone')">
      <img :src="img[2]" width="303px" @click="goRouter('mallProductPhone')">
      <img :src="img[3]" width="303px" @click="goRouter('mallProductPhone')">
    </div>


  </div>
</template>
<script>
  export default {
    props: {
      img: [],
      title: ""
    },
    data() {
      return {}
    },
    methods: {
      goRouter(that) {
        this.$router.push({path: "/" + that});
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
