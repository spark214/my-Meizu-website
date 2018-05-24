<template>
  <div class="contain_head_img">
    <img v-lazy="imgurl[selectPic]" width="395px"
    class="img_preview">
    <ul>
      <li v-for="(pic,picIndex) in imgurl">
        <img v-lazy="pic"
             width="75px" @click="changePic(picIndex)" :class="{selectPic:selectPic==(picIndex)}">
      </li>
    </ul>
  </div>
</template>
<style>
  .contain_head_img {
    position: relative;
    float: left;
    width: 40%;
    margin-left: 30px;
  }

  .contain_head_img ul {
    margin-left: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .contain_head_img ul li {
    display: inline;
    margin-right: 25px;
    cursor: pointer;
  }

  .contain_head_img ul li img {
    box-sizing: border-box;
  }

  .selectPic {
    border: 1px solid #dcdcdc;
  }
</style>
<script>
  import bus from './bus.js';

  export default {
    props:{
      imgurl:{
        type:[Array]
      }
    },
    data(){
      return{
        selectPic: 0,

      }
    },
    methods:{
      changePic(index) {
        this.selectPic = (index);
      },

    },
    mounted(){
      alert(imgurl)
    }
  }
</script>
