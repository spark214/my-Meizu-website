<template>
  <div class="header clearfix">
    <a class="logo" href="./index.html"><img src="../../../../static/img/halo-230-40-blue.png" width="120px" height="24px"></a>
    <ul class="navs" id="navul">
      <li><a href="./index.html">首页</a></li>
      <li class="nav-product" id="nav-phone"><a>手机</a>
        <dl>
          <dd v-for="(item,index) in mobPhone" @click="goRouter('mallProductPhone')">
            <img :src="item.url" class="nav-img">
            <p class="nav-dd">{{item.name}}</p></dd>
        </dl>
      </li>
      <li class="nav-product"><a>声学</a>
        <dl>
          <dd v-for="(item,index) in earPhone" @click="goRouter('mallProductOther')">
            <img :src="item.url" class="nav-img">
            <p class="nav-dd">{{item.name}}</p></dd>
        </dl>
      </li>
      <li class="nav-product"><a>配件</a>
        <dl>
          <dd v-for="(item,index) in fitting" @click="goRouter('mallProductOther')">
            <img :src="item.url" class="nav-img">
            <p class="nav-dd">{{item.name}}</p></dd>
        </dl>
      </li>
      <li><a @click="goRouter('mallIndex')">商城</a></li>
      <li><a target="_blank">Flow.</a></li>
      <li class="nav-search"><input type="text" placeholder="魅族15"><i class="el-icon-search"></i></li>
    </ul>
    <div class="login clearfix">
      <ul>
        <li>
          <el-dropdown trigger="hover" @command=" handleCommand" placement="bottom">
          <span class="el-dropdown-link">
           <img src="../../../../static/img/user.png" v-show="!isLogin" width="24px">
          <img :src="userIcon" v-show="isLogin" width="24" class="userIcon">
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="login"v-if="!isLogin" >立即登录</el-dropdown-item>
              <el-dropdown-item command="register" divided v-if="!isLogin" >立即注册</el-dropdown-item>

              <el-dropdown-item command="loginout"v-if="isLogin">我的订单</el-dropdown-item>
              <el-dropdown-item command="loginout" divided v-if="isLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </li>
        <li>
          <el-dropdown trigger="hover" @command=" handleCommand" placement="bottom">
          <span class="el-dropdown-link">
        <img src="../../../../static/img/shoppingCart.png" width="24px">
          </span>
            <el-dropdown-menu slot="dropdown">
              <div class="shopcartDropdown" v-if="!isLogin">
                <img src="../../../../static/img/shopcartPanda.png">
                <span>登录后可显示<br>您账号中加入的商品哦</span>
              </div>
              <div class="shopcartDropdown" v-if="isLogin">
                <img src="../../../../static/img/shopcartPanda2.png">
                <span>您的购物车还没有商品,<br>赶紧去选购吧~</span>
              </div>
            </el-dropdown-menu>
          </el-dropdown>

        </li>
      </ul>


    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mobPhone: [
          {name: '魅族15', url: '../../../static/img/15_black_2_480x480.png'},
          {name: '魅族PRO 7', url: '../../../static/img/pro7_black_2_480x480.jpg'},
          {name: '魅蓝E3', url: '../../../static/img/e3_black_2_480x480.png'},
          {name: '魅蓝S6', url: '../../../static/img/s6_black_2_480x480.png'},
        ],
        earPhone: [
          {name: '魅族Hebe', url: '../../../static/img/hebe_red_480x480.png'},
          {name: '魅蓝EP52', url: '../../../static/img/ep52_red_480x480.png'},
          {name: '魅蓝Flow', url: '../../../static/img/flow_black_480x480.png'},
          {name: '魅族Live', url: '../../../static/img/live_while_480x480.png'},
        ],
        fitting: [
          {name: '魅蓝双向快充移动电源', url: '../../../static/img/m10_while_480x480.png'},
          {name: '魅蓝酷MA萌移动电源', url: '../../../static/img/kuma-m10_while_480x480.png'},
          {name: '魅族手环', url: '../../../static/img/mzband_black_480x480.png'},
          {name: '魅蓝酷MA萌旅行套装', url: '../../../static/img/everyday_all_480x480.png'},
        ],
        isLogin: false,
        userIcon: "../../../static/img/21.jpg",


      }
    },
    methods: {
      goRouter(that) {
        this.$router.push({path: "/" + that});
      },
      handleCommand(command) {
        if (command == 'loginout') {
          localStorage.removeItem('ms_userId');
          this.$router.push('/login');
        }
        else  if (command == 'login'){
          this.$router.push('/login');
        }
        else  if (command == 'register'){
          this.$router.push('/register');
        }
      },
    }
  }
</script>
<style>
  .header {
    z-index: 100;
  }

  .navs {
    float: right;
    margin-right: 150px;
    margin-top: 20px;
  }

  .header a {
    color: #000;
  }

  .header a:hover {
    color: #31a5e7;
  }

  .login {
    position: absolute;
    left: 90%;
    top: 20px;
    font-size: 14px;
  }

  .login a {
    padding-right: 5px;
    padding-left: 5px;
  }

  .navs li {
    width: 60px;
    display: inline-block;
    margin-right: 20px;
    font-size: 14px;
    cursor: pointer;
  }

  .nav-img {
    width: 100px;
  }

  .logo {
    position: absolute;
    margin-left: 25px;
    z-index: 100;
  }

  .logo img {
    margin-top: 20px;
    padding-bottom: 10px;

  }

  .header {
    position: relative;
    width: 100%;
    height: 60px;
    top: 0;
    background-color: transparent;
    border-bottom: 0.5px solid #dcdcdc;
  }

  .header:hover {
    background-color: #fff;
  }

  .nav-product dl {
    width: 100%;
    position: absolute;
    left: 0;
    padding-left: 300px;
    padding-top: 10px;
    margin-top: 0px;
    background-color: #fff;
    display: none;
  }

  .nav-product:hover dl {
    display: block;
  }

  .nav-product dl dd {
    float: left;
    width: 150px;
    height: 130px;
    text-align: center;

  }

  .nav-product dl dd p {
    color: #515151;
    position: relative;
    font-size: 12px;
  }

  a:hover {
    text-decoration: none !important;
  }

  .on {
    color: #00a7ea;
  }

  .header {
    position: absolute;
    width: 100%;
    top: 0;
  }

  .nav-search {
    width: 135px !important;
    height: 25px;
    border-radius: 20px;
    border: 0.5px solid #dcdcdc;
  }

  .nav-search input {
    width: 100px;
    border: none;
    margin-left: 8px;
    margin-top: 6px;
    outline: none;
    font-size: 11px;
    background: transparent;
  }

  .nav-search i {
    margin-right: 3px;
  }

  .userIcon {
    border-radius: 100%;
  }

  .login li {
    float: left;
    width: 50px;
    cursor: pointer;
  }
  .shopcartDropdown{
    width: 318px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .shopcartDropdown span{
    margin-left: 15px;
    font-size: 12px;
    color: #999;
  }
</style>
