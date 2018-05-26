<template>
  <div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="form">
        <el-form-item prop="yzcode">
          <el-input v-model="loginForm.yzcode" style="width: 195px" placeholder="验证码" id="yzcode"></el-input>
          <el-tooltip class="item" effect="light" content="点击更换验证码" placement="bottom">
            <input type="button" id="code" @click="createCode" class="verification1" v-model="checkCode"/>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
  var code;
export default {
  data(){
    var validatePass = (rule, value, callback) => {
      var check = value.toUpperCase();
      if (value == '') {
        callback(new Error('请输入验证码'));
      }
      else if (check == this.checkCode) {
        this.codeAva=true;
        this.$emit("codeAva",this.codeAva);
        callback();

      }
      else {
        callback(new Error('验证码错误'));
        console.log(this.checkCode)
        console.log(value)
      }
    };
    return{
      loginForm: {
        yzcode: ''
      },
      checkCode: '',
      codeAva: false,
      rules: {
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
<style>
  .verification1 {
    background-color: #fff;
    width: 100px;
    height: 32px;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
