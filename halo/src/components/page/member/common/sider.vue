<template>
  <div class="member_sider">
    <div>
      <div class="sider_order sider_item">
        <div class="sider_title"><i class="el-icon-tickets"  style="font-size: 18px"></i> <span>订单中心</span></div>
        <ul class="sider_list">
          <li @click="selectItem(0)"><router-link :to="item[0].route" exact>{{item[0].name}}</router-link></li>
        </ul>
      </div>
      <div class="sider_user sider_item">
        <div class="sider_title"><img src="../../../../../static/img/account.png"></img><span> 个人中心</span></div>
        <ul class="sider_list">
          <li @click="selectItem(1)"><router-link :to="item[1].route" exact>{{item[1].name}}</router-link></li>
          <li @click="selectItem(2)"><router-link :to="item[2].route" >{{item[2].name}}</router-link></li>
        </ul>
      </div>
      <div class="sider_ser sider_item">
        <div class="sider_title"><i class="el-icon-service" style="font-size: 18px"></i> <span>服务中心</span></div>
        <ul class="sider_list">
          <li  @click="selectItem(3)"><router-link :to="item[3].route" >{{item[3].name}}</router-link></li>
          <li @click="selectItem(4)"><router-link :to="item[4].route" >{{item[4].name}}</router-link></li>
          <li  @click="selectItem(5)"><router-link :to="item[5].route" >{{item[5].name}}</router-link></li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data(){
      return{
        select:0,
        item:[
          {name:'我的订单',route:'myOrder'},
          {name:'地址管理',route:'mAddress'},
          {name:'建议反馈',route:'advice'},
          {name:'退款/退换货跟踪',route:'mIndex'},
          {name:'意外保',route:'insurance'},
          {name:'我的消息',route:'myMessage'},
        ]
      }
    },
    methods:{
      goRouter(that) {
        this.$router.push({path: "/" + that});
      },
      selectItem(index){
        this.$emit('selectItem',this.item[index].name);
      }
    }
  }
</script>
<style scoped>
.member_sider{
  width: 186px;
  height: 713px;
  background-color: #fafafc;
  font-size: 14px;
  color: #666666;
  margin-left: 25px;
  margin-top: 30px;
}
.member_sider>div{
  padding-top: 10px;
  padding-left:20px;
}
.sider_title{
  font-weight: bold;
}
  .sider_item{
    margin-top: 25px;
  }
.sider_list{
  margin-top: 15px;
  margin-left: 23px;
}
  .sider_list li{
    margin-bottom: 10px;
    cursor: pointer;
  }
.sider_list li:hover{
  color: #00a7ea;
}
a{
  color: #666666;
}
a.router-link-active {
  color: #00a7ea;
}
</style>
