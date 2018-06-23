<template>
  <div>
    <el-button type="primary" size="medium" @click="next()">{{content}}</el-button>
    <el-form-item>
    </el-form-item>
  </div>
</template>
<script>
  import bus from "../../../common/bus";
  export default {
    props: {
      content: {
        type: [String]
      },
      route: {
        type: [String]
      }
    },
    data(){return{
      form:{
        phone:"",
        code: ''
      }
    }},
    methods: {
      next() {
        if (this.route == 'go'){
          var url = this.$rootUrl + "/api/halo/registers/registerByPhone";
          const option = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            url: url,
            data: qs.stringify(this.loginForm)
          };
          this.$axios(option).then((res) => {
            if (res.data.data) {
              if (res.data.errorCode == 0) {
                sessionStorage.setItem('accessToken',res.data.data.access_token)
              }
              else {
                this.$message.error(res.data.msg);
              }
            }
          })
          this.$router.go(-3);
        }


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
