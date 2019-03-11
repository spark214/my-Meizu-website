<template>
  <div class="container">
    <v-header currStep="购物车"></v-header>
    <div class="pageContain">
      <div class="login_container" v-if="isLogin">
        <div class="cart_container">
          <el-table :data="product" clss="cart_table" id="cart_table" ref="multipleTable"
                    @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="80" align="center"></el-table-column>
            <el-table-column width="450" label="商品" class="table_product clearfix" align="center">
              <template scope="scope">
                <img :src="scope.row.imgUrl" width="100" height="100" class="table_product_img">
                <div class="table_product_msg">
                  <p>{{scope.row.title}}</p>
                </div>

              </template>
            </el-table-column>
            <el-table-column width="200" label="单价(元)" align="center">
              <template scope="scope">
                <span class="table_price">￥{{scope.row.price.toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column width="200" label="数量" align="center">
              <template scope="scope">
                <el-input-number v-model="scope.row.number" :min="1" :max="10"
                                 @change="scope.row.total=scope.row.number*scope.row.price;changeAmount(scope.$index)"></el-input-number>
              </template>
            </el-table-column>
            <el-table-column width="200" label="小计(元)" prop="sum" align="center">
              <template scope="scope">
                <span style="color: rgb(224, 43, 65)" class="table_price">￥{{scope.row.total.toFixed(2)}}</span>
              </template>
            </el-table-column>
            </el-table-column>
            <el-table-column width="110" label="操作" align="center">
              <template slot-scope="scope">
                <i class="el-icon-close" style="cursor:pointer;" @click="handleDel(scope.$index,scope.row)"
                   id="deleteIcon"></i>
              </template>
            </el-table-column>

          </el-table>

        </div>
        <div class="cart_footer clearfix" :class="{fixed:barShow}">
          <a @click="deleteSelected">删除选中的商品</a>
          <div class="footer_right">
            <span> 合计(不含运费)： <span class="table_price" style="color: rgb(224, 43, 65)" v-model="totalPrices">￥{{totalPrice}}.00</span></span>
            <el-button size="small" type="primary" @click="goBuy">去结算</el-button>
          </div>
        </div>
      </div>
      <div class="nologin_container" v-else>
        <div class="clearfix">
          <img src="../../../static/img/noLoginPanda.png">
          <div class="nologin_msg">
            <h3>您还没有登录！</h3>
            <p>登录后可显示您账号中已加入的商品哦~</p>
            <el-button type="primary" size="medium" @click="goRouter('login')">去登陆</el-button>
          </div>

        </div>
      </div>

      <v-footer></v-footer>
    </div>
    <el-dialog
      title="删除"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>您确定要删除该商品吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteRow">确 定</el-button>
  </span>
    </el-dialog>

  </div>

</template>
<script>
  import vHeader from '../common/header/page/headerLite';
  import vFooter from '../common/footer';
  import qs from 'qs';

  export default {
    data() {
      return {
        product: [],
        allChecked: true,
        totalPrice: 0,
        productNum: 2,
        dialogVisible: false,
        barShow: false,
        idx: -1,
        multipleSelection: [],
        del_list: [],
        isLogin: true,
      }
    },
    components: {
      vHeader, vFooter
    },
    methods: {
      goBuy() {
        var url = this.$rootUrl + "/api/order/settlement";
        var token = sessionStorage.getItem('accessToken');
        const options = {
          method: 'POST',
          headers: {'token': token},
          url: url,
          data: this.product
        };

        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.errorCode == 0) {
            sessionStorage.setItem('orderId', item.data.orderId);
            sessionStorage.setItem('address', JSON.stringify(item.data.address));
            sessionStorage.setItem('orderProduct', JSON.stringify(item.data.orderProducts));
            this.$router.push({path: "/mallCheck",query:{"type":2}})
          }
        })
      },
      changeAmount(index) {
        var url = this.$rootUrl + "/api/carts/updateCart" ;
        var token = sessionStorage.getItem('accessToken');
        let quantity = {'quantity': this.product[index].number}
        console.log(quantity)
        const options = {
          method: 'POST',
          headers: {'token': token},
          url: url,
          data: {
            params: quantity,
            proId: this.product[index].proId
          }
        };

        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.errorCode == 0) {

          }
        })
      },
      getData() {
        var url = this.$rootUrl + "/api/carts/getCart";
        var token = sessionStorage.getItem('accessToken');
        const options = {
          method: 'GET',
          headers: {'token': token},
          url: url,
          data: {}
        };

        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.errorCode == 0) {
            this.product = item.data.cart.carts;
            this.productNum = item.data.cart.totalNumber;
            this.totalPrice = item.data.cart.totalPrice;
            this.product.forEach((val, index) => {
              val["total"] = val["price"];
            });
          }
        })
      },
      goRouter(that) {
        this.$router.push({path: "/" + that});
      },
      handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var detailPosition = document.getElementById("cart_table").offsetTop
        var height = document.getElementById("cart_table").offsetHeight
        if (scrollTop > (height / 3)) {
          this.barShow = false;
        }
        else if (height < 500) {
          this.barShow = false;
        }
        else {
          this.barShow = true;
        }

      },
      deleteSelected() {
        const length = this.multipleSelection.length;
        let str = '';
        this.del_list = this.del_list.concat(this.multipleSelection);
        this.multipleSelection = [];
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDel(index, row) {
        this.idx = index;
        this.dialogVisible = true;
      },
      deleteRow() {

        var url = this.$rootUrl + "/api/carts/delCart" ;
        var token = sessionStorage.getItem('accessToken');
        const options = {
          method: 'POST',
          headers: {'token': token},
          url: url,
          data: {
            proId:this.product[this.idx].proId
          }
        };

        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.errorCode == 0) {
            this.$message.success('删除成功');
            this.handleScroll();
            this.dialogVisible = false;
            this.getData();
          }
        })
      },

    },
    computed: {
      totalPrices: function () {
        this.totalPrice = 0;
        for (let i = 0; i < this.product.length; i++) {
          this.totalPrice += (this.product[i].price * this.product[i].number);
        }
        return this.totalPrice;
      }
    },
    mounted() {
      // this.data()
      setTimeout(() => {
        this.handleScroll()
      }, 300)
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleScroll)
      document.getElementById('deleteIcon').addEventListener('click', this.handleScroll)


    },
    created() {
      this.getData()
    }
  }
</script>
<style scoped>
  .container {
    background-color: #F6F6F6;
  }

  .cart_container, .nologin_container {
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    background: #fff;
  }

  .nologin_container {
    height: 360px;
    position: relative;

  }

  .nologin_container > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .nologin_container img {
    float: left;
  }

  .nologin_container .nologin_msg {
    float: left;
    line-height: 40px;
    margin-left: 30px;
    color: #666;
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

  .cart_footer {
    font-size: 14px;
    color: #999;
    width: 100%;
    height: 70px;
    line-height: 70px;
    margin-top: 10px;
    background-color: #fff;
  }

  .cart_footer > a {
    float: left;
    cursor: pointer;
    margin-left: 30px;
  }

  .footer_right {
    float: right;
    margin-right: 20px;
  }

  .footer_right span {
    margin-right: 10px;
  }

  .fixed {
    position: fixed !important;
    bottom: 0;
    left: 0;
    z-index: 999;
  }
</style>
