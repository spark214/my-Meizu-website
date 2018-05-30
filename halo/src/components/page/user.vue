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
            <p>账号 ：<span>21</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import vHeader from '../common/header/page/header';

  export default {
    data() {
      return {}
    },
    components: {
      vHeader
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
  }

  .section_main img {
    float: left;

  }

  .section_main_desc {
    float: left;
    position: relative;
    left: 20px;
  }
</style>
