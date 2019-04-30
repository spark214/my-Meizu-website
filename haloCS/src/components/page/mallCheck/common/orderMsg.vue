<template>
  <div class="orderMsg clearfix">
    <h4 style="font-weight: bold">确定订单信息</h4>
    <table class="ordeCheckrMsg_table">
      <tr>
        <td width="500px">商品</td>
        <td width="200px">单价(元)</td>
        <td width="200px">数量</td>
        <td width="200px">小计(元)</td>
      </tr>
      <tr v-for="item in products">
        <td width="500px">
          <img :src="item.imgUrl" width="50" height="50" class="ordeChecktable_product_img">
          <div class="ordeChecktable_product_msg">
            <p>{{item.title}}</p>
          </div>
        </td>
        <td width="200px">
          <span class="table_price">￥{{item.price.toFixed(2)}}</span>
        </td>
        <td width="200px">
          <span>{{item.number}}</span>
        </td>
        <td width="200px">
          <span style="color: rgb(224, 43, 65)" class="table_price">￥{{item.total.toFixed(2)}}</span>
        </td>

      </tr>
    </table>

    <div class="orderMsg_table_footer clearfix">
      <div class="orderMsg_total" style="font-size: 16px">
        合计
        <span style="font-size: 22px;color:#e02b41;font-weight: bold;" >￥{{totalPrices.toFixed(2)}}</span>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        products: [],
        product: {},
        totalPrice: 0,
        type: 0
      }
    },
    methods: {
      spanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 4) {
          return {
            rowspan: this.product.length,
            colspan: 1
          }
        }
        else {
          return {
            rowspan: 1,
            colspan: 1
          }
        }
      },
      getData() {
          this.products = this.$store.state.orders.product;
      }
    },
    computed: {
      totalPrices: function () {
        this.totalPrice = 0;
        for (let i = 0; i < this.products.length; i++) {
          this.totalPrice += (this.products[i].price * this.products[i].number);
        }
        return this.totalPrice;
      }
    },
    created() {
      this.getData()
    }
  }
</script>
<style lang="less">
  .ordeCheckrMsg_table {
    width: 96%;
    position: relative;
    left: 50%;
    margin-left: -48%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 0.5px solid #dcdcdc;
    color: #666666;

    tr:first-child td{
      padding-top: 15px;
    }

    td{
      text-align: center;
      position: relative;
    }


  .ordeChecktable_product_img {
    float: left;
    margin-left: 20px;
    margin-top: 25px;
  }

  .ordeChecktable_product_msg {
    float: left;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: self-start;
    flex-direction: column;
    font-size: 15px;
  }

  .ordeChecktable_product_msg p {
    margin-left: 10px;
  }
  }

  .orderMsg {
    width: 100%;
    position: relative;
    padding-bottom: 20px;
  }

  .orderMsg_tr {
    border: 2px solid black;
  }

  .orderMsg > .el-table {
    width: 96%;
    border: 1px solid #dcdcdc;
    /*margin-bottom: 20px;*/
    font-size: 16px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .orderMsg > h4, .paymentMsg > h4 {
    padding-top: 20px;
    padding-left: 20px;
  }

  .orderMsg_table_footer {
    background: #f5f5f5;
    width: 96%;
    height: 50px;
    line-height: 50px;
    position: relative;
    left: 50%;
    margin-left: -48%;
  }

  .orderMsg_total {
    float: right;
    position: relative;
    right: 20px;
  }

  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: initial !important;
  }
</style>
