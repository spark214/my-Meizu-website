<template>
  <div class="orderTable_conatiner">
    <div v-for="(item,index) in datas" class="orderTable">
      <div class="table_header">
        <span class="table_header_title">下单时间:</span> <span class="table_header_num">{{item.gmtCreate}}</span>
        <span class="table_header_title">订单号:</span> <span class="table_header_num">{{item.id}}</span>
      </div>

      <table class="order_table" id="cart_table">
        <tr class="table_product clearfix" align="center">
          <td width="498px">
            <div v-for="its in item.products" class="order_table_product_detail clearfix table_product_border">
              <img :src="its.imgUrl" width="80" height="80" class="order_table_product_img">
              <div class="order_table_product_msg">
                <span>{{its.title}}</span> × <span>{{its.number}}</span>
              </div>
            </div>
          </td>
          <td width="200px" class="table_product_border">
            <span style="color: rgb(224, 43, 65)" class="table_price ">￥{{item.price.toFixed(2)}}</span>
          </td>
          <td width="140px" :rowspan="item.products.length" class="table_product_border">
            <span>{{item.statusName}}</span>
          </td>
          <td width="140px" :rowspan="item.products.length">
            <!--<el-button v-if="item.status==0" type="danger">立即付款</el-button>-->
            <!--<p v-if="item.status!=3" style="cursor:pointer;margin: 10px 0;">取消订单</p>-->
            <p style="cursor: pointer" @click="goDetail(index)">查看详情</p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      datas: [],
    },
    data() {
      return {

      }
    },
    methods: {
      goDetail(index){
        this.$router.push({path: "/orderDetail",query:{id:this.datas[index].id}});
      },
      goRouter(that) {
        this.$router.push({path: "/" + that});
      },
    },
    computed: {

    },
    created(){

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
    border: 0.5px solid #ccc;
    border-left: none;
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

  .order_table_product_detail:not(:last-child) {
    border-bottom: 0.5px solid #efefef;
  }

  .order_table_product_img{
    padding-top: 10px;
  }

  .order_table_product_msg {
    padding-bottom: 10px;
  }
</style>
