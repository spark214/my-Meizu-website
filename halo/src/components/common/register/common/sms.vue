<template>
  <div>
    <el-container id="login_container_main">
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" placeholder="短信验证码" @change="send"></el-input>
        <el-button @click="countDown" :class="{disabled:!canClick}" class="button_sms" >{{content}}</el-button>
      </el-form-item>
      <el-button type="primary" size="medium" @click="next()">下一步</el-button>
      <el-form-item>
        <a @click="next('login')" class="login">登录</a>
      </el-form-item>
    </el-form>
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
  import bus from "../../../common/bus";
  import qs from 'qs';
  export default {
    data() {
      return {
        loginForm: {
          phone:"",
          code: ''
        },
        rules: {
          sms: [
            {required: true, message: '请输入短信验证码', trigger: "blur"}

          ],
        },

        content: '点击发送验证码',
        totalTime: 60,
        canClick: true,
        count:0,
        dialogVisible: false,
      }
    },
    methods: {
      next() {
        var url = this.$rootUrl + "/api/halo/registers/verifyCode";
        const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          url: url,
          data: qs.stringify(this.loginForm)
        };
        this.$axios(options).then((res) => {
          if (res.data.data) {
            if (res.data.errorCode == 0) {
              this.$router.push({path: '/userinfo', query: {phone: this.loginForm.phone}});
            }
            else {
              this.$message.error(res.data.msg);
            }
          }
        })
      },
      countDown() {
        if (!this.canClick) return
        this.canClick = false
        this.content = this.totalTime + "s后重新发送"
        this.count=1
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
        var phone = this.$route.query.phone
        var url = this.$rootUrl + "/api/halo/registers/requestSmsCode/" + phone;
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
    created(){
      this.loginForm.phone = this.$route.query.phone
    }
  }
</script>
<style>
  .disabled{
    background-color: #ddd;
    border-color: #ddd;
    color:#57a3f3;
    cursor: not-allowed;
  }
  .el-button,.el-input{
    height: 35px;
    width: 100%;
  }
  .button_sms{
    margin-top: 20px;
  }
  .login {
    font-size: 14px;
    color: #409EFF;
    cursor: pointer;
    position: absolute;

  }
</style>
