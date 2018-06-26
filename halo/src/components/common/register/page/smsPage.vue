<template>
  <div class="smsCheck">
    <p class="tips">我们已发送一条验证码至您的手机号码，请输入短信中的验证码</p>
    <v-sms :type="0"></v-sms>
  </div>
</template>
<script>
  import vButton from "../common/nextButton";
  import vSms from "../common/sms";
  import bus from "../../../common/bus";

  export default {
    data() {
      return {
        form: {}
      }
    },
    components: {
      vButton, vSms
    },
    methods: {

    }
  }
</script>
<style scoped>
  .el-button {
    height: 35px;
  }

  .tips {
    font-size: 12px;
    line-height: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .smsCheck {
    width: 90%;
    position: relative;
    left: 5%;
  }


</style>
