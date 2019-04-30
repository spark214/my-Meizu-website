<template>
    <div class="cartShow">
        <el-dropdown trigger="hover" placement="bottom">
          <span class="el-dropdown-link">
        <img src="../../../../../static/img/shoppingCart.png" width="22px">
          </span>
            <el-dropdown-menu slot="dropdown">
                <div class="shopcartDropdown_none" v-show="!isLogin && !havaCart">
                    <img src="../../../../../static/img/shopcartPanda.png">
                    <span>登录后可显示<br>您账号中加入的商品哦</span>
                </div>
                <div class="shopcartDropdown_none" v-show="isLogin && !havaCart">
                    <img src="../../../../../static/img/shopcartPanda2.png">
                    <span>您的购物车还没有商品,<br>赶紧去选购吧~</span>
                </div>
                <div class="shopcartDropdown" v-show="havaCart">
                    <p class="cartdown_header">最近加入的商品</p>
                    <ul class="clearfix">
                        <li v-for="item in form">
                            <div class="clearfix">
                                <div class="cartdown_left clearfix">
                                    <img :src='item.imgUrl' width="48px">
                                    <div class="cartdown_left_msg">
                                        <p>{{item.title}}</p>
                                    </div>
                                </div>
                                <div class="cartdown_right">
                                    <p>{{item.price}}×{{item.number}}</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="cartdown_footer clearfix">
                        <el-button type="primary" size="small" @click="goRouter('mallcart')">去购物车</el-button>
                    </div>
                </div>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
    import bus from "../../../common/bus";

    export default {
        data() {
            return {
                form: [],
                isLogin: false,
                havaCart: false,
                cart: 0
            }
        },
        methods: {
            getData() {
                var url = this.$rootUrl + "/api/carts/getCart";
                const options = {
                    method: 'GET',
                    url: url,
                    data: {}
                };

                this.$axios(options).then((res) => {
                    let item = res.data.data;
                if (item.errorCode == 0) {
                    this.form = item.data.cart.carts;
                    if (this.form.length > 0) {
                        this.havaCart = true;
                    }
                    else {
                        this.haveCart = false;
                    }
                }else if (item.errorCode == 403) {
                    sessionStorage.setItem('pageHistory', this.$route.fullPath);
                    this.$router.push({path: "/login"});
                    throw item.msg;
                } else {
                    throw item.msg;
                }
            }).catch(errorMsg => {
                    this.$message.error(errorMsg);
            });
            },
            goRouter(that) {
                this.$router.push({path: "/" + that});
            },
            checkLogin(){
                const expireTime = sessionStorage.getItem('expireTime');
                const nowTime = new Date().getTime();
                if(expireTime && nowTime < expireTime){
                    this.isLogin = true;
                }
            }
        },
        watch: {
            cart() {
                this.getData();
            }
        },
        created() {
            this.getData();
            this.checkLogin();
            bus.$on("cart", msg => {
                this.cart = msg
        })
        }
    }
</script>
<style>
    .cartShow {
        width: 30px;

    }

    .shopcartDropdown_none {
        width: 318px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .shopcartDropdown {
        width: 318px;
        height: 120px;
    }

    .shopcartDropdown_none span {
        margin-left: 15px;
        font-size: 12px;
        color: #999;
    }

    .shopcartDropdown ul {
        width: 100%;
        font-size: 12px;
        margin-top: 15px;
        border-bottom: 0.5px solid #DCDCDC;
    }

    .shopcartDropdown li {
        color: #515151;
    }

    .shopcartDropdown li:hover {
        color: #32A5E7;
    }

    .cartdown_left {
        width: 250px;
    }

    .cartdown_left img {
        margin-left: 10px;
        float: left;
    }

    .cartdown_left p {
        margin-top: 5px;
    }

    .cartdown_left_msg {
        width: 150px;
        float: left;
    }

    .cartdown_right {
        width: 20%;
        float: right;
        position: relative;
        top: -42px;
    }

    .cartdown_header {
        color: #666666;
        font-size: 12px;
        margin-top: 15px;
        margin-left: 15px;
    }

    .cartdown_footer {
        background-color: #fafafc;
    }

    .cartdown_footer .el-button {
        float: right;
        margin-top: 15px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
</style>
