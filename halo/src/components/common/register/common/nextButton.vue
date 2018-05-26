<template>
  <div>
    <el-button type="primary" size="medium" @click="next('userinfo')">{{content}}</el-button>
    <a @click="next('login')" class="login">登录</a>
  </div>
</template>
<script>
export default {
  props:{
    content:{
      type:[String]
    }
  },
  methods:{
    next(that){
      this.$router.push({path: "/" + that});
    }
  }
}
</script>
<style>
  .login{
    font-size: 14px;
    color: #409EFF;
    cursor: pointer;
  }
  .el-button{
    height: 35px;
  }
</style>
