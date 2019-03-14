<template>
  <div id="schart">
    <schart class="schart-wrapper" :canvasId="canvasId" :type="type" :data="data" :options="options"></schart>
  </div>
</template>
<script>
  import Schart from 'vue-schart';
  export default {
    data(){
      return{
        canvasId:'HaloSchart',
        type:'ring',
        data:[],
        options:{
          title:'本月品牌销量对比',
          titleColor:'#fff',
          titlePosition:'top',
          bgColor:'#A4A7B0',
          radius: 50,
          innerRadius: 20,
          legendTop:70,
          colorList:['#F56C6C','#409EFF']
        }
      }
    },
    components:{
      Schart
    },
    methods:{
      getData(){
        var url = this.$rootUrl + "/api/halo/backstage/firstpage/";
        const options = {
          method: 'GET',
          url: url,
          data: {}
        };
        this.$axios(options).then((res) => {
          if (res.data.errorCode == 0) {
            this.data.push({name:'魅族',value:2})
            this.data.push({name:'魅蓝',value:6})
          }
        })
      }
    },
    created(){
//      this.getData()
    }
  }
</script>
<style>
#schart{
  float: left;
}
  .schart-wrapper{
    width: 235px;
    height: 235px;
    margin-left: 5px;
  }
</style>
