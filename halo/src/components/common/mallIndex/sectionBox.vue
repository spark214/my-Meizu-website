<template>
<div class="sectionBox clearfix">
  <h1 class="sectionBox_title" @click="goRouter('mallProductPhone')">手机</h1>
  <div class="sectionBox_left clearfix"  @click="goRouter('mallProductPhone')">
      <img src="https://openfile.meizu.com/group1/M00/04/53/Cgbj0VrpkHGAIGQzAAV9apF0koQ059.jpg" width="615px"  @click="goRouter('mallProductPhone')">
  </div>
 <div class="sectionBox_right">
   <img src="https://openfile.meizu.com/group1/M00/04/55/Cgbj0Fr1Y-uANR-fAAB7hax7hTc240.jpg" width="619px"  @click="goRouter('mallProductPhone')">
   <img src="https://openfile.meizu.com/group1/M00/04/55/Cgbj0Fr1YnmAPrmZAAA6kyiTWDI482.jpg" width="303px"  @click="goRouter('mallProductPhone')">
   <img src="https://openfile.meizu.com/group1/M00/04/81/Cgbj0VsD83iAba0yAABV-bRyDiU053.jpg" width="303px"  @click="goRouter('mallProductPhone')">
 </div>


</div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    goRouter(that) {
      this.$router.push({path: "/" + that});
    },
  }
}
</script>
<style>
.sectionBox{
  margin-top: 20px;
  cursor: pointer;
}

.sectionBox_title{
  font-weight: 400;
  color:#666;
  margin-bottom: 10px;
}
  .sectionBox_left{
    float: left;
  }
  .sectionBox_right{
position: relative;
left: 8px;
  }
  .sectionBox_right img{
    margin-right: 5px;
    margin-bottom: 5px;
  }
</style>
