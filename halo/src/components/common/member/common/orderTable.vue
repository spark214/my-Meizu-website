<template>
  <div class="orderTable_conatiner">
    <div v-for="(item,index) in datas" class="orderTable">
      <div class="table_header">
        <span class="table_header_title">下单时间:</span> <span class="table_header_num">{{item.orderTime}}</span>
        <span class="table_header_title">订单号:</span> <span class="table_header_num">{{item.orderId}}</span>
      </div>

      <table class="order_table" id="cart_table">
        <tr class="table_product clearfix" align="center">
          <td width="498px">
            <div v-for="its in item.msg" class="table_product_detail clearfix table_product_border">
              <img :src="its.img" width="100" height="100" class="table_product_img">
              <div class="table_product_msg">
                <p>{{its.name}}</p>
                <p>{{its.version}}</p> ×<span>{{its.num}}</span>
              </div>
            </div>
          </td>
          <td width="200px" class="table_product_border">
            <span style="color: rgb(224, 43, 65)" class="table_price ">￥{{item.price}}.00</span>
          </td>
          <td width="140px" :rowspan="item.msg.length" class="table_product_border">
            <span>{{orderStatus}}</span>
          </td>
          <td width="140px" :rowspan="item.msg.length">
            <el-button v-if="item.status==0" type="danger">立即付款</el-button>
            <p v-if="item.status!=3" style="cursor:pointer;">取消订单</p>
            <p style="cursor: pointer" @click="goRouter('orderDetail')">查看详情</p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      datas: {}
    },
    data() {
      return {}
    },
    methods: {
      goRouter(that) {
        this.$router.push({path: "/" + that});
      },
    },
    computed: {
      orderStatus(){
        switch (this.datas.status){
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
  .orderTable_conatiner {
    margin-bottom: 80px;
  }

  .orderTable {
    position: relative;
    margin-bottom: 15px;
    border: 0.5px solid #ccc;
    width: 100%;
  }

  .table_header {
    width: 100%;
    height: 35px;
    background-color: #fafafc;
    font-size: 14px;
    line-height: 35px;
    color: #666;
    position: absolute;
    z-index: 100;
    border-bottom: 0.5px solid #ccc;
  }

  .table_header_num {
    color: #999;
  }

  .table_header_title {
    margin-left: 10px;
  }

  .order_table {
    margin-top: 35px;
    color: #666666;
    font-size: 14px;

  }

  .table_product_border {
    border-right: 0.5px solid #efefef;
  }

  .table_product_detail:not(:last-child) {
    border-bottom: 0.5px solid #efefef;
  }

  .table_product_msg {
    padding-bottom: 5px;
  }
</style>
