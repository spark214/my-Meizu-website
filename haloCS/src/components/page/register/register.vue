<template>
  <div id="reg_wrap">
    <el-container>
      <el-main id="login_main">
        <el-container id="login_container">
          <el-header id="login_container_header">
            <p>Halo. 注册账号</p>
          </el-header>
          <el-container id="login_container_main">
            <div class="content">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
              <el-form-item>
                <a @click="" class="loginButton">登录</a>
              </el-form-item>
            </div>
          </el-container>
        </el-container>
      </el-main>
      <el-footer style=" height: 40px;">&copy;2018 Halo Telecom Equipment Co., Ltd. All rights reserved.</el-footer>
    </el-container>
  </div>
</template>
<script>
  import rPhone from './page/phone';

  var code;
  export default {
    data: function () {

      return {
        loginForm: {
          phone:'',
          userId: "",
          password: "",
          yzcode: "",
        },

        checkCode: "",
        rules: {
          userId: [
            {required: true, message: "请输入用户名", trigger: "blur"}
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"}
          ],

        }
      };
    },
    components: {
      rPhone,
    },
    methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            // this.$axios.get(this.$rootUrl+"/message/list",{}).
            // then((res)=>{
            //   if(res.data[0].content==='demo'){
            localStorage.setItem('ms_userId', this.loginForm.userId);
            this.$router.push({path: '/'});
            //     }else {
            //       console.log('error json!!');
            //       return false;
            //     }
            // } )
            //

          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
    }
  }
</script>
<style lang="less">
  #reg_wrap{
    padding: 0;
    margin: 0;
    list-style: none;
    font-family: "微软雅黑", Arial, Helvetica, sans-serif;

  .el-container {
    position: relative;
  }

  #login_main {
    background: linear-gradient(to bottom, #f8fcff, #f8fcff, #f8fcff);
    min-height: 750px;
    max-height: 1080px;
    position: relative;
  }

  #login_main:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../../../../static/img/login_banner.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

  }

  #login_container {
    width: 350px;
    height: 400px;
    background: white;
    position: relative;
    top: 100px;
    left: 60%;
  }

  #login_container_header {
    height: 110px !important;
    color: rgb(12, 187, 239);
    font-size: 20px;
    text-align: center;
    line-height: 120px;
  }

  .el-input, .el-button {
    width: 300px;
    height: 46px;
  }

  #login_container_main {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 40px;
  }

  .el-footer {
    bottom: 0;
    text-align: center;
    background-color: #ffffff;
    width: 100%;
    line-height: 40px;
    font-size: 12px;
  }

  @media screen and (max-width: 960px) {
    body {
      width: 1080px;
    }
  }
  .loginButton {
    font-size: 14px;
    color: #409EFF;
    cursor: pointer;
    position: absolute;

  }


  }
</style>
