<template>
  <div>
    <div class="userInfo">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="form">
        <p class="tips">用户名提交后不可更改</p>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" id="username"></el-input>
        </el-form-item>

        <p class="tips">密码长度为 8-16 位，至少包含字母、数字和符号中的两种类型</p>
        <el-form-item prop="pwd">
          <el-input type="password" v-model="loginForm.pwd" placeholder="密码" id="password"></el-input>
        </el-form-item>
        <el-button type="primary" size="medium" @click="next()">提交</el-button>
      </el-form>

    </div>
  </div>
</template>
<script>
  import vButton from '../common/nextButton';
  import qs from 'qs';
export default {

  data() {
    var validateUsername = (rule, value, callback) => {
      if (this.loginForm.username === "") {
        callback(new Error('请填写用户名'));
      }
      else callback()
    };
    var validatePassword = (rule, value, callback) => {
      var reg = /^(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/;
      if (reg.exec(value) != null) callback();
      else callback(new Error("密码格式不准确"));
    };
    return {
      loginForm: {
        phone: "",
        username: "",
        pwd: ""
      },
      rules: {
        username: [
          {required: true, validator: validateUsername, trigger: "blur"}
        ],
        password: [
          {required: true, validator: validatePassword, trigger: "blur"}
        ]
      }
    }
  },
  components: {
    vButton
  },
  methods: {
    goRouter(that) {
      this.$router.push({path: "/" + that});
    },
    next() {
      this.loginForm.phone = this.$route.query.phone
      var url = this.$rootUrl + "/api/halo/registers/registerByPhone";
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        url: url,
        data: this.loginForm
      };
      this.$axios(options).then((res) => {
        if (res.data.data) {
          if (res.data.errorCode == 0) {
            sessionStorage.setItem('accessToken',res.data.data.access_token)
            this.$router.go(-3);
          }
          else {
            this.$message.error(res.data.msg);
          }
        }
      })

    }
  },
  created(){
    this.loginForm.phone = this.$route.query.phone
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
