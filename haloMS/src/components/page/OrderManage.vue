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
          <el-option key="1" label="未付款" value="0"></el-option>
          <el-option key="2" label="已付款" value="1"></el-option>
          <el-option key="3" label="未发货" value="2"></el-option>
          <el-option key="4" label="已发货" value="3"></el-option>
          <el-option key="5" label="交易成功" value="4"></el-option>
          <el-option key="6" label="交易关闭" value="5"></el-option>
        </el-select>
      </div>
      <el-table :data="dataTable"  ref="multipleTable"  @selection-change="handleSelectionChange" style="width: 100%" class="elTable">
        <el-table-column label="订单ID" prop="id" ></el-table-column>
        <el-table-column label="用户ID" prop="uid" ></el-table-column>
        <el-table-column label="订单状态" prop="statusName"></el-table-column>
        <el-table-column label="最后修改时间" prop="lastUpdateTime"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="handleDetail(scope.$index,scope.row)">查看详情</el-button>
            <el-button size="small" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next"  :page-count="pages">
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

    <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
      <el-form ref="form" label-width="40px" :model="form">
        <el-form-item label="状态">
          <el-select v-model="form.status" class="handle-select mr10">
            <el-option key="1" label="未付款" value="0"></el-option>
            <el-option key="2" label="已付款" value="1"></el-option>
            <el-option key="3" label="未发货" value="2"></el-option>
            <el-option key="4" label="已发货" value="3"></el-option>
            <el-option key="5" label="交易成功" value="4"></el-option>
            <el-option key="6" label="交易关闭" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible=false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>

    <el-dialog :visible.sync="orderDetailDialog" width="780px">
      <div>
        <p>订单号：{{orderDetail.id}}</p>
        <p>订单状态：{{orderDetail.statusName}}</p>
        <p>支付方式：{{orderDetail.payType}}</p>
        <p>最后修改时间：{{orderDetail.lastUpdateTime}}</p>
      </div>
      <div>
        <el-table :data="orderDetail.products" class="cart_table" ref="multipleTable" border>
          <el-table-column max-width="510" label="商品" class="table_product clearfix" align="center">
            <template scope="scope">
              <img :src="scope.row.imgUrl" width="100" height="100" class="table_product_img">
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
        <div>
          <p>总金额:{{totalPrices}}</p>
        </div>
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
        orderDetail:{}
      }
    },
    methods: {
      // 分页导航
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData();
      },
      getPages(){
        var url = this.$rootUrl + "/api/ms/getOrderPage";
        const options = {
          method: 'POST',
          url: url,
          data: {
            pageSize:10
          }
        };
        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.errorCode == 0) {
            this.pages=item.data.pages;
          }
        })
      },
      getData(){
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
          if (item.errorCode == 0) {
            this.dataTable = item.data.orders;
          }
        })
      },
      handleEdit(index, row) {
        this.idx = index;
        this.editVisible = true;
      },
      handleDetail(index,row){
        this.orderDetail = this.dataTable[index];
        this.orderDetailDialog = true;
      },
      saveEdit(index) {
        let up={
          "id":this.idx,
          "status":this.form.status
        }
        var url = this.$rootUrl + "/api/ms/updateOrderStatus";
        const options = {
          method: 'POST',
          url: url,
          data: up
        };
        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.errorCode == 0) {
            this.editVisible = false;
            this.$message.success("修改成功");
            this.getData();
          }
        })
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
          if (item.errorCode == 0) {
            this.dataTable = item.data.orders;
          }
        })
      }
    },
    created(){
      this.getPages();
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
    width: 120px;
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
  .el-button{
    width: 80px !important;
    height: 31px !important;
  }

  .table_product_img {
    float: left;
    margin-left: 20px;
    margin-top: 25px;
  }

  .table_product_msg {
    float: left;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: self-start;
    flex-direction: column;
    font-size: 15px;
  }
</style>
