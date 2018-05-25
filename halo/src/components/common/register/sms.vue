<template>
  <div>
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <el-form-item prop="sms">
        <el-input v-model="loginForm.sms" placeholder="短信验证码"></el-input>
      </el-form-item>


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
        rules:{
          sms: [
            {required: true, message:'请输入短信验证码', trigger: "blur"}

          ],
        }
      }
    }
  }
</script>
