<template>
  <div class="header">
    <div class="header_logo"><img src="../../../static/img/halo-230-40-blue.png"></div>
    <div class="header_right">
      <div class="header_right_container">
        <!--全屏按钮-->
        <div class="header_right_btnFullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" placement="bottom" :content="fullscreen?`取消全屏`:`全屏`">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!--用户名-->
        <el-dropdown class="header_right_user_username" trigger="click" @command=" handleCommand">
          <span class="el-dropdown-link">
           Hello, admin&nbsp;&nbsp;<i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      username: '',
      fullscreen: false,
    }),
    methods: {
      //全屏操作
      handleFullScreen() {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      },
      // 用户名下拉菜单选择事件
      handleCommand(command) {
        if (command == 'loginout') {
          const url = this.$rootUrl + "/api/ms/logout";

          const options = {
            method: 'GET',
            url: url,
            data: {}
          };

          this.$axios(options).then((res) => {
            let item = res.data.data;
            if (item.code == 0) {
              this.$router.push('/login');
            }
          })
        }
      },
    },
    created(){

    }

  }
</script>
<style>
  .header {
    position: relative;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
    background-color: #242f42;
  }

  .header_logo img {
    width: 120px;
    height: 24px;
  }

  .header_logo {
    float: left;
    line-height: 70px;
    margin-left: 25px;
  }

  .el-icon-rank {
    font-size: 24px;
    transform: rotate(45deg);
    padding-top: 2px;
  }

  .el-dropdown-link {
    font-size: 18px;
    color: #fff;
    cursor: pointer;
  }

  .header_right {
    float: right;
    margin-right: 50px;

  }

  .header_right_container {
    display: flex;
    align-items: center;
    height: 70px;
    width: 200px;
    justify-content: space-between;
  }

  .header_right_btnFullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }
</style>
