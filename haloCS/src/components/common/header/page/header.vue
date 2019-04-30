<template>
  <div class="webHeader clearfix">
    <a class="logo" href="./index.html">
      <img src="http://img.tozlam.cn/halo-230-40-blue.png" width="120px" height="24px"></a>
    <ul class="navs" id="navul">
      <li><a @click="goRouter('mallIndex')">首页</a></li>
      <li class="nav-product" id="nav-phone"><a  @click="goList(1)">手机</a>
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
      <li><a @click="goRouter('haloCenter')">社区</a></li>
      <li class="nav-search">
        <input type="text" placeholder="魅族 15" v-model="keyword" id="searchInput">
        <i class="el-icon-search" @click="goSearch"></i>
      </li>
    </ul>
    <div class="login clearfix">
      <ul>
        <li>
          <el-badge :value="nowMessage" class="item" max="10" :hidden="!isLogin || nowMessage == 0">
            <el-dropdown trigger="hover" @command=" handleCommand" placement="bottom">
              <span class="el-dropdown-link" @click="goRouter('member')">
                <img :src="avatar" width="24px" style="border-radius: 50%">
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="login" v-if="!isLogin">立即登录</el-dropdown-item>
                <el-dropdown-item command="register" divided v-if="!isLogin">立即注册</el-dropdown-item>

                <el-dropdown-item command="myorder" v-if="isLogin">我的订单</el-dropdown-item>
                  <el-dropdown-item command="myMessage" v-if="isLogin">
                    <el-badge :value="nowMessage" class="item" max="10" is-dot="true" :hidden="!isLogin || nowMessage == 0" v-if="isLogin">我的消息</el-badge>
                  </el-dropdown-item>
                <el-dropdown-item command="loginout" divided v-if="isLogin">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-badge>

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
  import SockJS from  'sockjs-client';
  import  Stomp from 'stompjs';

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
        keyword:'',
        stompClient:'',
        timer:'',
        token:'',
        nowMessage:0,
        avatar:'../../../../../static/img/user.png'
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
        var name = this.keyword || "魅族 15";
        this.$router.push({path: "/mallList", query: {name: name, cateId: -1}});
      },
      handleCommand(command) {
        if (command == 'loginout') {
          var url = this.$rootUrl + "/api/user/logout";
          const options = {
            method: 'GET',
            url: url,
            data: {}
          };
          this.$axios(options).then((res) => {
            let item = res.data.data;
            if (item.errorCode == 0) {
              sessionStorage.removeItem('expireTime');
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('userName');
              sessionStorage.removeItem('avatar');
              this.avatar = '../../../../../static/img/user.png';
              this.disconnect();
              const path = this.$route.path;
              if(path == '/newPost' || path == '/user' || path == '/mallCheck' || this.$route.matched[0].path == '/member'){
                this.$router.push({path:'/'});
              }else{
                this.getData();
              }
            }
        });
        }
        else if (command == 'login') {
          sessionStorage.setItem('pageHistory',this.$route.fullPath);
          this.$router.push('/login');
        }
        else if (command == 'register') {
          sessionStorage.setItem('pageHistory',this.$route.fullPath);
          this.$router.push('/register');
        }
        else if (command == 'myorder') {
          this.$router.push('/myOrder');
        } else if (command == 'myMessage') {
          this.$router.push('/myMessage');
        }
      },
      getData() {
        const expireTime = sessionStorage.getItem('expireTime');
        const nowTime = new Date().getTime();
        if(expireTime && nowTime < expireTime){
          this.isLogin = true;
          this.initWebSocket();
          this.avatar = sessionStorage.getItem('avatar') || '../../../../../static/img/user.png';
        }else{
          this.isLogin = false;
          this.disconnect();
        }
      },
      initWebSocket() {
        this.connection();
        let that= this;
        // 断开重连机制,尝试发送消息,捕获异常发生时重连
        this.timer = setInterval(() => {
          try {
            that.stompClient.send("test");
          } catch (err) {
            that.connection();
          }
        }, 5000);
      },
      connection() {
        // 建立连接对象
        let socket = new SockJS('http://123.207.121.122:8868/api/halo/ws');
        // 获取STOMP子协议的客户端对象
        this.stompClient = Stomp.over(socket);
        // 定义客户端的认证信息,按需求配置
        let headers = {
          access_token:sessionStorage.getItem('token')
        }
        // 向服务器发起websocket连接
        this.stompClient.connect(headers,() => {
          this.stompClient.subscribe('/user/1/message', (msg) => { // 订阅服务端提供的某个topic
            let value = JSON.parse(msg.body);
            this.nowMessage = value.data; // msg.body存放的是服务端发送给我们的信息
          },headers);
        }, (err) => {
          // 连接发生错误时的处理函数
          console.log(err);
        });
      },    //连接 后台
      disconnect() {
        if (this.stompClient) {
          this.stompClient.disconnect();
        }
      },  // 断开连接
    },
    created() {
      this.getData();
    }
  }
</script>
<style lang="less">
  .webHeader {
    z-index: 100;
    position: absolute;
    width: 100%;
    height: 60px;
    top: 0;
    background-color: #ffffff;
    border-bottom: 0.5px solid #f3f3f3;

  .navs {
    float: right;
    margin-right: 250px;
    margin-top: 20px;
  }

  .webHeader a {
    color: #000;
  }

  .webHeader a:hover {
    color: #31a5e7;
  }

  .login {
    margin-left: 10px;
    position: absolute;
    right: 140px;
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
    margin-left: 165px;
    z-index: 100;
  }

  .logo img {
    margin-top: 20px;
    padding-bottom: 10px;

  }


  .webHeader:hover {
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
    z-index: 1000;
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
    cursor: pointer;
  }

  .userIcon {
    border-radius: 100%;
  }

  .login li {
    float: left;
    width: 50px;
    cursor: pointer;
  }

  }
</style>
