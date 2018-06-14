<template>
  <div class="orderMsg">
    <h4 style="font-weight: bold">确定订单信息</h4>
    <el-table :data="product" clss="cart_table" id="cart_table" ref="multipleTable" >
      <el-table-column width="450" label="商品" class="table_product clearfix" align="center">
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
      <el-table-column width="200" label="数量" align="center">
        <template scope="scope">
          <span >￥{{scope.row.num}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" label="小计(元)" prop="sum" align="center">
        <template scope="scope">
          <span style="color: rgb(224, 43, 65)" class="table_price" >￥{{scope.row.sum}}.00</span>
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column width="110" label="操作" align="center">
        <template slot-scope="scope">
          <i class="el-icon-close" style="cursor:pointer;" @click="handleDel(scope.$index,scope.row)" id="deleteIcon"></i>
        </template>
      </el-table-column>

    </el-table>

    <!--<el-table :data="product" border style="width: 96%">-->
      <!--<el-table-column width="200">-->
        <!--<p v-text="item.name"></p>-->
        <!--<p v-text="item.version"></p></td>-->
      <!--</el-table-column>-->
      <!--<tr>-->
        <!--<td width="438px" height="62px" valign="middle"><h4><b>商品</b></h4></td>-->
        <!--<td width="228px" height="62px" valign="middle"><h4><b>单价</b></h4></td>-->
        <!--<td width="140px" height="62px" valign="middle"><h4><b>数量</b></h4></td>-->
        <!--<td width="160px" height="62px" valign="middle"><h4><b>小计</b></h4></td>-->
        <!--<td width="192px" align="center" height="62px" valign="middle"><h4><b>配送方式</b></h4></td>-->
      <!--</tr>-->
      <!--<tr v-for="item in product">-->
        <!--<td class="clearfix orderMsg_product"><img :src="item.img" width="102px" height="102px">-->
          <!--<p v-text="item.name"></p>-->
          <!--<p v-text="item.version"></p></td>-->
        <!--<td height="150px"><p v-text="'￥'+item.price" style="color: #e02b41"></p></td>-->
        <!--<td height="150px" align="left"><p style="padding-left: 13px" v-text="item.num"></p></td>-->
        <!--<td height="150px"><p v-text="'￥'+item.sum" style="color: #e02b41"></p></td>-->
        <!--<td height="150px" align="center" style="border:1px solid #ccc " :rowspan="item.row" v-show="item.row!=0">-->
          <!--<p v-text="item.dev"></p></td>-->

      <!--</tr>-->
      <!--<tfoot>-->
      <!--<tr bgcolor="#f6f6f6">-->
        <!--<td colspan="5">-->

          <!--<div class="orderMsg_total" style="font-size: 16px">-->
            <!--合计-->
            <!--<span style="font-size: 22px;color:#e02b41;font-weight: bold;" v-text="'￥'+totalPrice+'.00'"></span>-->
          <!--</div>-->
        <!--</td>-->
      <!--</tr>-->
      <!--</tfoot>-->
    <!--</el-table>-->
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
            row: 2
          },
          {
            name: "魅族PRO7",
            img: "https://openfile.meizu.com/group1/M00/00/C8/Cix_s1hGFveAE3RcAAOqzSlfPuA022.png@240x240.jpg",
            version: "全网通公开版 提香红4GB+64GB",
            price: "2499",
            num: "1",
            sum: "2499",
            dev: "快递配送：运费0元",
            row: 0
          }
        ],
        totalPrice: 4798.00,

      }
    },
  }
</script>
<style>
  .orderMsg_product img {
    float: left;
  }

  .orderMsg_product p {
    position: relative;
    top: 20px;
  }

  .orderMsg {
    width: 100%;
    position: relative;
    top: 10px;
    padding-bottom: 20px;
  }

  .orderMsg_tr {
    border: 2px solid black ;
  }

  .orderMsg > table {
    width: 96%;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    font-size: 16px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .orderMsg > h4, .paymentMsg > h4 {
    padding-top: 20px;
    padding-left: 20px;
  }

  .orderMsg_info textarea {
    width: 502px;
    height: 48px;
    resize: none;
  }

  .orderMsg_info {
    font-size: 12px;
    float: left;
    width: 600px;
    margin: 20px 0 20px 15px;
  }

  .orderMsg_total {
    float: right;
    position: relative;
    top: 30px;
    right: 20px;
  }
</style>
