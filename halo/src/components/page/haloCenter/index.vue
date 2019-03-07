<template>
    <div class="haloCenter">
        <div class="header">
            <div class="header-left">
                <img src="../../../static/img/halo-230-40-blue.png" width="180px" height="35px">
                <div class="header-left-name">
                    <p>社区</p>
                </div>
            </div>
            <div class="header-right">
                <div class="header-right-search">
                    <el-input v-model="searchKey" suffix-icon="el-icon-search"></el-input>
                </div>
                <div class="header-right-user">
                    <el-dropdown trigger="hover" placement="bottom">
                        <span class="el-dropdown-link" @click="">
                            <img src="../../../../../static/img/user.png" width="24px">
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="login" v-if="!isLogin">立即登录</el-dropdown-item>
                            <el-dropdown-item command="register" divided v-if="!isLogin">立即注册</el-dropdown-item>

                            <el-dropdown-item command="myorder" v-if="isLogin">我的订单</el-dropdown-item>
                            <el-dropdown-item command="loginout" divided v-if="isLogin">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash';
    export default{
        name: "haloCenter",
        data(){
            return {
                searchKey: '',
            }
        },
        methods: {},
        created(){

        }
    }
</script>
<style lang="less">
    .haloCenter {

    .header {
        padding: 20px;
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

    .el-input {
        width: 200px;
    }

    }
    }
    }
</style>