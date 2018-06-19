<template>
  <div>
    <div class="addressWrite">
      <h3 class="write_title">{{content}}</h3>
      <v-write :form="form" :type="1" :length="addrDate.length"></v-write>
    </div>
    <div class="addressHave">
      <h3 class="addressWrite">已有地址</h3>
      <div class="order_table_header">
        <ul class="clearfix">
          <li style="width: 150px">收货人姓名</li>
          <li style="width: 450px">收货人地址</li>
          <li style="width: 200px">收货人手机号</li>
          <li style="width: 180px">操作</li>
        </ul>
      </div>
      <el-table
        :data="addrDate"
        class="addr_table">
        <el-table-column
          prop="name"
          width="150"></el-table-column>
        <el-table-column
          prop="addr"
          width="450"></el-table-column>
        <el-table-column
          prop="tel"
          width="200"></el-table-column>
        <el-table-column
          width="200">
          <template slot-scope="scope">
            <span class="blue" @click="updateAddr(scope.$index, scope.row)">修改</span>
            <span style="color:#ccc;cursor: pointer">删除</span>
            <span class="blue">设为默认</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import vWrite from "../common/addressWrite";

  export default {
    data() {
      return {
        content: "新增收货地址",
        form: {name: "", tel: "", addr: "", checked: ""},
        addrDate: [
          {name: "林梓键", tel: "13192256005", addr: "广东省汕头市金平区", checked: true},
          {name: "林先生", tel: "13411942184", addr: "广东省汕头市金平区", checked: false},
          {name: "林贰壹", tel: "13192256005", addr: "广东省汕头市金平区", checked: false},
        ],
        updateSelected: -1,
      }
    },
    components: {
      vWrite,
    },
    methods: {
      updateAddr(index, row) {
        this.form = this.addrDate[index]
        this.content="修改收货地址"
      }
    },
    updated() {
      window.scroll(0, 0);
    }
  }
</script>
<style scoped>
  .addressWrite {
    margin-top: 20px;
    color: #666666;
  }

  .addressHave {
    position: relative;
  }

  .order_table_header {
    width: 100%;
    height: 40px;
    margin-top: 20px;
    background-color: #fafafc;
    display: flex;
    align-items: center;
    z-index: 100;
    position: absolute;
  }

  .order_table_header li {
    float: left;
    text-align: center;
    font-size: 14px;
    color: #666666;
  }

  .addr_table {
    position: absolute;
    top: 60px;
    width: 100%;
    text-align: center;
  }

  .blue {
    cursor: pointer;
    display: inline-block;
  }

  .blue:first-child {
    margin-right: 10px;
  }

  .blue:last-child {
    margin-left: 10px;
  }

  .blue:hover {
    color: #00a7ea !important;
  }
</style>
