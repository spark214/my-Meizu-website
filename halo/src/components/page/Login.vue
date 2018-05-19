<template>
  <div id="login_wrap">
    <el-container>
      <el-main id="login_main">
        <el-container id="login_container">
          <el-header id="login_container_header">
            <p>Halo. 后台系统登录</p>
          </el-header>
          <el-container id="login_container_main">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="userId">
                <el-input v-model="loginForm.userId" placeholder="Halo. 员工ID"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="密码" type="password" v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')"></el-input>
              </el-form-item>
              <el-checkbox>记住密码</el-checkbox>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </el-container>
        </el-container>
      </el-main>
      <el-footer style=" height: 40px;">&copy;2018 Halo Telecom Equipment Co., Ltd. All rights reserved.</el-footer>
    </el-container>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        loginForm: {
          userId: "",
          password: ""
        },
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
    methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
              // this.$axios.get(this.$rootUrl+"/message/list",{}).
              // then((res)=>{
              //   if(res.data[0].content==='demo'){
                  localStorage.setItem('ms_userId',this.loginForm.userId);
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
      }
    }
  }
</script>
<style>
  * {
    padding: 0;
    margin: 0;
    list-style: none;
    font-family: "微软雅黑", Arial, Helvetica, sans-serif;
  }

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
    background: url("../../../static/img/login_banner.png");
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
    height: 120px !important;
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
</style>
