<template>
  <div>
    <div class="phoneChecck">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="form">
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" placeholder="手机号码" id="phone"></el-input>
        </el-form-item>

        <v-code @codeAva="getAva"></v-code>

      </el-form>
      <p class="tips">点击立即注册，即表示您同意并愿意遵守 Halo服务协议 和 法律声明</p>
      <el-button type="primary" size="medium" @click="next('sms')">立即注册</el-button>
      <a @click="goRouter('login')" class="login">登录</a>
    </div>
  </div>
</template>
<script>
  import vCode from "../common/vCode";

  var code;
  export default {

    data() {
      var validatePhone = (rule, value, callback) => {
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if (value === '') {
          callback(new Error('请输入手机号码'));
        }
        else if (reg.exec(value) != null) {
          callback();
        }
        else {
          callback(new Error('无效手机号码'));
        }

      };
      return {
        loginForm: {
          phone: '',
        },
        rules: {
          phone: [
            {required: true, validator: validatePhone, trigger: "blur"}
          ]
        },
        codeAva: false,
      }
    },
    components: {
      vCode
    },
    methods: {
      goRouter(that) {
        this.$router.push({path: "/" + that});
      },
      next(that) {

        if (this.loginForm.phone !== "" && this.codeAva) {
          this.$router.push({path: "/" + that});
        }
        else {
          document.getElementById("phone").focus()
          document.getElementById("yzcode").focus()

        }
      },
      getAva(msg) {
        this.codeAva = msg
      }
    },
    computed: {}

  }
</script>
<style scoped>
  .tips {
    font-size: 12px;
    line-height: 20px;
    margin-top: 20px;
  }

  .phoneChecck {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }

  .el-button {
    margin-top: 20px;
  }

  .verification1 {
    background-color: #fff;
    width: 100px;
    height: 32px;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    cursor: pointer;
  }

  .login {
    font-size: 14px;
    color: #409EFF;
    cursor: pointer;
  }
</style>
