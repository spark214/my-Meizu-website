<template>
  <div class="header clearfix">
    <a class="logo" href="./index.html"><img src="http://img.tozlam.cn/halo-230-40-blue.png" width="120px"
                                             height="24px"></a>
    <ul class="navs" id="navul">
      <li><a href="./index.html">首页</a></li>
      <li class="nav-product" id="nav-phone"><a  @click="goList(0)">手机</a>
        <dl>
          <dd v-for="(item,index) in mobPhone" @click="goProduct(item.id)">
            <img :src="item.url" class="nav-img">
            <p class="nav-dd">{{item.name}}</p></dd>
        </dl>
      </li>
      <li class="nav-product"><a  @click="goList(5)">声学</a>
        <dl>
          <dd v-for="(item,index) in earPhone" @click="goProduct(item.id)">
            <img :src="item.url" class="nav-img">
            <p class="nav-dd">{{item.name}}</p></dd>
        </dl>
      </li>
      <li class="nav-product"  ><a @click="goList(6)">配件</a>
        <dl>
          <dd v-for="(item,index) in fitting" @click="goProduct(item.id)">
            <img :src="item.url" class="nav-img">
            <p class="nav-dd">{{item.name}}</p></dd>
        </dl>
      </li>
      <li><a @click="goRouter('mallIndex')">商城</a></li>
      <li><a target="_blank" href="https://tozlam.cn/mz/flyme_index.html">Flow.</a></li>
      <li class="nav-search"><input type="text" placeholder="魅族15" value="" id="searchInput">
        <i class="el-icon-search" @click="goSearch"></i>
      </li>
    </ul>
    <div class="login clearfix">
      <ul>
        <li>
          <el-dropdown trigger="hover" @command=" handleCommand" placement="bottom">
          <span class="el-dropdown-link" @click="goRouter('member')">
           <img src="../../../../../static/img/user.png" width="24px">
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="login" v-if="!isLogin">立即登录</el-dropdown-item>
              <el-dropdown-item command="register" divided v-if="!isLogin">立即注册</el-dropdown-item>

              <el-dropdown-item command="myorder" v-if="isLogin">我的订单</el-dropdown-item>
              <el-dropdown-item command="loginout" divided v-if="isLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </li>
        <li>
          <v-cart></v-cart>

        </li>
      </ul>


    </div>
  </div>
</template>
<script>
  import vCart from "../common/cartShow";

  export default {
    data() {
      return {
        mobPhone: [
          {name: '魅族15', url: 'https://openfile.meizu.com/group1/M00/04/57/Cgbj0VrxPbKAPw-1AAJWqasMn_A309.png',id:1},
          {name: '魅族PRO 7', url: 'https://openfile.meizu.com/group1/M00/01/C7/Cgbj0Vl4OYOAGRToAAJwA8hDe5Y164.png',id:6},
          {name: '魅蓝E3', url: 'https://openfile.meizu.com/group1/M00/04/57/Cgbj0VrxPw-AagPuAAI1cwVNeY8122.png',id:10},
          {name: '魅蓝S6', url: 'https://openfile.meizu.com/group1/M00/04/49/Cgbj0FrxPy6Ae3lKAAHGS6FCfDA943.png',id:9},
        ],
        earPhone: [
          {name: '魅族Halo', url: 'https://openfile.meizu.com/group1/M00/04/49/Cgbj0FrxQ9OASHrkAAHd8RyFtJk439.png',id:38},
          {name: '魅蓝EP52', url: 'https://openfile.meizu.com/group1/M00/04/49/Cgbj0FrxQ9OATl4OAAFfnIyp_wU418.png',id:31},
          {name: '魅蓝Flow', url: 'https://openfile.meizu.com/group1/M00/04/49/Cgbj0FrxQ9OANS4SAAESYJ5J8G4662.png',id:27},
          {name: '魅族Live', url: 'https://openfile.meizu.com/group1/M00/04/57/Cgbj0VrxQ9OAPp2AAAHX9602H_I285.png',id:68},
        ],
        fitting: [
          {name: '魅蓝双向快充移动电源', url: 'https://openfile.meizu.com/group1/M00/04/49/Cgbj0FrxRYSAa6YQAABMFFMVjEk568.png',id:42},
          {name: '魅族无线充电器', url: 'https://openfile.meizu.com/group1/M00/04/15/Cgbj0VrcXw2AL0tBAApTh_xwKKk709.png',id:52},
          {name: '魅族手环', url: 'https://openfile.meizu.com/group1/M00/04/57/Cgbj0VrxRYSAAVeoAAGI27DZUHE458.png',id:11},
          {name: '魅蓝酷MA萌旅行套装', url: 'https://openfile.meizu.com/group1/M00/04/58/Cgbj0VrxTr2AR8UeAALz4Fjd8wQ600.png',id:59},
        ],
        isLogin: false,
        userIcon: "../../../static/img/21.jpg",


      }
    },
    components: {
      vCart
    },
    methods: {
      goList(id) {
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
      goSearch() {
        var name = document.getElementById("searchInput").value
        this.$router.push({path: "/mallList", query: {name: name, cateId: -1}})
      },
      handleCommand(command) {
        if (command == 'loginout') {
          sessionStorage.removeItem('accessToken');
          this.$router.push('/login');
        }
        else if (command == 'login') {
          this.$router.push('/login');
        }
        else if (command == 'register') {
          this.$router.push('/register');
        }
        else if (command == 'myorder') {
          this.$router.push('/myOrder');
        }
      },
      getData() {
        var token = sessionStorage.getItem('accessToken');
        if(token!=undefined){
          this.isLogin=true
        }
      }

    },
    created() {
      this.getData()
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
    border-bottom: 0.5px solid #f3f3f3;
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

</style>
