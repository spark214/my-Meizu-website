<template>
  <div class="order_container">
    <div class="myOrder_header">
      <ul class="clearfix">
        <li>
          <router-link to="orderTable" exact>全部订单</router-link>
        </li>
        <li>
          <router-link to="orderTable" exact>待付款</router-link>
        </li>
        <li>
          <router-link to="orderTable" exact>待发货</router-link>
        </li>
        <li>
          <router-link to="orderTable" exact>已发货</router-link>
        </li>
        <li>
          <router-link to="orderTable" exact>其他</router-link>
        </li>
      </ul>
    </div>
    <div class="order_table_header">
      <ul class="clearfix">
        <li style="width: 620px">订单明细</li>
        <li style="width: 120px">金额</li>
        <li style="width: 120px">状态</li>
        <li style="width: 120px">操作</li>
      </ul>
    </div>
    <div class="myOrder_content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>

</script>
<style scoped>
  .order_container {
    margin-left: 20px;
    margin-top: 20px;
  }
.myOrder_header{
  border-bottom: 0.5px solid #fcfcfc;
  height: 42px;
}
  .myOrder_header li {
    float: left;
    width: 130px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }

  .myOrder_header li a {
    display: inline-block;
    height:25px;
    padding: 0 15px 10px 15px;
  }
  .order_table_header{
    height: 40px;
    margin-top: 20px;
    background-color: #fafafc;
    display: flex;
    align-items: center;
  }
.order_table_header li{
  float: left;
  text-align: center;
  font-size: 14px;
  color: #666666;
}
.myOrder_content{
  width: 100%;
  margin-top: 20px;
}
  a {
    color: #666666;
  }
a:hover{
  color: #00a7ea;
  border-bottom: 2px solid #00a7ea;
}
  a.router-link-active {
    color: #00a7ea;
    border-bottom: 2px solid #00a7ea;
  }
</style>
