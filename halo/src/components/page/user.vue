<template>
  <div class="user">
    <v-header></v-header>
    <div class="pageContain">
      <div class="pageContain_header">
        <ul>
          <li class="on"><a>账号管理</a></li>
          <li><a>喜币</a></li>
        </ul>
      </div>
      <div class="pageContain_section">
        <div class="section_main clearfix">
          <img src="../../../static/img/21.jpg" width="100px" @mouseenter="showEdit=true" @mouseout="showEdit=false">
          <span class="editPortrait" v-show="showEdit">编辑头像</span>
          <div class="section_main_desc">
            <p>21</p>
            <p class="section_main_desc_account">账号 : <span>21</span></p>
          </div>
        </div>

        <div class="section_safety clearfix">
          <div class="safety_header clearfix">
            <h3 class="safety_title">账号安全</h3>
            <h3 class="safety_level">安全等级 <span> 100</span></h3>
          </div>
          <div class="safety_box">
            <div class="safety_password clearfix safety_div">
              <p class="safety_left">密码</p>
              <p class="safety_right">修改</p>
            </div>
            <div class="safety_mail clearfix">
              <div class=" safety_div" v-show="mailStep==0">
                <p class="safety_left">邮箱</p>
                <span class="have">
                <p>{{filterMail}}</p>
                <p>已验证，可通过邮箱找回密码</p>
              </span>
                <p class="safety_right" @click="mailStep=1">修改</p>
              </div>
              <div class="mail_update" v-show="mailStep!=0">
                <div class="mail_first" v-show="mailStep==1">
                  <h4 class="mail_title">修改邮箱第一步</h4>
                  <el-form :model="mailForm" :rules="rules" ref="mailForm" class="mailForm">
                    <el-form-item prop="old">
                      <span class="label">当前邮箱</span> <span>{{filterMail}}</span>
                    </el-form-item>
                    <el-form-item prop="sms1">
                      <span class="label">邮件验证码</span>
                      <el-input v-model="mailForm.sms1" style="width: 15%"></el-input>
                      <el-button @click="countDown" :class="{disabled:!canClick}" class="button_sms">{{content}}
                      </el-button>
                    </el-form-item>
                    <el-button type="primary" @click="mailStep=2">下一步</el-button>
                    <el-button @click="mailStep=0">取消</el-button>
                  </el-form>
                </div>
                <div class="mail_second" v-show="mailStep==2">
                  <h4 class="mail_title">修改邮箱</h4>
                  <el-form :model="mailForm" :rules="rules" ref="mailForm" class="mailForm">
                    <el-form-item prop="new">
                      <span class="label">新邮箱</span><span><el-input type="text" v-model="mailForm.new"
                                                                    style="width: 25%"></el-input></span>
                    </el-form-item>
                    <el-form-item prop="sms2">
                      <span class="label">邮件验证码</span>
                      <el-input v-model="mailForm.sms2" style="width: 13.2%"></el-input>
                      <el-button @click="countDown" :class="{disabled:!canClick}" class="button_sms">{{content}}
                      </el-button>
                    </el-form-item>
                    <el-button type="primary">保存</el-button>
                    <el-button @click="mailStep=0">取消</el-button>
                  </el-form>
                </div>
              </div>
            </div>
            <div class="safety_phone clearfix safety_div">
              <p class="safety_left">手机号码</p>
              <span class="have">
                <p>{{filterPhone}}</p>
                <p>已验证，可通过手机找回密码</p>
              </span>
              <p class="safety_right">修改</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import vHeader from '../common/header/page/header';
  import vFooter from '../common/footer';

  export default {
    data() {
      return {
        updateMail: true,
        mailForm: {
          old: "63192633@qq.com",
          new: "",
          sms1: "",
          sms2: ""
        },
        phoneForm: {
          old: "13192256005",
        },
        content: '点击发送验证码',
        totalTime: 60,
        canClick: true,
        mailStep: 0,
        showEdit:false,
      }
    },
    components: {
      vHeader, vFooter
    },
    methods: {
      countDown() {
        if (!this.canClick) return
        this.canClick = false
        this.content = this.totalTime + "s后重新发送"
        this.count = 1
        let clock = window.setInterval(() => {
          this.totalTime--
          this.content = this.totalTime + "s后重新发送"
          console.log(this.totalTime)
          if (this.totalTime <= 0) {
            window.clearInterval(clock)
            this.content = '重新发送验证码'
            this.totalTime = 60
            this.canClick = true
          }
        }, 1000)
      },

    },
    computed: {
      filterMail() {
        var mail = this.mailForm.old.replace(/(.{2}).+(.{2}@.+)/g, '$1****$2')
        return mail;
      },
      filterPhone() {
        var phone = this.phoneForm.old.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
        return phone;
      }
    }
  }
</script>
<style scoped>
  .pageContain {
    width: 1100px !important;
    margin-left: -550px;
  }

  .pageContain_header {
    border-bottom: 1px solid #dcdcdc;
    width: 100%;
    margin-top: 30px;
  }

  .pageContain_header ul li {
    width: 100px;
    height: 35px;
    display: inline-block;
    margin-right: 50px;
    text-align: center;
    cursor: pointer;
  }

  .pageContain_section {
    margin-top: 20px;
    margin-left: 20px;
    width: 100%;
  }

  .section_main {
    position: relative;
  }

  .section_main img {
    float: left;
    margin-left: 10px;
  }

  .editPortrait {
    position: absolute;
    top: 80px;
    left: 10px;
    width: 100px;
    height: 20px;
    background-color: rgba(50, 50, 50, .5);
    color: #fff;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    z-index: 100;
  }

  .section_main_desc {
    float: left;
    position: relative;
    left: 20px;
    line-height: 30px;
  }

  .section_main_desc_account {
    color: #666666;
    font-size: 14px;
  }

  .section_safety {
    width: 100%;
  }

  .safety_header {
    margin-top: 30px;
    border-bottom: 0.5px solid #dcdcdc;
    line-height: 30px;
    color: #666666;
  }

  .safety_title {
    float: left;
    font-weight: normal;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  .safety_level {
    float: right;
    font-weight: normal;
    margin-right: 50px;
  }

  .safety_box {
    line-height: 40px;
    font-size: 14px;
    color: #666;
    margin-top: 10px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 0.5px solid #DCDCDC;
  }

  .safety_left {
    float: left;
    width: 100px;
  }

  .safety_right {
    float: right;
    position: relative;
    right: 50px;
    color: #00a7ea;
    cursor: pointer;
  }

  .safety_right:not(:nth-child(2)) {
    top: -60px;
  }

  .safety_div {
    margin-left: 10px;
    height: 75px;
  }

  .have {
    position: relative;
    left: 50px;
    top: 10px;
    line-height: 25px;
    width: 300px;
  }

  .have p:first-child {
    font-weight: bold;
    width: 300px;
  }

  .have p:last-child {
    color: #999;
    width: 300px;
  }

  .on {
    color: #00a7ea;
    border-bottom: 2px solid #00a7ea;
  }

  .label {
    display: inline-block;
    width: 100px;
  }

  .mailForm {
    margin-top: 20px;
    padding-bottom: 20px;
  }

  .mail_update {
    margin-left: 10px;
    border-top: 0.5px solid #DCDCDC;
    border-bottom: 0.5px solid #DCDCDC;
  }

  .mail_title {
    margin-top: 10px;
  }

</style>
