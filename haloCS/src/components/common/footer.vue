<template>
  <div>
    <div class="contain_footer clearfix" v-if="type == 1">
      <table class="foottable">
        <tr>
          <td><img src="../../../static/img/sf.png" ><a>顺丰包邮</a></td>
          <td><img src="../../../static/img/nextarrive.png" ><a>100+城市次日送达</a></td>
          <td><img src="../../../static/img/7days.png" ><a>7天无理由退货</a></td>
          <td><img src="../../../static/img/15days.png" ><a>15天换货保障</a></td>
        </tr>
        <tr>
          <td><img src="../../../static/img/1years.png" ><a>1年免费保修</a></td>
          <td><img src="../../../static/img/2300.png" ><a>2300+线下体验店</a></td>
          <td><img src="../../../static/img/further.png" ><a>远程支持服务</a></td>
          <td><img src="../../../static/img/fix.png" ><a>上门快修</a></td>
        </tr>
      </table>
    </div>
    <div class="copyright">
      <p>&copy;2018 Halo Telecom Equipment Co., Ltd. All rights reserved. 备案号： 粤ICP备18002543号-1 </p>
    </div>
  </div>


</template>
<script>
  export default {
    props:{
      type:{
        type:Number,
        default:1
      }
    }
  }
</script>
<style>
  .foottable {
    width: 800px;
    position: relative;
    left: 50%;
    margin-bottom: 10px;
    margin-left: -380px;
  }

  .foottable tr {
    text-align: justify;
  }

  .foottable td {
    width: 200px;
    height: 80px;
  }

  .foottable a {
    color: #999999;
    position: relative;
    top: -7px;
    left: 5px;
  }

  .contain_footer {
    margin-top: 50px;
    width: 100%;
    border-bottom: 1px solid #DCDCDC;
    background-color: #fff;
  }

  .copyright {
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: white;
  }

  .copyright p {
    font-size: 14px;
    color: #999999;
  }
</style>
