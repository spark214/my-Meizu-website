<template>
  <div class="ordermanage">
    <!--<div class="crumbs">-->
      <!--<el-breadcrumb separator="/">-->
        <!--<el-breadcrumb-item>-->
          <!--<i class="el-icon-tickets"></i>-->
          <!--订单管理-->
        <!--</el-breadcrumb-item>-->
      <!--</el-breadcrumb>-->
    <!--</div>-->
    <div class="container">
      <div class="order_handleBox">
        <el-select v-model="select_cate" placeholder="筛选种类" class="handle-select mr10" @change="selectChange">
          <el-option key="0" label="全部" value="-1"></el-option>
          <el-option key="1" label="未付款" value="0"></el-option>
          <el-option key="2" label="已付款" value="1"></el-option>
          <el-option key="3" label="未发货" value="2"></el-option>
          <el-option key="4" label="已发货" value="3"></el-option>
          <el-option key="5" label="交易成功" value="4"></el-option>
          <el-option key="6" label="交易关闭" value="5"></el-option>
        </el-select>
        <el-input size="small" v-model="keyword" placeholder="订单ID" style="width: 320px"></el-input>
        <el-button size="small" type="primary" @click="search">搜索</el-button>
      </div>
      <el-table :data="dataTable"  ref="multipleTable"  @selection-change="handleSelectionChange" style="width: 100%" class="elTable" v-loading="loading">
        <el-table-column label="订单ID" prop="id" min-width="150"></el-table-column>
        <el-table-column label="用户ID" prop="uid" ></el-table-column>
        <el-table-column label="用户名" prop="user.username" ></el-table-column>
        <el-table-column label="总价" prop="price"></el-table-column>
        <el-table-column label="订单状态" prop="statusName"></el-table-column>
        <el-table-column label="下单时间" prop="createTime"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="handleDetail(scope.$index,scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="total" page-size="10">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="提示" width="300px" center :visible.sync="delVisible">
      <div class="del-dialog">删除不可恢复，是否确定删除?</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible=false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="editVisible" width="300px">
      <el-form ref="form" label-width="40px" :model="form">
        <el-form-item label="状态">
          <el-select v-model="form.status" class="handle-select mr10" style="width: 220px;">
            <el-option key="1" label="未付款" value="0"></el-option>
            <el-option key="2" label="已付款" value="1"></el-option>
            <el-option key="3" label="未发货" value="2"></el-option>
            <el-option key="4" label="已发货" value="3"></el-option>
            <el-option key="5" label="交易成功" value="4"></el-option>
            <el-option key="6" label="交易关闭" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="padding-top: 0!important;">
                <el-button @click="editVisible=false" size="small">取 消</el-button>
                <el-button type="primary" @click="saveEdit" size="small">确 定</el-button>
            </span>
    </el-dialog>

    <el-dialog title="编辑" :visible.sync="editShipmentVisible" width="40%">
      <div class="editShipmentDialog-item">
        <p>收货人姓名</p>
        <el-input v-model="shipment.receiver"></el-input>
      </div>
      <div  class="editShipmentDialog-item">
        <p>收货人手机</p>
        <el-input v-model="shipment.phone"></el-input>
      </div>
      <div  class="editShipmentDialog-item">
        <p>详细地址</p>
        <el-input v-model="shipment.address"></el-input>
      </div>
      <div  class="editShipmentDialog-button">
        <el-button @click="updateShipment" size="small" type="primary">确定</el-button>
      </div>
      </el-dialog>

    <el-dialog :visible.sync="orderDetailDialog" width="780px" title="订单详情">
      <div>
        <p>订单号：{{orderDetail.id}}</p>
        <p>订单状态：{{orderDetail.statusName}}</p>
        <p>下单时间：{{orderDetail.createTime}}</p>
        <p>最后修改时间：{{orderDetail.updateTime}}</p>
      </div>
      <div class="orderDialog-product">
        <h4>商品信息</h4>
        <el-table :data="orderDetail.products" class="orderDetailDialog-table" ref="multipleTable" border max-height="500">
          <el-table-column max-width="510" min-width="180" label="商品" class="table_product clearfix" align="center">
            <template scope="scope">
              <img :src="scope.row.imgUrl" width="60" height="60" class="table_product_img">
              <div class="table_product_msg">
                <p>{{scope.row.title}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column max-width="169" label="单价(元)" align="center">
            <template scope="scope">
              <span class="table_price">￥{{scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column max-width="150" label="数量" align="center">
            <template scope="scope">
              <span>{{scope.row.number}}</span>
            </template>
          </el-table-column>
          <el-table-column max-width="170" label="小计(元)" prop="total" align="center">
            <template scope="scope">
              <span style="color: rgb(224, 43, 65)" class="table_price">￥{{scope.row.total}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="orderDialog-product-total">
          <p>总金额:<span style="color: rgb(224, 43, 65)">￥{{totalPrices}}</span></p>
        </div>
      </div>
      <div>
        <h4>收货人信息</h4>
        <div>
          <p>收件人姓名：{{orderDetail.address.receiver}}</p>
          <p>联系方式：{{orderDetail.address.phone}}</p>
          <p>详细地址：{{orderDetail.address.address}}</p>
        </div>
      </div>
      <div class="orderDialog-product-button">
        <el-button size="small" type="primary" @click="editVisible = true">修改状态</el-button>
        <el-button size="small" type="primary" @click="handleShipment()">编辑收货人信息</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage:1,
        select_cate: '',
        select_word: '',
        delVisible: false,
        editVisible: false,
        dataTable: [],
        form: {
         status:""
        },
        idx: -1,
        multipleSelection:[],
        del_list:[],
        pages:0,
        orderDetailDialog:false,
        orderDetail:{
          address:{
            receiver:'',
            phone:'',
            address:''
          }
        },
        keyword:'',
        editShipmentVisible:false,
        shipment:{
          receiver:'',
          phone:'',
          address:''
        },
        total:0,
        loading:false
      }
    },
    methods: {
      search(){
        if(this.keyword !== ''){
          this.loading = true;
          var url = this.$rootUrl + "/api/ms/searchOrderById";
          const options = {
            method: 'POST',
            url: url,
            data: {
              id:this.keyword
            }
          };
          this.$axios(options).then((res) => {
            let item = res.data.data;
            this.dataTable = [];
            this.total = 0;
            if (item.code && item.code == 0 && item.data) {
              this.dataTable = [];
              this.dataTable.push(item.data);
            }else if(item.erroeCode == '403'){
              this.$message.error(item.msg);
              sessionStorage.setItem('pageHistory',this.$route.fullPath);
              this.$router.push({path: '/login'});
            }else if(!item.data){
              this.$message.error('暂无数据');
            } else{
              this.$message.error(item.message);
            }
          this.loading = false;
          })
        }else{
          this.getData();
        }
      },
      // 分页导航
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData();
      },
      getData(){
        this.loading = true;
        var url = this.$rootUrl + "/api/ms/getOrder";
        const options = {
          method: 'POST',
          url: url,
          data: {
            pageSize:10,
            pageIndex:this.currentPage
          }
        };
        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.code && item.code == 0) {
            this.dataTable = item.data.orders;
            this.total = item.data.count;
          }else if(item.erroeCode == '403'){
            this.$message.error(item.msg);
            sessionStorage.setItem('pageHistory',this.$route.fullPath);
            this.$router.push({path: '/login'});
          }else{
            this.$message.error(item.message);
          }
        this.loading = false;
        })
      },
      handleDetail(index,row){
        this.orderDetail = this.dataTable[index];
        this.orderDetailDialog = true;
      },
      saveEdit(index) {
        if(this.form.status == ''){
          this.$message.error('请选择状态');
        }else{
          let up={
            id:this.orderDetail.id,
            status:this.form.status
          }
          var url = this.$rootUrl + "/api/ms/updateOrderStatus";
          const options = {
            method: 'POST',
            url: url,
            data: up
          };
          this.$axios(options).then((res) => {
            let item = res.data.data;
            if (item.code && item.code == 0) {
              this.editVisible = false;
              this.$message.success("修改成功");
              this.orderDetail.statusName = item.data;
              this.getData();
            }else if(item.erroeCode == '403'){
              this.$message.error(item.msg);
              sessionStorage.setItem('pageHistory',this.$route.fullPath);
              this.$router.push({path: '/login'});
            }else{
              this.$message.error(item.message);
            }
          })
        }

      },
      handleDel(index,row){
        this.idx = index;
        this.delVisible = true;
      },
      deleteRow(){
        this.dataTable.splice(this.idx, 1);
        this.$message.success('删除成功');
        this.delVisible = false;
      },
      deleteSelected(){
        const length = this.multipleSelection.length;
        let str = '';
        this.del_list = this.del_list.concat(this.multipleSelection);
        for (let i = 0; i < length; i++) {
          str += this.multipleSelection[i].name + ' ';
        }
        this.$message.error('删除了' + str);
        this.multipleSelection = [];
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      selectChange(){
        if(this.select_cate >= 0){
          this.loading = true;
          var url = this.$rootUrl + "/api/ms/searchOrder";
          const options = {
            method: 'POST',
            url: url,
            data: {
              status:this.select_cate,
              pageIndex:1,
              pageSize:5
            }
          };
          this.$axios(options).then((res) => {
            let item = res.data.data;
            this.dataTable = [];
            this.total = 0;

            if (item.code && item.code == 0 && item.data) {
              this.dataTable = item.data.orders;
              this.total = item.data.count;
            }else if(item.erroeCode == '403'){
              this.$message.error(item.msg);
              sessionStorage.setItem('pageHistory',this.$route.fullPath);
              this.$router.push({path: '/login'});
            }else if(!item.data){
              this.$message.error('暂无数据');
            }else{
              this.$message.error(item.message);
            }
          this.loading = false;
          })
        }else{
          this.getData();
        }

      },
      handleShipment(){
        this.shipment = {
          receiver:this.orderDetail.address.receiver,
          phone:this.orderDetail.address.phone,
          address:this.orderDetail.address.address
        };
        this.editShipmentVisible = true;
      },
      updateShipment(){
        if(this.shipment.receiver == '' || this.shipment.phone == '' || this.shipment.address == ''){
          this.$message.error('请检查完善信息');
        }else{
          this.shipment.sid = this.orderDetail.address.sid;
          var url = this.$rootUrl + "/api/ms/updateShipment";
          const options = {
            method: 'POST',
            url: url,
            data:this.shipment
          };
          this.$axios(options).then((res) => {
            let item = res.data.data;
            if (item.code && item.code == 0) {
              this.editShipmentVisible = false;
              this.$message.success("修改成功");
              this.getData();
              this.orderDetail.address = {
                receiver:this.shipment.receiver,
                phone:this.shipment.phone,
                address:this.shipment.address
              }
            }else if(item.erroeCode == '403'){
              this.$message.error(item.msg);
              sessionStorage.setItem('pageHistory',this.$route.fullPath);
              this.$router.push({path: '/login'});
            }else{
              this.$message.error(item.message);
            }
          })
        }

      }
    },
    created(){
      this.getData();
    },
    computed: {
      totalPrices() {
        let alltotal = 0;
        if(this.orderDetail.products){
          for (let i = 0; i < this.orderDetail.products.length; i++) {
            alltotal += this.orderDetail.products[i].total;
          }
        }
        return alltotal.toFixed(2);
      }
    }
  }
</script>
<style lang="less">
  @import "common.less";
  .order_handleBox {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 150px;
    margin-right: 16px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }

  .order_form .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .table_product_img {
    float: left;
    /*margin-left: 20px;*/
    /*margin-top: 25px;*/
  }

  .table_product_msg {
   text-align: left;
    margin-top: 8px;
  }

  .orderDialog-product{
    margin-top: 15px;
    .orderDialog-product-total{
      text-align: right;
      margin-top: 8px;
    }
  }
  .orderDialog-product-button{
    margin-top: 15px;
    text-align: right;
  }
  .editShipmentDialog-item {
    margin-top: 15px;
    p{
      margin-bottom: 5px;
    }
    &:first-child{
    margin-top: 0;
     }
  }
  .editShipmentDialog-button{
    margin-top: 20px;
  }
</style>
