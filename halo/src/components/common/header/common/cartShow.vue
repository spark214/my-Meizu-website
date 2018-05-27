<template>
  <div>
    <el-dropdown trigger="hover" @command=" handleCommand" placement="bottom">
          <span class="el-dropdown-link">
        <img src="../../../../../static/img/shoppingCart.png" width="24px">
          </span>
      <el-dropdown-menu slot="dropdown">
        <div class="shopcartDropdown_none" v-if="!isLogin">
          <img src="../../../../../static/img/shopcartPanda.png">
          <span>登录后可显示<br>您账号中加入的商品哦</span>
        </div>
        <div class="shopcartDropdown_none" v-if="isLogin&&!havaCart">
          <img src="../../../../../static/img/shopcartPanda2.png">
          <span>您的购物车还没有商品,<br>赶紧去选购吧~</span>
        </div>
        <div class="shopcartDropdown" v-if="isLogin&&havaCart">
          <p class="cartdown_header">最近加入的商品</p>
          <ul class="clearfix">
            <li>
              <div class="clearfix">
                <div class="cartdown_left clearfix">
                  <img :src='form.desc[0].img' width="48px">
                  <div class="cartdown_left_msg">
                    <p>{{form.name}}</p>
                    <p>{{form.desc[0].name}}</p>
                  </div>
                </div>
                <div class="cartdown_right">
                  <p>{{form.price}}×{{form.buyCount}}</p>
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
  export default {
    data() {
      return {
        form: {},
        isLogin: true,
        havaCart: true,
      }
    },
    methods: {
      data() {
        var name = "form=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1);

          if (c.indexOf(name) != -1) {
            console.log(c)
            this.form = JSON.parse(c.substring(name.length, c.length));
          }
        }
      },
      goRouter(that) {
        this.$router.push({path: "/" + that});
      },
    },
    mounted() {
      this.data()
    }
  }
</script>
<style>
  .shopcartDropdown_none{
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
  }

  .shopcartDropdown li {
    border-bottom: 0.5px solid #DCDCDC;
    color: #515151;
  }

  .shopcartDropdown li:hover {
    color: #32A5E7;
  }

  .cartdown_left {
    width: 50%;
  }

  .cartdown_left img {
    margin-left: 10px;
    float: left;
  }

  .cartdown_left p {
    margin-top: 5px;
  }

  .cartdown_left_msg {
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
