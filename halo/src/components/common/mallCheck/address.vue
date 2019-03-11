<template>
  <div class="mallCheck_address">
    <h4 class="receiverMsg_title">收货人信息</h4>
    <div class="receiverMsg_box clearfix">
      <ul>
        <li id="hasMsg" v-for="(item,index) in receiver" style="font-size: 12px" class="receiverMsg_box_li clearfix"
            v-show="receiver.length!=0" @click="receiverOn(index)">
          <div class="receiverMsg_li_box" :class="{'receiverMsg_selected':item.selected}">
            <div style="border-bottom: 1px solid #EFEFEF" class="clearfix">
              <span v-text="item.name" id="receiverName"></span>
              <span v-text="item.phone" id="receiverTel" class="clearfix"></span>
            </div>
            <p v-text="item.address" id="receiverAddr"></p>

            <div class="receiverMsg_box_checked" v-show="item.selected">
              <div class="receiverMsg_box_tick"></div>
            </div>
          </div>

          <div class="receiverMsg_li_bottom">
            <a @click="dialogUpdateVisible=true;updateSelected=index">修改</a>
            <a @click="delAddr(index)">删除</a>
          </div>
        </li>
        <li id="addMsg" v-show="receiver.length<10" @click="dialogAddVisible = true">
          <div>
            <div><i class="el-icon-circle-plus-outline"></i></div>
            <p>添加新地址</p>
          </div>

        </li>
      </ul>
    </div>

    <el-dialog title="添加收货地址" class="addAddr"
               :visible.sync="dialogAddVisible"
               :before-close="handleClose">
      <v-write :form="form" :type="3"  :length="receiver.length"></v-write>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改地址" class="addAddr"
               :visible.sync="dialogUpdateVisible"
               :before-close="handleClose">
      <v-write :form="receiver[updateSelected]" :type="4"  :length="receiver.length"></v-write>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import vWrite from '../../page/member/common/addressWrite';
  import bus from '../../common/bus';

  export default {
    data() {
      return {
        receiver: [],
        dialogAddVisible: false,
        dialogUpdateVisible: false,
        form: {},
        updateSelected: -1,

      }
    },
    components: {
      vWrite
    },
    methods: {
      delAddr(index){
        var id=this.receiver[index].id
        var url = this.$rootUrl + "/api/user/delAddress";
        var token = sessionStorage.getItem('accessToken');
        const options = {
          method: 'POST',
          headers: {'token': token},
          url: url,
          data: {
            id:id
          }
        };
        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.data) {
            if (item.errorCode == 0) {
              this.getData()
            }
          }
        })
      },
      receiverOn: function (index) {
        for (var i = 0; i < this.receiver.length; i++) {
          this.receiver[i].selected = false;
        }
        this.receiver[index].selected = true;
        this.form = {
          "name":this.receiver[index].name,
          "phone":this.receiver[index].phone,
          "address":this.receiver[index].address
        }
        sessionStorage.setItem('receiver',JSON.stringify(this.form));
      },
      addressHandleChange(value) {
        console.log(CodeToText[value[0]])
        console.log(CodeToText[value[1]])
        console.log(CodeToText[value[2]])
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      getData() {
        var url = this.$rootUrl + "/api/user/getAddress";
        var token = sessionStorage.getItem('accessToken');
        const options = {
          method: 'GET',
          headers: {'token': token},
          url: url,
          data: {}
        };
        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.data) {
            if (item.errorCode == 0) {
              this.receiver = item.data.address
            }
          }
        })
        this.receiver.forEach((val, index) => {
          val["selected"] = false;
        })
        this.receiver[0].selected = true;
        this.form = {
          "name":this.receiver[0].name,
          "phone":this.receiver[0].phone,
          "address":this.receiver[0].address
        }
        sessionStorage.setItem('receiver',JSON.stringify(this.form));
      }
    },
    created() {
      bus.$on('dialogVisible', msg => {
        this.dialogAddVisible = msg;
        this.dialogUpdateVisible = msg;
        this.getData()
      })
      this.getData()
    }
  }
</script>
<style>
  .mallCheck_address {
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

  .receiverMsg_li_box {
    border: 1px solid #EFEFEF;
    height: 144px;
    position: relative;
    box-sizing: border-box;
  }

  .receiverMsg_li_box:hover {
    border: 2px solid #00a7ea !important;
  }

  .receiverMsg_selected, .payment_antIns_selected {
    border: 2px solid #00a7ea !important;
  }

  .receiverMsg_li_bottom {
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

  #addMsg:hover {
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

  .dialog-footer {
    margin-top: -20px;
  }
</style>
