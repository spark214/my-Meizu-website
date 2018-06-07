<template>
  <div>
    <v-header></v-header>
    <div class="pageContain clearfix">
      <div class="member_left">
        <v-sider></v-sider>
      </div>
      <div class="member_content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
  import vHeader from '../common/header/page/header';
  import vSider from '../common/member/common/sider';

  export default {
    data() {
      return {}
    },
    methods: {},
    components: {
      vHeader, vSider
    }
  }
</script>
<style>
.member_left{
  float: left;
}
  .member_content{
    width: 1000px;
    float: left;
    margin-top: 30px;
    margin-left: 20px;
  }
</style>
