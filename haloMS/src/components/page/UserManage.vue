<template>
  <div class="usermanage">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-star-on"></i>
          用户管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="order_handleBox">
        <el-input v-model="select_word" placeholder="通过用户id筛选" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table :data="dataTable"  ref="multipleTable"  @selection-change="handleSelectionChange" style="width: 100%" class="elTable">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="order_form">
              <el-form-item label="用户ID">
                <span>{{props.row.userId}}</span>
              </el-form-item>
              <el-form-item label="用户名">
                <span>{{props.row.username}}</span>
              </el-form-item>
              <el-form-item label="安全等级">
                <span>{{props.row.securityLevel}}</span>
              </el-form-item>
              <el-form-item label="绑定邮箱">
                <span>{{props.row.email}}</span>
              </el-form-item>
              <el-form-item label="绑定手机">
                <span>{{props.row.phone}}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{GMTToStrCreate}}</span>
              </el-form-item>
              <el-form-item label="最后修改时间">
                <span>{{GMTToStrUpdate}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="用户ID" prop="userId" ></el-table-column>
        <el-table-column label="用户名" prop="username" ></el-table-column>
        <el-table-column label="安全等级" prop="securityLevel" ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
        <el-button @click="delVisible=false" size="medium">取 消</el-button>
        <el-button type="primary" @click="deleteRow" size="medium">确 定</el-button>
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
          id: '',
          name: '',
          description: '',
          price: '',
          stock: '',
          type: '',
          createtime:'',
          lastupdate:''
        },
        idx: -1,
        multipleSelection:[],
        del_list:[],
        pages: 0
      }
    },
    methods: {
      search(){
        var url = this.$rootUrl + "/api/ms/searchUser";
        const options = {
          method: 'POST',
          url: url,
          data: {
            key:this.select_word
          }
        };
        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.errorCode == 0) {
            this.dataTable = item.data.user;
          }
        })
      },
      // 分页导航
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getData();
      },
      getPages() {
        var url = this.$rootUrl + "/api/ms/getUserPage";
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
        var url = this.$rootUrl + "/api/ms/getUser";
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
            this.dataTable = item.data.users;
          }
        })
      },
      handleEdit(index, row) {
        this.idx = index;
        const item = this.dataTable[index];
        this.editVisible = true;
      },
      saveEdit() {
        this.$set(this.dataTable, this.idx, this.form);
        this.editVisible = false;
        this.$message.success("修改"+this.form.id+"成功");
      },
      handleDel(index,row){
        this.idx = index;
        this.delVisible = true;
      },
      deleteRow(){
        var id=this.dataTable[this.idx].userId
        var url = this.$rootUrl + "/api/ms/delUser";
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
            this.delVisible=false;
            this.$message.success("删除成功");
            this.getData();
          }
        })
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
    },
    created() {
      this.getPages()
      this.getData()
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
          return Str
        }
      },
      GMTToStrUpdate() {
        for (let i = 0; i < this.dataTable.length; i++) {
          let date = new Date(this.dataTable[i].gmtUpdate)
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
