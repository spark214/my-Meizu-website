<template>
  <div id="login_wrap">
    <el-container>
      <el-main id="login_main">
        <el-container id="login_container">
          <el-header id="login_container_header">
            <p>Halo. 注册</p>
          </el-header>
          <el-container id="login_container_main">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="userId">
                <el-input v-model="loginForm.userId" placeholder="Halo. 员工ID"></el-input>
              </el-form-item>

              <el-form-item prop="password">
                <el-input placeholder="密码" type="password" v-model="loginForm.password"
                          @keyup.enter.native="submitForm('loginForm')"></el-input>
              </el-form-item>

              <el-form-item prop="yzcode">
                <el-input v-model="loginForm.yzcode"></el-input>
                <input type="button" id="code" @click="createCode" class="verification1" v-model="checkCode"/>
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
  var code;
  export default {
    data: function () {
      var validatePass = (rule, value, callback) => {
        var check=value.toUpperCase();
        if (value == '') {
          callback(new Error('请输入验证码'));
        }
        else if (check == this.checkCode) {
          callback();

        }
        else {
          callback(new Error('验证码错误'));
          console.log(this.checkCode)
          console.log(value)
        }
      };
      return {
        loginForm: {
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
          yzcode:[
            {required:true,validator:validatePass,trigger:'blur'}
          ]

        }
      };
    },
    components: {},
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
      // 图片验证码
      createCode() {
        code = "";
        var codeLength = 4;//验证码的长度
        var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
          'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//随机数
        for (var i = 0; i < codeLength; i++) {//循环操作
          var index = Math.floor(Math.random() * 36);//取得随机数的索引（0~35）
          code += random[index];//根据索引取得随机数加到code上
        }
        this.checkCode = code;//把code值赋给验证码
      },
      // 失焦验证图和密码
      checkLpicma() {

        this.yzcode.toUpperCase();//取得输入的验证码并转化为大写
        if (this.yzcode == '') {
          $(".login_content1 span:eq(2)").text("请输入验证码")
          $(".login_content1 span:eq(2)").removeClass("disappear");

        } else if (this.picLyanzhengma.toUpperCase() != this.checkCode) { //若输入的验证码与产生的验证码不一致时
          console.log(this.picLyanzhengma.toUpperCase())
          console.log(code)
          $(".login_content1 span:eq(2)").text("验证码不正确")
          $(".login_content1 span:eq(2)").removeClass("disappear");
          this.createCode();//刷新验证码
          this.picLyanzhengma = '';
        } else { //输入正确时
          $(".login_content1 span:eq(2)").addClass("disappear");
          $(".login_content1 span:eq(2)").text("请输入验证码")
          return true;

        }

      },
    },
    created() {
      this.createCode();
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
