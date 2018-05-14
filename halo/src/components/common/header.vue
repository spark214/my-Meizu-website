<template>
  <div class="header clearfix">
    <h class="logo"><img src="../../../static/img/halo-230-40-blue.png" width="120px" height="24px"></h>
    <ul class="navs" id="navul">
      <li><a href="./index.html">首页</a></li>
      <li class="nav-product" id="nav-phone"><a>手机</a>
        <dl>
          <dd v-for="(item,index) in mobPhone"><img :src="item.url" class="nav-img"><p class="nav-dd">{{item.name}}</p></dd>
        </dl>
      </li>
      <li class="nav-product"><a>声学</a>
        <dl>
          <dd v-for="(item,index) in earPhone"><img :src="item.url" class="nav-img"><p class="nav-dd">{{item.name}}</p></dd>
        </dl>
      </li>
      <li class="nav-product"><a>配件</a>
        <dl>
          <dd v-for="(item,index) in fitting"><img :src="item.url" class="nav-img"><p class="nav-dd">{{item.name}}</p></dd>
        </dl>
      </li>
      <li><a href="flyme_index.html" target="_blank">Flyme</a></li>
    </ul>
    <div class="login">
      <a href="javascript:void(0)">注册</a><a>|</a><a href="javascript:void(0)">登陆</a>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
       mobPhone:[
         {name:'魅族15',url:'../../../static/img/15_black_2_480x480.png'},
         {name:'魅族PRO 7',url:'../../../static/img/pro7_black_2_480x480.jpg'},
         {name:'魅蓝E3',url:'../../../static/img/e3_black_2_480x480.png'},
         {name:'魅蓝S6',url:'../../../static/img/s6_black_2_480x480.png'},
         ],
        earPhone:[
          {name:'魅族Hebe',url:'../../../static/img/hebe_red_480x480.png'},
          {name:'魅蓝EP52',url:'../../../static/img/ep52_red_480x480.png'},
          {name:'魅蓝Flow',url:'../../../static/img/flow_black_480x480.png'},
          {name:'魅族Live',url:'../../../static/img/live_while_480x480.png'},
        ],
        fitting:[
          {name:'魅蓝双向快充移动电源',url:'../../../static/img/m10_while_480x480.png'},
          {name:'魅蓝酷MA萌移动电源',url:'../../../static/img/kuma-m10_while_480x480.png'},
          {name:'魅族手环',url:'../../../static/img/mzband_black_480x480.png'},
          {name:'魅蓝酷MA萌旅行套装',url:'../../../static/img/everyday_all_480x480.png'},
        ]


      }
    }
  }
</script>
<style>
  .header{
    z-index: 100;
  }
  .navs{
    float: right;
    margin-right: 150px;
    margin-top: 30px;
  }
  .header a{
    color: #000;
  }
  .header a:hover{
    color: #31a5e7;
  }
  .login{
    position: absolute;
    left: 90%;
    top: 30px;
    font-size: 14px;
  }
  .login a{
    padding-right: 5px;
    padding-left: 5px;
  }
  .navs li{
    width: 60px;
    display: inline-block;
    margin-right: 20px;
    font-size: 14px;
  }
  .nav-img{
    width: 100px;
  }
  .logo{
    margin-left: 25px;
    margin-top: 10px;
  }
  .logo img{
    margin-top: 20px;
    padding-bottom: 10px;
  }
  .header{
    position: relative;
    width: 100%;
    height: 70px;
    top: 0;
    background-color: transparent;
  }
  .header:hover{
    background-color: #fff;
  }
  .nav-product dl{
    width: 100%;
    position: absolute;
    left: 0;
    padding-left: 300px;
    padding-top: 10px;
    margin-top: 0px;
    background-color:#fff;
    display: none;
  }

  .nav-product:hover dl{
    display:block;
  }
  .nav-product dl dd{
    float: left;
    width: 150px;
    height: 130px;
    text-align: center;

  }
  .nav-product dl dd p{
    color: #515151;
    position: relative;
    font-size: 12px;
  }

  a:hover{
    text-decoration: none !important;
  }
  .on{
    color: #00a7ea ;
  }
  .header{
    position: absolute;
    width: 100%;
    top: 0;
  }
</style>
