<template>
  <div>
    <div class="userInfo">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="form">
        <p class="tips">用户名提交后不可更改</p>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" id="username"></el-input>
        </el-form-item>

        <p class="tips">密码长度为 8-16 位，至少包含字母、数字和符号中的两种类型</p>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="密码" id="password"></el-input>
        </el-form-item>
      </el-form>

      <v-button content="提交" route="go"></v-button>
    </div>
  </div>
</template>
<script>
  import vButton from '../common/nextButton';
export default {
  data(){
    var validateUsername = (rule, value, callback) => {
      if(this.loginForm.username===""){
        callback(new Error('请填写用户名'));
      }
      else callback()
    };
    var validatePassword = (rule, value, callback) => {
      var reg = /^(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/;
      if(reg.exec(value)!=null)  callback();
      else callback(new Error("密码格式不准确"));
    };
    return{
      loginForm:{
        username:"",
        password:""
      },
      rules:{
        username: [
          {required: true, validator: validateUsername, trigger: "blur"}
        ],
        password:[
          {required: true, validator: validatePassword, trigger: "blur"}
        ]
      }
    }
  },
  components:{
    vButton
  },
  methods:{
    goRouter(that) {
      this.$router.push({path: "/" + that});
    },

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
