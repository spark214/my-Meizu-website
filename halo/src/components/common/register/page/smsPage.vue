<template>
  <div class="smsCheck">
    <p class="tips">我们已发送一条验证码至您的手机号码，请输入短信中的验证码</p>
    <v-sms></v-sms>
    <v-button content="下一步"></v-button>
  </div>
</template>
<script>
  import vButton from "../common/nextButton";
  import vSms from "../common/sms";
  export default {
    components:{
      vButton,vSms
    },
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


</style>
