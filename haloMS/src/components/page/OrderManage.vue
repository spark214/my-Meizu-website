<template>
  <div class="ordermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i>
          订单管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
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
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="order_form">
              <el-form-item label="订单ID">
                <span>{{props.row.id}}</span>
              </el-form-item>
              <el-form-item label="商品ID">
                <p v-for="item in props.row.products">{{item.proId}}</p>
              </el-form-item>
              <el-form-item label="商品名称">
                <p v-for="item in props.row.products">{{item.title}}</p>
              </el-form-item>
              <el-form-item label="用户ID">
                <span>{{props.row.uid}}</span>
              </el-form-item>
              <el-form-item label="商品单价">
                <p v-for="item in props.row.products">{{item.price}}</p>
              </el-form-item>
              <el-form-item label="购买数量">
                <p v-for="item in props.row.products">{{item.number}}</p>
              </el-form-item>
              <el-form-item label="商品总价">
                <p v-for="item in props.row.products">{{item.total}}</p>
              </el-form-item>
                <el-form-item label="订单金额">
                <span>{{props.row.price}}</span>
              </el-form-item>
              <el-form-item label="订单状态">
              <span>{{orderStatus}}</span>
            </el-form-item>
              <el-form-item label="创建时间">
              <span>{{GMTToStr}}</span>
            </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="订单ID" prop="id" ></el-table-column>
        <el-table-column label="用户ID" prop="uid" ></el-table-column>
        <el-table-column label="订单金额" prop="price"  ></el-table-column>
        <el-table-column label="订单状态" prop="status"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
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
          <el-input v-model="form.status"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible=false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
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
        pages:0
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
            this.dataTable=item.data.orders;
          }
        })
      },
      handleEdit(index, row) {
        this.idx = index;
        this.editVisible = true;
      },
      saveEdit(index) {
        let up={
          "id":this.dataTable[this.idx],
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
      orderStatus(){
        for(let i=0;i<this.dataTable.length;i++){
          switch (this.dataTable[i].status){
            case 0:return "未付款";break;
            case 1:return "已付款";break;
            case 2:return "未发货";break;
            case 3:return "已发货";break;
            case 4:return "交易成功";break;
            case 5:return "交易关闭";break;
          }
        }

      },
      GMTToStr() {
        for (let i = 0; i < this.dataTable.length; i++) {
          let date = new Date(this.dataTable[i].gmtUpdated)
          let Str = date.getFullYear() + '-' +
            (date.getMonth() + 1) + '-' +
            date.getDate() + ' ' +
            date.getHours() + ':' +
            date.getMinutes() + ':' +
            date.getSeconds()
          return Str
        }
      }
    }
  }
</script>
<style>
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

  .elTable{
    border: 0.5px solid #ddd;
    border-radius: 5px;
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
</style>
