<template>
    <div class="haloCenterHeader">
        <div class="center-header">
            <div class="header-left" @click="goRouter('/haloCenter')">
                <img src="../../../../../static/img/halo-230-40-blue.png" width="180px" height="35px">
                <div class="header-left-name">
                    <p>社区</p>
                </div>
            </div>
            <div class="header-right">
                <div class="header-right-nav">
                    <ul>
                        <li @click="goRouter('/')">商城首页</li>
                        <li @click="goRouter('/haloCenter')">社区首页</li>
                        <li @click="goRouter('/centerSection',1,'杂谈')">产品讨论</li>
                        <li @click="goRouter('/centerSection',3,'交易')">闲置交易</li>
                        <li @click="goRouter('/centerSection',2,'摸鱼')">建议反馈</li>
                    </ul>
                </div>
                <!--<div class="header-right-search">-->
                    <!--<el-input v-model="searchKey" suffix-icon="el-icon-search" placeholder="搜索"></el-input>-->
                <!--</div>-->
                <div class="header-right-user">
                    <span class="header-right-user-name" @click="user"><span v-if="isLogin" style="color: #666;cursor: default">hi, </span>{{userName}}</span>
                    <span class="header-right-user-tip" @click="myMessage"  v-if="isLogin"><el-badge :value="nowMessage" style="padding-right:10px" max="10" :hidden="!isLogin || nowMessage == 0">消息</el-badge></span>
                    <span class="header-right-user-logout" v-if="isLogin" @click="loginout">退出</span>
                    <span class="header-right-user-logout" v-if="!isLogin" @click="login">登录</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash';
    import SockJS from  'sockjs-client';
    import  Stomp from 'stompjs';
    export default{
        name: "haloCenter_Header",
        data(){
            return {
                searchKey: '',
                userName:'',
                stompClient:'',
                timer:'',
                token:'',
                nowMessage:0,
                isLogin: false,
            }
        },
        methods: {
            goRouter(item,id,name){
                this.$router.push({path: item, query: {id:id,name:name}});
            },
            loginout(){
                var url = this.$rootUrl + "/api/user/logout";
                const options = {
                    method: 'GET',
                    url: url,
                    data: {}
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.errorCode == 0) {
                        sessionStorage.setItem('expireTime', 0);
                        this.disconnect();
                        const path = this.$route.path;
                        if (path == '/newPost' || path == '/user' || path == '/mallCheck' || this.$route.matched[0].path == '/member') {
                            this.$router.push({path: '/'});
                        } else {
                            this.getData();
                        }
                    }
                });
            },
            login(){
                sessionStorage.setItem('pageHistory',this.$route.fullPath);
                this.$router.push('/login');
            },
            user(){
                this.$router.push('/user');
            },
            myMessage(){
                this.$router.push('/myMessage');
            },
            goRouter(item){
                this.$router.push({path: item, query: {}});
            },
            getData(){
                const expireTime = sessionStorage.getItem('expireTime');
                const nowTime = new Date().getTime();
                if(expireTime && nowTime < expireTime){
                    this.isLogin = true;
                    this.initWebSocket();
                }else{
                    this.isLogin = false;
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
                    console.log('失败')
                    console.log(err);
                });
            },    //连接 后台
            disconnect() {
                if (this.stompClient) {
                    this.stompClient.disconnect();
                }
            },  // 断开连接
        },
        created(){
            this.userName = sessionStorage.getItem('userName');
            this.getData();
        }
    }
</script>
<style lang="less">
    .haloCenterHeader {
        position: relative;
        background-color: #fff;
        display: flex;
        justify-content: center;
        border-bottom: 0.5px solid #f3f3f3;

    .center-header {
        background-color: #fff;
        padding: 20px 0;
        width: 1100px;
        display: flex;
        justify-content: space-between;


    .header-left {
        cursor: pointer;
        display: flex;

    .header-left-name {
        margin-top: 8px;

    p:first-child {
        color: #666;
        font-size: 24px;
        font-family: "微软雅黑", Arial, Helvetica, sans-serif;
    }

    }
    }
    .header-right {
        display: flex;
        align-items: center;

    .el-input {
        width: 200px;
        margin-right: 20px;
    }

    .header-right-nav {
        margin-right: 50px;

        ul{
            display: flex;
            li{
                color: #666;
                margin-right: 20px;
                cursor: pointer;
                &:hover{
                    color: #00a7ea;
                 }
            }
        }
    }
    .header-right-user {
        width: 200px;

        span{
            color: #666;
            &:hover{
                 color: #00a7ea;
             }
        }
        .header-right-user-name{
            cursor: pointer;
            position: relative;
            top:3px;
            font-size: 15px;
            display: inline-block;
            width: 90px;
            overflow-x: hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }
        .header-right-user-tip,.header-right-user-logout{
            font-size: 14px;
            cursor: pointer;
            margin-left: 10px;
        }
    }
    }
    }
    }
</style>