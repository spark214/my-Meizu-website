<template>
  <div class="mallCheck_address">
    <h4  class="receiverMsg_title">收货人信息</h4>
    <div class="receiverMsg_box clearfix">
      <ul>
        <li id="hasMsg" v-for="(item,index) in receiver" style="font-size: 12px" class="receiverMsg_box_li clearfix"
            v-show="receiver.length!=0" @click="receiverOn(index)">
          <div class="receiverMsg_li_box" :class="{'receiverMsg_selected':item.selected}" >
            <div style="border-bottom: 1px solid #EFEFEF" class="clearfix">
              <span v-text="item.name" id="receiverName"></span>
              <span v-text="item.tel" id="receiverTel" class="clearfix"></span>
            </div>
            <p v-text="item.addr" id="receiverAddr"></p>

            <div class="receiverMsg_box_checked" v-show="item.selected">
              <div class="receiverMsg_box_tick"></div>
            </div>
          </div>

          <div class="receiverMsg_li_bottom">
            <a>修改</a>
            <a>删除</a>
          </div>
        </li>
        <li id="addMsg" v-show="receiver.length<10" @click="dialogFormVisible = true">
          <div>
            <div><i class="el-icon-circle-plus-outline"></i></div>
            <p>添加新地址</p>
          </div>

        </li>
      </ul>
    </div>
    <el-dialog title="添加收货地址" :visible.sync="dialogFormVisible" class="addAddr">
      <el-form >
        <el-form-item label="收货人姓名" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收货人电话" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input  auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        receiver: [
          {name: "林梓键", tel: "13192256005", addr: "广东省珠海市香洲区北理工", selected: true},
          {name: "ToZLam", tel: "13411942184", addr: "广东省汕头市龙湖区泰星路", selected: false},
          {name: "ToZLam", tel: "13411942184", addr: "广东省汕头市龙湖区泰星路", selected: false},
          {name: "ToZLam", tel: "13411942184", addr: "广东省汕头市龙湖区泰星路", selected: false},
          {name: "ToZLam", tel: "13411942184", addr: "广东省汕头市龙湖区泰星路", selected: false},
        ],
        dialogFormVisible:false
      }
    },
    methods: {
      receiverOn: function (index) {

        for (var i = 0; i < this.receiver.length; i++) {
          this.receiver[i].selected = false;

        }
        this.receiver[index].selected = true;
      },
    }
  }
</script>
<style>
  .mallCheck_address{
    width: 100%;
    background: white;
  }
  .receiverMsg, .orderMsg, .paymentMsg {
    width: 95%;
    margin: 0 auto;
    margin-top: 20px;
    background: #fff;
  }

  .receiverMsg_title {
    font-size: 16px;
    margin-left: 20px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 100%;
    border-bottom: 0.5px solid #DCDCDC;
  }

  .receiverMsg_box li {
    position: relative;
    width: 275px;
    height: 164px;
    float: left;
    margin-right: 10px;
    cursor: pointer;
    box-sizing: border-box;
    margin-top: 10px;
  }
.receiverMsg_li_box{
  border: 1px solid #EFEFEF;
  height: 144px;
  position: relative;
  box-sizing: border-box;
}
  .receiverMsg_li_box:hover{
    border: 2px solid #00a7ea !important;
  }
  .receiverMsg_selected, .payment_antIns_selected {
    border: 2px solid #00a7ea !important;
  }
.receiverMsg_li_bottom{
  position: absolute;
  right: 2px;
  margin-top: 2px;
  color: #00a7ea;
}
  #addMsg {
    text-align: center;
    border: 1px solid #EFEFEF;
    height: 144px;
  }
  #addMsg:hover{
    color: #00a7ea;
    border: 2px solid #00a7ea;
  }

  #addMsg > div {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .receiverMsg_box {
    padding-bottom: 30px;
    margin-left: 20px;
    margin-top: 20px;
  }

  #receiverName {
    float: left;
    font-weight: bold;
    margin: 10px 0 10px 10px
  }

  #receiverTel {
    float: right;
    font-weight: bold;
    margin: 10px 10px 10px 0
  }

  #receiverAddr {
    position: relative;
    top: 15px;
    left: 10px;
    color: #666666;
  }

  .receiverMsg_box_checked::before {
    position: absolute;
    right: 0;
    bottom: 0;
    content: "";
    width: 0;
    height: 0;
    border-top: 30px solid transparent;
    border-right: 30px solid #00a7ea;
    border-bottom: -10px solid transparent;
  }

  .receiverMsg_box_tick::after {
    position: absolute;
    width: 20px;
    height: 20px;
    right: 0;
    bottom: 0;
    background-position: center;
    background-repeat: no-repeat;
    content: "";
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAJBAMAAAAbVLtZAAAAJFBMVEUAAAD6+fn6+fn6+fn6+fn6+fn6+fn6+fn6+fn6+fn6+fn6+fl911MYAAAAC3RSTlMAcmL5TYuwloNhPwGhwdUAAAA1SURBVAjXYwADZQcwxbRbgIELSGtvZGCQDgBzGZy3grkMLNZBIC5QYPdGsGLO3QUQzW0gAgBJ7gno+zgkXwAAAABJRU5ErkJggg==");
  }
</style>
