<template>
  <div class="user">
    <v-header></v-header>
    <div class="pageContain">
      <div class="pageContain_header">
        <ul>
          <li><a>账号管理</a></li>
          <li><a>喜币</a></li>
        </ul>
      </div>
      <div class="pageContain_section">
        <div class="section_main clearfix">
          <img src="../../../static/img/21.jpg" width="100px">
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
            <div class="safety_mail clearfix safety_div">
              <p class="safety_left">邮箱</p>
              <p class="safety_right">修改</p>
            </div>
            <div class="safety_phone clearfix safety_div">
              <p class="safety_left">手机号码</p>
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
      return {}
    },
    components: {
      vHeader, vFooter
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
    margin-top: 20px;
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

  .section_main img {
    float: left;
    margin-left: 10px;
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
    margin-right: 20px;
  }

  .safety_box {
    line-height: 40px;
    font-size: 14px;
    color: #666;
    margin-top: 10px;
  }

  .safety_left {
    float: left;
  }

  .safety_right {
    float: right;
    position: relative;
    right: 20px;
    color: #00a7ea;
    cursor: pointer;
  }

  .safety_div {
    margin-left: 10px;
    height: 75px;
  }

</style>
