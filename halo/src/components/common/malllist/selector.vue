<template>
  <div>
    <div class="selector_bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        <el-breadcrumb-item>手机</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="selector">
      <div class="selector_type clearfix selector_box" v-if="types.length>0">
        <span>分类：</span>
        <ul class="clearfix">
          <li v-for="item in types" class="itemfloat">{{item}}</li>
        </ul>
      </div>
      <div class="selector_brand clearfix selector_box">
        <span>品牌：</span>
        <ul class="clearfix">
          <li v-for="(item,index) in brands" class="itemfloat">{{item}}</li>
        </ul>
      </div>
    </div>
    <div class="filterOrder clearfix">
      <ul class="clearfix">
        <li @click="filter=0"><span :class="{on:filter==0}">推荐</span></li>
        <li @click="filter=1"><span :class="{on:filter==1}">新品</span></li>
        <li @click="filterprice"><span :class="{on:filter==2}">价格</span><i class="el-icon-caret-bottom"
                                                                           v-show="filterPrice==1&&filter==2"></i><i
          class="el-icon-caret-top" v-show="filterPrice==2&&filter==2"></i></li>
      </ul>
    </div>
  </div>

</template>
<script>
  export default {
    props: {
      types: {
        type: [Array]
      },
      brands: {
        type: [Array]
      }
    },
    data() {
      return {
        filter: 0,
        filterPrice: 0,
      }
    },
    methods: {
      filterprice() {
        this.filter = 2;
        if (this.filterPrice == 2)
          this.filterPrice--;
        else
          this.filterPrice++;
      }
    }

  }
</script>
<style>
  .selector {
    width: 1240px;
    background-color: white;
    margin-top: 10px;
    line-height: 40px;
    font-size: 14px;
    color: #515151;
  }

  .selector_type {
    padding-top: 10px;
    padding-left: 20px;
  }

  .selector_brand {
    padding-left: 20px;
    padding-bottom: 10px;
  }

  .filterOrder ul {
    margin: 20px 0 20px 0px;
    font-size: 14px;
    color: #666666;
    cursor: pointer;
  }

  .filterOrder li {
    float: left;
    margin-right: 30px;

  }

  .filterOrder i {
    color: #e22841;
  }

  .itemfloat {
    float: left;
    margin-right: 35px;
  }

  .selector_box span, .selector_box ul {
    float: left;
  }

  .selector_box li {
    cursor: pointer;
  }

  .selector_box span {
    margin-right: 35px;
  }

  .selector_bread {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
