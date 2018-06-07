<template>
  <div class="member_sider">
    <div>
      <div class="sider_order sider_item">
        <div class="sider_title"><i class="el-icon-tickets"  style="font-size: 18px"></i> <span>订单中心</span></div>
        <ul class="sider_list">
          <li>我的订单</li>
        </ul>
      </div>
      <div class="sider_user sider_item">
        <div class="sider_title"><img src="../../../../../static/img/account.png"></img><span> 个人中心</span></div>
        <ul class="sider_list">
          <li>地址管理</li>
          <li>建议反馈</li>
        </ul>
      </div>
      <div class="sider_ser sider_item">
        <div class="sider_title"><i class="el-icon-service" style="font-size: 18px"></i> <span>服务中心</span></div>
        <ul class="sider_list">
          <li>退款/退换货跟踪</li>
          <li>意外保</li>
          <li>以旧换新</li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data(){
      return{

      }
    },
    methods:{

    }
  }
</script>
<style>
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
</style>
