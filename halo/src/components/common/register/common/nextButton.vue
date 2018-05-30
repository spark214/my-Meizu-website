<template>
  <div>
    <el-button type="primary" size="medium" @click="next()">{{content}}</el-button>
    <el-form-item>
      <a @click="next('login')" class="login">登录</a>
    </el-form-item>
  </div>
</template>
<script>
  export default {
    props: {
      content: {
        type: [String]
      },
      route: {
        type: [String]
      }
    },
    methods: {
      next() {
        if (this.route == 'go')
          this.$router.go(-3);
        else
          this.$router.push({path: "/" + this.route});
      }
    }
  }
</script>
<style>
  .login {
    font-size: 14px;
    color: #409EFF;
    cursor: pointer;
    position: absolute;

  }

  .el-button {
    height: 35px;
  }
</style>
