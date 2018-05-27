<template>
  <div>
    <el-container id="login_container_main">
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <el-form-item prop="sms">
        <el-input v-model="loginForm.sms" placeholder="短信验证码"></el-input>
        <el-button @click="countDown" :class="{disabled:!canClick}" class="button_sms" >{{content}}</el-button>
      </el-form-item>
    </el-form>
    </el-container>
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

    },
    created(){
      this.countDown()
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
</style>
