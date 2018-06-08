<template>
  <div>
    <v-header></v-header>
    <div class="pageContain clearfix">
      <div class="member_bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: 'mallIndex' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'member'}" >我的商城</el-breadcrumb-item>
          <el-breadcrumb-item  ></el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="member_left">
        <v-sider @selectItem="selectItem"></v-sider>
      </div>
      <div class="member_content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>

    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import vHeader from '../common/header/page/header';
  import vSider from '../common/member/common/sider';
  import vFooter from '../common/footer';

  export default {
    data() {
      return {
        curritem:'',
        currnull:false
      }
    },
    methods: {
      selectItem(msg){
        this.curritem=msg;
      },
    },
    components: {
      vHeader, vSider,vFooter
    },
    computed:{

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
  .member_bread{
    position: relative;
    left: 25px;
    top: 15px;
  }
</style>
