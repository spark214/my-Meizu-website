<template>
  <div id="login_wrap">
    <el-container>
      <el-main id="login_main">
        <el-container id="login_container">
          <el-header id="login_container_header">
            <div class="login_box_header">
              <a style="margin-right: 20px" @click="accLogin=true" :class="{on:accLogin}">账号登陆</a> |
              <a style="margin-left: 20px" @click="accLogin=false" :class="{on:!accLogin}">验证码登陆</a>
            </div>
          </el-header>
          <el-container id="login_container_main">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" class="form_main">
              <el-form-item prop="phone">
                <el-input v-model="loginForm.phone" placeholder="手机号" @change="vp()"></el-input>
                <p style="color:#e22841;font-size: 12px">{{errormsg}}</p>
              </el-form-item>
              <el-form-item prop="pwd" v-show="accLogin">
                <el-input placeholder="密码" type="password" v-model="loginForm.pwd"
                          @keyup.enter.native=""></el-input>
              </el-form-item>

              <el-container id="login_container_mains" v-show="!accLogin">
                <el-form :model="loginFormMsg" :rules="rules" ref="loginFormMsg">
                  <el-form-item prop="code">
                    <el-input v-model="loginFormMsg.code" placeholder="短信验证码" @change="send"></el-input>
                    <el-button @click="countDown" :class="{disabled:!canClick}" class="button_sms">{{content}}</el-button>
                  </el-form-item>
                </el-form>
              </el-container>

              <v-code @codeAva="getAva" v-show="accLogin"></v-code>
              <el-checkbox v-show="accLogin">记住密码</el-checkbox>
              <el-form-item>
                <el-button type="primary" @click="check()">登录</el-button>
              </el-form-item>
              <el-form-item>
              <a @click="goRouter('register')" class="login">注册</a>
              </el-form-item>
            </el-form>

          </el-container>

        </el-container>
      </el-main>
      <el-footer style=" height: 40px;">&copy;2018 Halo Telecom Equipment Co., Ltd. All rights reserved.</el-footer>
    </el-container>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible">
      <p>{{errormsg}}</p>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import vCode from "../common/register/common/vCode";
  import vSms from "../common/register/common/sms";
  import qs from 'qs';
  export default {
    data: function () {
      return {
        loginForm: {
          phone: "",
          pwd: "",
        },
        loginFormMsg: {
          phone: "",
          code: ''
        },
        rules: {
          phone: [
            {required: true, message: "请输入手机号码", trigger: "blur"}
          ],
          pwd: [
            {required: true, message: "请输入密码", trigger: "blur"}
          ],
          sms: [
            {required: true, message: '请输入短信验证码', trigger: "blur"}

          ],

        },
        codeAva: false,
        accLogin: true,
        errormsg:"",
        content: '点击发送验证码',
        totalTime: 60,
        canClick: true,
        count: 0,
        dialogVisible: false,
      };
    },
    methods: {
      vp() {
        var data = this.loginForm.phone;
        var url = this.$rootUrl + "/api/halo/auths/verifyPhone/" + data;
        const options = {
          method: 'GET',
          url: url,
          data: {}
        };

            this.$axios(options).then((res) => {
              if (res.data.errorCode == 0) {

              } else {
                this.errormsg = res.data.msg;
              }
            })
      },
      check(){
        if(this.accLogin){
          var url = this.$rootUrl + "/api/halo/auths/loginByPwd";
          const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url: url,
            data: qs.stringify(this.loginForm)
          };
          this.$axios(options).then((res) => {
            if (res.data.data) {
              if (res.data.errorCode == 0) {
                sessionStorage.setItem('accessToken',res.data.data.access_token)
                this.$router.push({path: "/"});
              }
              else {
                this.errormsg=res.data.msg;
              }
            }
          })
        }
        else{
          var url = this.$rootUrl + "/api/halo/auths/loginByCode ";
          this.loginFormMsg.phone=this.loginForm.phone
          const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url: url,
            data: qs.stringify(this.loginFormMsg)
          };
          this.$axios(options).then((res) => {
            if (res.data.data) {
              if (res.data.errorCode == 0) {
                sessionStorage.setItem('accessToken',res.data.data.access_token)
                this.$router.push({path: "/"})
              }
              else {
                this.errormsg=res.data.msg;
              }
            }
          })

        }
      },
      getAva(msg) {
        this.codeAva = msg
      },
      goRouter(that) {
        this.$router.push({path: "/" + that});
      },
      countDown() {
        if (!this.canClick) return
        this.canClick = false
        this.content = this.totalTime + "s后重新发送"
        this.count = 1
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content = this.totalTime + "s后重新发送"
          console.log(this.totalTime)
          if (this.totalTime <= 0) {
            window.clearInterval(clock)
            this.content = '重新发送验证码'
            this.totalTime = 60
            this.canClick = true
          }
        }, 1000)
        var phone = this.loginForm.phone
          var url = this.$rootUrl + "/api/halo/auths/requestSmsCode/" + phone;
        const options = {
          method: 'GET',
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          url: url,
          data: {}
        };
        this.$axios(options).then((res) => {
          if (res.data.data) {
            if (res.data.errorCode != 0) {
              this.errormsg = res.data.msg;
              this.dialogVisible = true
            }
          }
        })
      },

    },
    components: {
      vCode, vSms
    }
  }
</script>
<style scoped>
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
    background: url("http://p9f6ljki4.bkt.clouddn.com/login_banner.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

  }

  #login_container {
    width: 350px;
    height: 420px;
    background: white;
    position: relative;
    top: 100px;
    left: 60%;
  }

  #login_container_header {
    height: 100px !important;
    color: #999;
    font-size: 16px;
    text-align: center;
    line-height: 120px;

  }

  #login_container_header a {
    color: #999 ;
    cursor: pointer;
  }

  .on {
    color: #32A5E7 !important;
  }

  .el-input, .el-button {
    width: 300px;
    height: 46px;
  }

  #login_container_main {
    position: absolute;
    left: 50%;
    top: 65%;
    transform: translate(-50%,-50%);
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
  .login{
    position: relative;
    top: -10px;
    font-size: 14px;
    color: #409EFF;
    cursor: pointer;
  }
  .button_sms {
    margin-top: 20px;
  }
  .disabled {
    background-color: #ddd;
    border-color: #ddd;
    color: #57a3f3;
    cursor: not-allowed;
  }
</style>
