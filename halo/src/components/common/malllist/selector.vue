<template>
  <div>
    <div class="selector_bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path: '/mallList', query: {cateId: 0}}">全部商品</el-breadcrumb-item>
        <el-breadcrumb-item v-show="cateId!=0">{{filterBrands}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="selector" v-if="cateId>=0">
      <div class="selector_type clearfix selector_box" v-show="cateId==0">
        <span>分类：</span>
        <ul class="clearfix">
          <li v-for="item in types" class="itemfloat" @click="goCate(item.id)">{{item.cateName}}</li>
        </ul>
      </div>
      <div class="selector_brand clearfix selector_box">
        <span>品牌：</span>
        <ul class="clearfix">
          <li v-for="(item,index) in brands" class="itemfloat" @click="goBrand(item.id)">{{item.brandName}}</li>
        </ul>
      </div>
    </div>
    <!--<div class="filterOrder clearfix">-->
      <!--<ul class="clearfix">-->
        <!--<li @click="filter=0"><span :class="{on:filter==0}">推荐</span></li>-->
        <!--<li @click="filter=1"><span :class="{on:filter==1}">新品</span></li>-->
        <!--<li @click="filterprice"><span :class="{on:filter==2}">价格</span>-->
          <!--<i class="el-icon-caret-bottom"-->
             <!--v-show="filterPrice==1&&filter==2"></i><i-->
            <!--class="el-icon-caret-top" v-show="filterPrice==2&&filter==2"></i></li>-->
      <!--</ul>-->
    <!--</div>-->
  </div>

</template>
<script>
  export default {
    data() {
      return {
        types: [],
        brands: [],
        filter: 0,
        filterPrice: 0,
        cateId: 0,
        brandId:0
      }
    },
    methods: {
      goCate(id) {
        this.$router.push({path: "/mallList", query: {cateId: id}})
      },
      goBrand(id) {
        var cateId = this.$route.query.cateId
        this.$router.push({path: "/mallList", query: {cateId:cateId,brandId: id}})
      },
      filterprice() {
        this.filter = 2;
        if (this.filterPrice == 2)
          this.filterPrice--;
        else
          this.filterPrice++;
      },
      getData(cateId) {
        let method = 'GET';
        if (cateId == 0) {
          var url = this.$rootUrl + "/api/product/getCategorys";
        }
        else {
          var url = this.$rootUrl + "api/product/categorysDetail";
          method = 'POST';
        }
        const options = {
          method: method,
          url: url,
          data: {}
        };

        this.$axios(options).then((res) => {
          if (res.data.data[0]) {
            if (cateId == 0) this.types = res.data.data[0].categories

            this.brands = res.data.data[0].brands
          }
        })
      }
    },
    computed: {
      filterBrands() {
        switch (this.cateId) {
          case 1:
            return "手机";
            break;
          case 6:
            return "手机配件/移动电源";
            break;
          case 5:
            return "数码影音";
            break;
          case 3:
            return "智能穿戴";
            break;
          case 2:
            return "智能设备";
            break;
          case 4:
            return "游戏设备";
            break;
          case 8:
            return "生活周边";
            break;
          case 7:
            return "移动存储/办公设备";
            break;
        }
      }
    },
    created() {
      this.cateId = this.$route.query.cateId
      if (this.$route.query.cateId === undefined) this.cateId = 0
      if (this.cateId >= 0)
        this.getData(this.cateId)
    },
    watch: {
      '$route'(to, from) {
        this.cateId = this.$route.query.cateId
        if (this.$route.query.cateId === undefined) this.cateId = 0
        this.getData(this.cateId)
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
    padding-top: 10px;
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
