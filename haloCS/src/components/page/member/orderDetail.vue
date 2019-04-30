<template>
  <div class="orderDetail clearfix">
    <div class="orderDetail_title"><span class="selectedSection">订单详情</span></div>
    <div class="order_steps">
      <el-steps :space="200" :active="status"  align-center="true">
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
      <span class="orderDetail_table_title " style="margin-left: 15px"
            v-if="status!=5&&status!=0">支付方式：{{payType}}</span>
      <el-table :data="orderDetail.products" id="cart_table" ref="multipleTable" border>

        <el-table-column width="510" label="商品" class="table_product clearfix" align="center">
          <template scope="scope">
            <img :src="scope.row.imgUrl" width="60" height="60" class="orderTable_product_img">
            <div class="orderTable_product_msg">
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
        <p>￥{{totalPrices}}</p></div>
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
      <el-button size="small" @click="back()">返回我的订单</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        "status": 1,
        "orderDetail": {
          "id": "",
          "receiver": {},
          "products": [],
          "payType": 0,
        },

        alltotal: 0
      }
    },
    methods: {
      back(){
        this.$router.push({path: '/myOrder', query: {}});
      },
      getData() {
        var id = this.$route.query.id
        var url = this.$rootUrl + "/api/order/orderDetail";
        const options = {
          method: 'POST',
          url: url,
          data: {
            id:id
          }
        };

        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.errorCode == 0) {
            this.alltotal = 0;
            this.orderDetail = item.data.orderDetail;
            this.status = item.data.status;
          }else if (item.errorCode == 403) {
            sessionStorage.setItem('pageHistory', this.$route.fullPath);
            this.$router.push({path: "/login"});
            throw item.msg;
          } else {
            throw item.msg;
          }
        }).catch(errorMsg => {
          this.$message.error(errorMsg);
      });
      }
    },
    computed: {
      totalPrices() {
        for (let i = 0; i < this.orderDetail.products.length; i++) {
          this.alltotal += this.orderDetail.products[i].total
        }
        return this.alltotal.toFixed(2)
      },
      payType() {
        switch (this.orderDetail.payType) {
          case 1:
            return "花呗分期";
            break;
          case 2:
            return "支付宝";
            break;
          case 3:
            return "微信";
            break;
          case 4:
            return "中国银行网上银行";
            break;
          case 5:
            return "中国工商银行网上银行";
            break;
          case 6:
            return "中国建设银行网上银行";
            break;
          case 7:
            return "中国交通银行网上银行";
            break;
          case 8:
            return "中国农业银行网上银行";
            break;
        }
      },
      orderStatus() {
        switch (this.status) {
          case 0:
            return "未付款";
            break;
          case 1:
            return "已付款";
            break;
          case 2:
            return "未发货";
            break;
          case 3:
            return "已发货";
            break;
          case 4:
            return "交易成功";
            break;
          case 5:
            return "交易关闭";
            break;
        }
      }
    },
    created() {
      this.getData();
      window.scroll(0, 0);
    },
    watch: {
      '$route'(to, from) {
        if(to.path === '/orderDetail'){
          this.getData();
          window.scroll(0, 0);
          this.alltotal = 0;
        }
      }
    }
  }
</script>
<style scoped lang="less">
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
    border: 1px solid #dcdcdc;
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

  .orderTable_product_img {
    float: left;
  }

  .orderTable_product_msg {
    float: left;
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .orderTable_product_msg p {
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

  .orderDetail_receiver {
    border-top: 0.5px solid #ccc;
    padding-top: 10px;
    color: #666666;
    line-height: 30px;
    position: relative;
    top: 200px;

    p{
      color: #999;
    }
    .el-button{
      margin-top: 20px;
    }
  }

  .payment_computed {
    width: 254px;
    height: 318px;
    float: right;
    position: relative;
    right: 50px;
    top: 50px;
    line-height: 40px;
    color: #666;
  }

  .payment_computed > div p:first-child {
    float: left;
  }

  .payment_computed > div p:last-child {
    float: right;
  }
</style>
