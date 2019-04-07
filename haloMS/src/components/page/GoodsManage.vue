<template>
  <div class="goodsmanage">
    <!--<div class="crumbs">-->
      <!--<el-breadcrumb separator="/">-->
        <!--<el-breadcrumb-item>-->
          <!--<i class="el-icon-goods"></i>-->
          <!--商品管理-->
        <!--</el-breadcrumb-item>-->
      <!--</el-breadcrumb>-->
    <!--</div>-->
    <div class="container">
      <div class="order_handleBox">
        <el-select v-model="select_cate" placeholder="筛选种类" class="handle-select mr10">
          <el-option key="1" label="手机" value="手机"></el-option>
          <el-option key="2" label="智能设备" value="智能设备"></el-option>
          <el-option key="3" label="智能穿戴" value="智能穿戴"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table :data="dataTable" ref="multipleTable" @selection-change="handleSelectionChange" style="width: 100%"
                class="elTable">
        <el-table-column label="商品ID" prop="id"></el-table-column>
        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="库存量" prop="stock"></el-table-column>
        <el-table-column label="商品类别" prop="typeName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="handleDetail(scope.$index,scope.row)">查看</el-button>
            <el-button size="small" type="primary" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
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
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="库存增减量">
          <el-input v-model="form.num" placeholder="正数增加，负数减少"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible=false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>

    <el-dialog :visible.sync="detailDialogVisible" width="740px" title="商品详情">
      <div class="detailDialog-header">
        <p><label>商品编号：</label>{{productDetail.id}}</p>
        <p><label>商品类别：</label>{{productDetail.typeName}}</p>
        <p><label>商品名称：</label>{{productDetail.name}}</p>
        <p><label>商品价格：</label>{{productDetail.price}}</p>
        <p><label>商品库存量：</label>{{productDetail.stock}}</p>
        <p><label>创建时间：</label>{{productDetail.createTime}}</p>
        <p><label>最近更新时间：</label>{{productDetail.updateTime}}</p>
      </div>
      <div class="detailDialog-description">
        <p>产品描述: </p>
        <div v-html="detailDesc" class="detailDialog-description-div"></div>
      </div>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage: 1,
        select_cate: '',
        select_word: '',
        delVisible: false,
        editVisible: false,
        dataTable: [],
        form: {
          id: '',
          name: '',
          price: '',
          num: '',
        },
        idx: -1,
        multipleSelection: [],
        del_list: [],
        pages: 0,
        productDetail:{},
        detailDesc:'',
        detailDialogVisible:false
      }
    },
    methods: {
      search(){
        var url = this.$rootUrl + "/api/ms/searchProduct";
        const options = {
          method: 'POST',
          url: url,
          data: {
            type:this.select_cate,
            name:this.select_word,
            pageIndex:1,
            pageSize:10
          }
        };
        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.errorCode == 0) {
            this.dataTable = item.data.items;
          }
        })
      },
      // 分页导航
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData();
      },
      getPages() {
        var url = this.$rootUrl + "/api/ms/getProductPage";
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
            this.pages = item.data.pages;
          }
        })
      },
      getData() {
        var url = this.$rootUrl + "/api/ms/getProduct";
        const options = {
          method: 'POST',
          url: url,
          data: {
            pageIndex:this.currentPage,
            pageSize:10
          }
        };
        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.errorCode == 0) {
            this.dataTable = item.data.items;
          }
        })
      },
      handleEdit(index, row) {
        this.idx = index;
        const item = this.dataTable[index];
        this.form = {
          id: item.id,
          name: item.name,
          price: item.price,
          num: "",
        }
        this.editVisible = true;
      }
      ,
      saveEdit() {
        var url = this.$rootUrl + "/api/ms/updateProduct";
        const options = {
          method: 'POST',
          url: url,
          data: this.form
        };
        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.errorCode == 0) {
            this.editVisible = false;
            this.$message.success("修改成功");
            this.getData();
          }
        })
      }
      ,
      handleDel(index, row) {
        this.idx = index;
        this.delVisible = true;
      },
      handleDetail(index,row){
        this.productDetail = this.dataTable[index];
        this.detailDesc = this.productDetail.description.replace(/data-original/g,"src");
        this.detailDialogVisible = true;
      },
      deleteRow() {
        var id=this.dataTable[this.idx].id
        var url = this.$rootUrl + "/api/ms/delProduct";
        const options = {
          method: 'POST',
          url: url,
          data: {
            id:id
          }
        };
        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.errorCode == 0) {
            this.delVisible = false;
            this.$message.success("删除成功");
            this.getData();
          }
        })

        this.$message.success('删除成功');
        this.delVisible = false;
      }
      ,
      deleteSelected() {
        const length = this.multipleSelection.length;
        let str = '';
        this.del_list = this.del_list.concat(this.multipleSelection);
        for (let i = 0; i < length; i++) {
          str += this.multipleSelection[i].name + ' ';
        }
        this.$message.error('删除了' + str);
        this.multipleSelection = [];
      }
      ,
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
      ,
    },
    created() {
      this.getPages();
      this.getData();
    },
    computed:{
      GMTToStrCreate() {
        for (let i = 0; i < this.dataTable.length; i++) {
          let date = new Date(this.dataTable[i].gmtCreate)
          let Str = date.getFullYear() + '-' +
            (date.getMonth() + 1) + '-' +
            date.getDate() + ' ' +
            date.getHours() + ':' +
            date.getMinutes() + ':' +
            date.getSeconds()
          return Str;
        }
      },
      GMTToStrUpdate() {
        for (let i = 0; i < this.dataTable.length; i++) {
          let date = new Date(this.dataTable[i].gmtUpdated)
          let Str = date.getFullYear() + '-' +
            (date.getMonth() + 1) + '-' +
            date.getDate() + ' ' +
            date.getHours() + ':' +
            date.getMinutes() + ':' +
            date.getSeconds()
          return Str;
        }
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

  .container {
    padding: 20px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .pagination {
    margin: 20px 0;
    text-align: right;
  }

  .el-button {
    width: 50px !important;
    height: 31px !important;
    padding-left:10px ;
    padding-right: 10px;
  }

  .detailDialog-header{
    p{
      padding: 10px 0;

    &:first-child{
      padding-top: 0;
     }

     p{
       color: #666666;
     }
      label{
        color: #999999;
        display: inline-block;
        width: 100px;
      }
    }
  }
  .detailDialog-description{
    margin-top: 20px;
    line-height: 0;
  p{
    color: #666666;
  }

  .detailDialog-description-div{
    height: 500px;
    overflow-y: auto;
    margin-top: 20px;
  }

    img{
      display: inline-block;
      width: 700px!important;
      text-align: center;
    }
  }
</style>
