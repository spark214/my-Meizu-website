<template>
  <div class="orderMsg clearfix">
    <h4 style="font-weight: bold">确定订单信息</h4>
    <el-table :data="product" class="orderMsg_table" ref="multipleTable" :span-method="spanMethod" border >
      <el-table-column width="458" label="商品" class="table_product clearfix" align="center">
        <template scope="scope">
          <img :src="scope.row.img" width="100" height="100" class="table_product_img">
          <div class="table_product_msg">
            <p>{{scope.row.name}}</p>
            <p>{{scope.row.version}}</p>
          </div>

        </template>
      </el-table-column>
      <el-table-column width="200" label="单价(元)" align="center">
        <template scope="scope">
          <span class="table_price">￥{{scope.row.price}}.00</span>
        </template>
      </el-table-column>
      <el-table-column width="130" label="数量" align="center">
        <template scope="scope">
          <span>{{scope.row.num}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" label="小计(元)" prop="sum" align="center">
        <template scope="scope">
          <span style="color: rgb(224, 43, 65)" class="table_price">￥{{scope.row.sum}}.00</span>
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column width="200" label="配送方式" align="center" >
        <template slot-scope="scope">
          <span>{{scope.row.dev}}</span>
        </template>
      </el-table-column>

    </el-table>
    <div class="orderMsg_table_footer clearfix">
      <div class="orderMsg_total" style="font-size: 16px">
        合计
        <span style="font-size: 22px;color:#e02b41;font-weight: bold;" v-text="'￥'+totalPrice+'.00'"></span>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        product: [
          {
            name: "魅族PRO 6s",
            version: "全网通公开版 星空黑 64GB",
            img: "https://openfile.meizu.com/group1/M00/00/C8/Cix_s1hGFveAE3RcAAOqzSlfPuA022.png@240x240.jpg",
            price: "2299",
            num: "1",
            sum: "2299",
            dev: "快递配送：运费0元",
          },
          {
            name: "魅族PRO7",
            img: "https://openfile.meizu.com/group1/M00/00/C8/Cix_s1hGFveAE3RcAAOqzSlfPuA022.png@240x240.jpg",
            version: "全网通公开版 提香红4GB+64GB",
            price: "2499",
            num: "1",
            sum: "2499",
            dev: "快递配送：运费0元",
          },
          {
            name: "魅族PRO 6s",
            version: "全网通公开版 星空黑 64GB",
            img: "https://openfile.meizu.com/group1/M00/00/C8/Cix_s1hGFveAE3RcAAOqzSlfPuA022.png@240x240.jpg",
            price: "2299",
            num: "1",
            sum: "2299",
            dev: "快递配送：运费0元",
          },
          {
            name: "魅族PRO 6s",
            version: "全网通公开版 星空黑 64GB",
            img: "https://openfile.meizu.com/group1/M00/00/C8/Cix_s1hGFveAE3RcAAOqzSlfPuA022.png@240x240.jpg",
            price: "2299",
            num: "1",
            sum: "2299",
            dev: "快递配送：运费0元",
          },
        ],
        totalPrice: 4798.00,

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
      }
    }
  }
</script>
<style>
  .orderMsg_table {
    margin-top: 20px;
  }

  .table_product_img {
    float: left;
    margin-left: 20px;
  }

  .table_product_msg {
    float: left;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: self-start;
    flex-direction: column;
    font-size: 14px;
  }

  .table_product_msg p {
    margin-left: 10px;
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
    margin-top: -21px;
  }

  .orderMsg_total {
    float: right;
    position: relative;
    right: 20px;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: initial !important;
  }
</style>
