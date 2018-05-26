<template>
  <div class="smsCheck">
    <p class="tips">我们已发送一条验证码至您的手机号码，请输入短信中的验证码</p>
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <el-form-item prop="sms">
        <el-input v-model="loginForm.sms" placeholder="短信验证码"></el-input>
        <el-button @click="countDown" :class="{disabled:!canClick}"  >{{content}}</el-button>
      </el-form-item>
      <el-button type="primary" size="medium" @click="next('userinfo')">下一步</el-button>
      <a @click="goRouter('login')" class="login">登录</a>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loginForm: {
          sms: ''
        },
        rules: {
          sms: [
            {required: true, message: '请输入短信验证码', trigger: "blur"}

          ],
        },
        content: '点击发送验证码',
        totalTime: 60,
        canClick: true,
        count:0
      }
    },
    methods: {
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
      },
      next(that){
        this.$router.push({path: "/" + that});
      }
    },
    created(){
      this.countDown()
    }
  }
</script>
<style scoped>
  .el-button{
    height: 35px;
  }
  .tips{
    font-size: 12px;
    line-height: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
  }
  .smsCheck{
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
  }
  .disabled{
    background-color: #ddd;
    border-color: #ddd;
    color:#57a3f3;
    cursor: not-allowed;
  }

</style>
