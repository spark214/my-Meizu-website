<template>
    <div class="haloCenterHeader">
        <div class="header">
            <div class="header-left">
                <img src="../../../../../static/img/halo-230-40-blue.png" width="180px" height="35px">
                <div class="header-left-name">
                    <p>社区</p>
                </div>
            </div>
            <div class="header-right">
                <div class="header-right-nav">
                    <ul>
                        <li>商城</li>
                        <li>产品讨论</li>
                        <li>闲置交易</li>
                        <li>建议反馈</li>
                    </ul>
                </div>
                <div class="header-right-search">
                    <el-input v-model="searchKey" suffix-icon="el-icon-search" placeholder="搜索"></el-input>
                </div>
                <div class="header-right-user">
                    <span class="header-right-user-name"><span v-if="userName !== ''" style="color: #666;cursor: default">hi, </span>{{userName}}</span>
                    <span class="header-right-user-tip">消息</span>
                    <span class="header-right-user-logout" v-if="userName !== ''">登出</span>
                    <span class="header-right-user-logout" v-if="userName === ''">登录</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash';
    export default{
        name: "haloCenter_Header",
        props:{
            userName:{
                type:String,
                default:''
            }
        },
        data(){
            return {
                searchKey: '',
            }
        },
        methods: {
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
        },
        created(){

        }
    }
</script>
<style lang="less">
    .haloCenterHeader {
        background-color: #fff;

    .header {
        margin: auto;
        background-color: #fff;
        padding: 20px 0;
        width: 1100px;
        display: flex;
        justify-content: space-between;
        border-bottom: 0.5px solid #f3f3f3;

    .header-left {
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
            width: 100px;
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