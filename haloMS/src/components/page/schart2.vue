<template>
  <div id="schart2">
    <schart class="schart-wrapper" :canvasId="canvasId" :type="type" :data="data" :options="options"></schart>
  </div>
</template>
<script>
  import Schart from 'vue-schart';
  export default {
    data(){
      return{
        canvasId:'Schart',
        type:'bar',
        data:[
          {name: '06-26', value: 2},
          {name: '06-27', value: 1},
        ],
        options:{
          title:'今日同昨日销量对比',
          titlePosition:'top',
          titleColor:'#fff',
          bgColor:' #A4A7B0',
          autoWidth:true,
          fillColor:'#409EFF'
        }
      }
    },
    components:{
      Schart
    }
  }
</script>
<style>
#schart2{
  float: left;
}
  .schart-wrapper{
    width: 235px;
    height: 235px;
    margin-left: 5px;
  }
</style>
