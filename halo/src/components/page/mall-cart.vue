<template>
  <div class="container">
    <v-header currStep="购物车"></v-header>
    <div class="pageContain">
      <div class="cart_container">
        <el-table :data="product" clss="cart_table">
          <el-table-column type="selection" width="80" align="center"></el-table-column>
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
              <el-input-number v-model="scope.row.num" :min="1" :max="10"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column width="200" label="小计(元)" prop="sum" align="center">
            <template scope="scope">
              <span style="color: rgb(224, 43, 65)" class="table_price">￥{{scope.row.sum}}.00</span>
            </template>
          </el-table-column>
          </el-table-column>
          <el-table-column width="110" label="操作" align="center" >
            <template scope="scope">
              <i class="el-icon-close" @click="dialogVisible = true" style="cursor:pointer;"></i>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div  class="cart_footer">
        <a>删除选中的商品</a>
        <span></span>
      </div>

    </div>
    <el-dialog
    title="删除"
    :visible.sync="dialogVisible"
    width="30%"
    >
    <span>您确定要删除该商品吗？</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
  </div>

</template>
<script>
  import vHeader from '../common/header/headerLite';

  export default {
    data() {
      return {
        product: [
          {
            name: "魅族PRO 6s",
            version: "全网通公开版 星空黑 64GB",
            img: "https://openfile.meizu.com/group1/M00/00/C8/Cix_s1hGFveAE3RcAAOqzSlfPuA022.png@240x240.jpg",
            price: 2299,
            num: 1,
            sum: 2299,
            checked: true
          },
          {
            name: "魅族PRO7",
            img: "https://openfile.meizu.com/group1/M00/00/C8/Cix_s1hGFveAE3RcAAOqzSlfPuA022.png@240x240.jpg",
            version: "全网通公开版 提香红4GB+64GB",
            price: 2499,
            num: 1,
            sum: 2499,
            checked: true
          }
        ],
        allChecked: true,
        totalPrice: 0,
        productNum: 2,
        dialogVisible: false
      }
    },
    components: {
      vHeader
    },
    methods: {
      sum: function (index) {
        this.product[index].sum = this.product[index].num * this.product[index].price;

      },
      minus(index) {
        if (this.product[index].num > 1) {
          this.product[index].num--;
          this.sum(index);
        }

      },
      add(index) {
        this.product[index].num++;
        this.sum(index);
      },
      checked(index) {
        if (this.product[index].checked == false) {
          this.allChecked = false;
          this.productNum--;
        }
        else
          this.productNum++;
      },
      all: function () {
        this.allChecked = !this.allChecked;
        for (var i = 0; i < this.product.length; i++) {
          this.product[i].checked = this.allChecked;
          if (this.allChecked == false) {
            this.productNum = 0;
          }
          else
            this.productNum = 2;
        }
      },
      submit() {
        if (this.productNum != 0)
          location.href = "shopping_check.html#" + this.productNum;
      },

    },
    computed: {
      totalPrices: function () {
        this.totalPrice = 0;
        for (var i = 0; i < this.product.length; i++) {
          if (this.product[i].checked != false)
            this.totalPrice += this.product[i].sum;
        }
        return this.totalPrice;
      }
    }
  }
</script>
<style scoped>
  .container {
    background-color: #F6F6F6;
  }

  .cart_container {
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    background: #fff;
  }

  .el-table {
    text-align: left;
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

  limits {
    cursor: not-allowed !important;
  }

  .el-table-column:hover {
    background-color: #fff !important;
  }
</style>
