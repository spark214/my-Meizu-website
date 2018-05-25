<template>
  <div>
    <div class="phoneChecck">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="form">
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" placeholder="手机号码"></el-input>
        </el-form-item>

        <el-form-item prop="yzcode">
          <el-input v-model="loginForm.yzcode" style="width: 195px" placeholder="验证码"></el-input>
          <input type="button" id="code" @click="createCode" class="verification1" v-model="checkCode"/>
        </el-form-item>
      </el-form>
      <p class="tips">点击立即注册，即表示您同意并愿意遵守 Halo服务协议 和 法律声明</p>
      <el-button type="primary" size="medium"><router-link to="/sms" style="color: white">立即注册</router-link></el-button>
    </div>
  </div>
</template>
<script>
  var code;
  export default {

    data() {
      var validatePhone = (rule, value, callback) => {
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if(value===''){
          callback(new Error('请输入手机号码'));
        }
       else if (reg.exec(value) != null) {
          callback();
        }
        else {
          callback(new Error('无效手机号码'));
        }

      };
      var validatePass = (rule, value, callback) => {
        var check = value.toUpperCase();
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
          phone: '',
          yzcode: ''
        },
        checkCode: '',
        rules: {
          phone: [
            {required: true, validator:validatePhone, trigger: "blur"}
          ],
          yzcode: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
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
        this.loginForm.yzcode = '';
        this.checkCode = code;//把code值赋给验证码
      },

    },
    created() {
      this.createCode();
    }

  }
</script>
<style scoped>
  .tips{
    font-size: 12px;
    line-height: 20px;
    margin-top: 30px;
  }
  .phoneChecck{
    width: 90%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
  .el-button{
    margin-top: 20px;
  }
  .verification1{
    background-color: #fff;
    width: 100px;
    height: 32px;
    border: 1px solid #dcdcdc;
    border-radius: 5px;

  }
</style>
