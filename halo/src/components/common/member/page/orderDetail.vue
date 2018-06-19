<template>
  <div class="orderDetail clearfix">
    <div class="orderDetail_title"><span class="selectedSection">订单详情</span></div>
    <div class="order_steps">
      <el-steps :space="200" :active="status" finish-status="success" align-center="true">
        <el-step title="提交订单"></el-step>
        <el-step title="买家已付款"></el-step>
        <el-step title="发货中"></el-step>
        <el-step title="交易成功"></el-step>
      </el-steps>
      <div class="step_box">
        <p>订单状态：<span>{{orderStatus}}</span></p>
      </div>
    </div>
    <div class="orderDetail_table">
      <span class="orderDetail_table_title ">订单号：{{orderDetail.id}}</span>
      <span class="orderDetail_table_title " style="margin-left: 15px" v-if="status!=5&&status!=0">支付方式：{{payType}}</span>
      <el-table :data="orderDetail.products" clss="cart_table" id="cart_table" ref="multipleTable" border>

        <el-table-column width="510" label="商品" class="table_product clearfix" align="center">
          <template scope="scope">
            <img :src="scope.row.imgUrl" width="100" height="100" class="table_product_img">
            <div class="table_product_msg">
              <p>{{scope.row.title}}</p>
            </div>

          </template>
        </el-table-column>
        <el-table-column width="169" label="单价(元)" align="center">
          <template scope="scope">
            <span class="table_price">￥{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column width="150" label="数量" align="center">
          <template scope="scope">
            <span>{{scope.row.number}}</span>
          </template>
        </el-table-column>
        <el-table-column width="170" label="小计(元)" prop="total" align="center">
          <template scope="scope">
            <span style="color: rgb(224, 43, 65)" class="table_price">￥{{scope.row.total}}</span>
          </template>
        </el-table-column>
        </el-table-column>


      </el-table>
    </div>
    <div class="payment_computed clearfix">
      <div class="clearfix"><p>总金额</p>
        <p >￥{{totalPrices}}</p></div>
      <div class="clearfix"><p>运费</p>
        <p v-text="'￥0.00'"></p></div>
      <div style="height: 1px;border-top: 0.5px solid #ccc"></div>
      <div class="clearfix"><p>应付：</p>
        <p style="font-size: 20px;color:#e02b41;font-weight: bold;">￥{{totalPrices}}</p></div>
    </div>
    <div class="orderDetail_receiver">
      <h4>收货人信息</h4>
      <p>收货人：{{orderDetail.receiver.name}}</p>
      <p>地址：{{orderDetail.receiver.address}}</p>
      <p>电话：{{orderDetail.receiver.phone}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        "status": 1,
        "orderDetail": {
          "id": "538103ad3cd346a187aa256b37882ed7",
          "receiver": {
            "name": "mello",
            "phone": "13192265851",
            "address": "广东省珠海市香洲区唐家湾金凤路六号"
          },
          "products": [
            {
              "proId": 6,
              "imgUrl": "https://openfile.meizu.com/group1/M00/01/B9/Cgbj0Fl4OYOAbICrAA2zSL7wnnM117.png@120x120.png",
              "title": "魅族 PRO 7 全网通公开版 静谧黑 4GB+64GB ",
              "price": 1299,
              "number": 2,
              "total": 1299
            },
            {
              "proId": 37,
              "imgUrl": "https://openfile.meizu.com/group1/M00/00/A2/Cix_s1gcVpeAOmoaAAGh-ubroNg891.png@120x120.png",
              "title": "魅族 EP2X耳机 皓月白 ",
              "price": 89,
              "number": 1,
              "total": 89
            }
          ],
          "payType": 1
        },
        alltotal:0
      }
    },
    computed:{
      totalPrices(){
        for(let i=0;i<this.orderDetail.products.length;i++){
          this.alltotal+=this.orderDetail.products[i].total
        }
        return this.alltotal.toFixed(2)
      },
      payType(){
        switch (this.orderDetail.payType){
          case 0:return "花呗分期";break;
          case 1:return "支付宝";break;
          case 2:return "微信";break;
          case 3:return "银行卡";break;
        }
      },
      orderStatus(){
        switch (this.status){
          case 0:return "未付款";break;
          case 1:return "已付款";break;
          case 2:return "未发货";break;
          case 3:return "已发货";break;
          case 4:return "交易成功";break;
          case 5:return "交易关闭";break;
        }
      }
    }
  }
</script>
<style scoped>
  .orderDetail {
    width: 100%;
    margin-bottom: 80px;
  }

  .orderDetail_title {
    border-bottom: 0.5px solid #ccc;
  }

  .selectedSection {
    font-size: 20px;
    font-weight: bold;
    border-bottom: 2px solid #31a5e7;
    color: #31a5e7;
    margin-left: 15px;
    padding-bottom: 5px;
    position: relative;
    top: -6px;
  }

  .order_steps {
    margin-top: 40px;
  }

  .step_box {
    width: 100%;
    height: 50px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    margin-top: 30px;
  }

  .step_box p {
    color: #666666;
    margin-left: 15px;
  }

  .el-table {
    text-align: left;
    margin-top: 10px;
  }

  .table_product_img {
    float: left;
  }

  .table_product_msg {
    float: left;
    height: 100px;
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .table_product_msg p {
    margin-right: 10px;
  }

  .table_price {
    font-size: 16px;
    font-weight: bold;
  }

  .cart_product p {
    position: relative;
    top: 20px;
  }

  .orderDetail_table {
    margin-top: 30px;
  }

  .orderDetail_table_title {
    color: #666666;
    font-size: 14px;
  }
  .orderDetail_receiver{
    border-top: 0.5px solid #ccc;
    padding-top: 10px;
    color: #666666;
    line-height: 30px;
    position: relative;
    top: 200px;
  }
  .payment_computed{
    width: 254px;
    height: 318px;
    float: right;
    position: relative;
    right:50px;
    top:50px;
    line-height: 40px;
    color: #666;
  }
  .payment_computed>div p:first-child{
    float: left;
  }
  .payment_computed>div p:last-child{
    float: right;
  }
</style>
