<template>
  <div>
    <div class="userInfo">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="form">
        <p class="tips">用户名提交后不可更改</p>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" id="username"></el-input>
        </el-form-item>

        <p class="tips">密码长度为 8-16 位，至少包含字母、数字和符号中的两种类型</p>
        <el-form-item prop="loginPwd">
          <el-input type="password" v-model="loginForm.loginPwd" placeholder="密码" id="password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="next()" style="height:36px">提交</el-button>
      </el-form>

    </div>
  </div>
</template>
<script>
  import vButton from '../common/nextButton';
  import qs from 'qs';
  import { JSEncrypt } from 'jsencrypt';
export default {

  data() {
    var validateUsername = (rule, value, callback) => {
      if (this.loginForm.username === "") {
        callback(new Error('请填写用户名'));
      }
      else callback()
    };
    var validatePassword = (rule, value, callback) => {
      var reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,16}$/;
      if (reg.test(value)){
        callback();
      }
      else {
        callback(new Error("密码格式不准确"));
      }
    };
    return {
      loginForm: {
        phone: "",
        username: "",
        pwd: "",
        loginPwd:''
      },
      rules: {
        username: [
          {required: true, validator: validateUsername, trigger: "blur"}
        ],
        loginPwd: [
          {required: true, validator: validatePassword, trigger: "blur"}
        ]
      },
      publicDer:''
    }
  },
  components: {
    vButton
  },
  methods: {
    goRouter(that) {
      this.$router.push({path: "/" + that});
    },
    check(){
      const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,20}$/;
      return reg.test(this.loginForm.pwd);
    },
    next() {
      this.loginForm.phone = this.$route.query.phone;
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.publicDer);
      this.loginForm.pwd = encrypt.encrypt(this.loginForm.loginPwd);
        var url = this.$rootUrl + "/api/user/registerByPhone";
        const option = {
          method: 'POST',
          url: url,
          data: {
            username:this.loginForm.username,
            phone: this.loginForm.phone,
            pwd: this.loginForm.pwd
          }
        };
        this.$axios(option).then((res) => {
          let item = res.data.data;
          if (item.errorCode == 0) {
            this.$message({
              message: '注册成功',
              type: 'success'
            });
            this.$store.commit('LOGIN', {
              username: userInfo.username,
              avatar: userInfo.avatar,
              phone:userInfo.phone,
              token:item.token
            });
            sessionStorage.setItem('token',item.token);
            sessionStorage.setItem('userName',userInfo.username);
            sessionStorage.setItem('avatar',userInfo.avatar);
            sessionStorage.setItem('expireTime', (new Date().getTime() + 58 * 60 * 1000));
            let pageHistory = sessionStorage.getItem('pageHistory');
            if (pageHistory) {
              this.$router.push({path: pageHistory});
            } else {
              this.$router.push({path: "/"});
            }
          }
          else {
            this.$message.error(item.msg);
          }
      })
    },
    publicKey(){
      var url = this.$rootUrl + "/api/user/publicKey";
      const options = {
        method: 'GET',
        url: url,
        data: {}
      };
      this.$axios(options).then((res) => {
        let item = res.data.data;
        if (item.errorCode == 0) {
          this.publicDer = item.data;
        }
      })
    }
  },
  created(){
    this.loginForm.phone = this.$route.query.phone;
    this.publicKey();
  }
}
</script>
<style>
  .tips{
    font-size: 12px;
    line-height: 20px;
    color: #666;

  }
  .userInfo{
    width: 90%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
  .login{
    font-size: 14px;
    color: #409EFF;
    cursor: pointer;
    position: absolute;
  }
</style>
