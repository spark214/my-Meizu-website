<template>
  <div class="coin">
    <div class="coin_header">
      <span>喜元 </span> <span class="hcoin_num">{{coin.toFixed(2)}}</span>
    </div>
    <div class="coin_tips">
      <span :class="{warning:(form.num==100||form.diynum>=100)}">说明：喜元余额仅可购买应用、游戏等Flow.增值服务，不可用于购买手机、配件，支付维修费用或取现</span>
    </div>
    <div class="coin_charge">
      <h3>喜元充值</h3>
      <div class="charge_box">
        <div class="charge_box_num clearfix">
          <span>充值金额</span>
          <a class="charge_num" :class="{on:form.num==20}"
             @click="form.num='20';diy=false;form.diynum='';warning()">20元</a>
          <a class="charge_num" :class="{on:form.num==50}"
             @click="form.num='50';diy=false;form.diynum='';warning()">50元</a>
          <a class="charge_num" :class="{on:form.num==100}" @click="form.num='100';diy=false;form.diynum='';warning()">100元</a>
          <input type="text" class="charge_num" placeholder="金额" v-model="form.diynum"
                 style="text-align: center;font-size:16px" :class="{on:diy==true}" @click="diySelect" @blur="warning">
          <a class="diy_tips">{{content}}</a>
        </div>
        <div class="charge_box_pay clearfix">
          <span>支付方式</span>
          <a class="charge_num" :class="{on:form.pay=='ali'}" @click="form.pay='ali'"><i class="pay_ali"></i></a>
          <a class="charge_num" :class="{on:form.pay=='ten'}" @click="form.pay='ten'"><i class="pay_ten"></i></a>
        </div>
      </div>
      <div class="coin_button">
        <el-button type="primary" size="middum" @click="charge">立即充值</el-button>
      </div>

    </div>
  </div>
</template>
<script>
  import qs from 'qs';
  export default {
    data() {
      return {
        coin: "",
        form: {
          num: 20,
          diynum:"",
          pay: "ali"
        },
        diy: false,
        content: "",
        hcoin:{
          number: 0
        }

      }
    },
    methods: {
      charge() {
        this.filterNum()
        var url = this.$rootUrl + "/api/halo/users/coin";
        var token = sessionStorage.getItem('accessToken');
        const options = {
          method: 'PATCH',
          headers: {'access_token': token,'Content-Type':'application/x-www-form-urlencoded'},
          url: url,
          data:qs.stringify(this.hcoin)
        };
        this.$axios(options).then((res) => {
          if (res.data.data) {
            if (res.data.errorCode == 0) {
              if(res.data.data.msg) {
                this.getData()
              }
            }
          }
        })
      },
      filterNum() {
        if (this.diy) {
          this.hcoin.number = parseInt(this.form.diynum)
        }
        else{
          this.hcoin.number=parseInt(this.form.num)
        }
      },
      diySelect() {
        this.form.num = ''
        this.diy = true
      },
      warning() {
        if (this.diy == true) {
          if (this.form.diynum === "") {
            this.content = "金额不能为空"
            alert(this.content)
          }
          else if (this.form.diynum > 100 || this.form.diynum < 1) {
            this.content = "金额范围为1-100"
          }
          else {
            this.content = ""
          }
        }
        else this.content = ""
      },
      getData() {
        var url = this.$rootUrl + "/api/halo/users/coin";
        var token = sessionStorage.getItem('accessToken');
        const options = {
          method: 'GET',
          headers: {'access_token': token},
          url: url,
          data: {}
        };
        this.$axios(options).then((res) => {
          if (res.data.data) {
            if (res.data.errorCode == 0) {
              this.coin = res.data.data.coin
            }
          }
        })
      }
    },
    created() {
      this.getData()
    }
  }
</script>
<style scoped>
  .coin {
    margin-left: 20px;
    margin-bottom: 80px;
  }

  .coin_header {
    margin-top: 30px;
    color: #515151;
    font-size: 18px;
    font-weight: 400
  }

  .hcoin_num {
    color: #00a7ea;
  }

  .coin_tips {
    border-top: 0.5px solid #dcdcdc;
    margin-top: 20px;
    padding-top: 20px;
    font-size: 14px;
    color: #666666;
  }

  .coin_charge {
    margin-top: 30px;
  }

  .coin_charge h3 {
    font-weight: 500;
    font-size: 16px;
    color: #00a7ea;
    border-bottom: 0.5px solid #DCDCDC;
    padding-bottom: 20px;
  }

  .charge_box {
    margin-top: 30px;
  }

  .charge_box_num {
    margin-bottom: 30px;
  }

  .charge_box_num span, .charge_box_pay span {
    color: #666666;
    font-size: 14px;
    float: left;
    position: relative;
    top: 15px;
    margin-right: 40px;
  }

  .charge_num {
    width: 121px;
    height: 50px;
    border: 1.5px solid #dcdcdc;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    color: #666666;
    margin-right: 30px;
  }

  .diy_tips {
    position: relative;
    top: 15px;
    color: rgb(244, 74, 7) !important;
  }

  .pay_ali {
    width: 100%;
    height: 100%;
    background: url("https://pay-res.meizu.com/resources/pay/images/img.png") 0px 0px no-repeat;
  }

  .pay_ten {
    width: 100%;
    height: 100%;
    background: url("https://pay-res.meizu.com/resources/pay/images/img.png") -152px 0px no-repeat;
  }

  .coin_button {
    margin-top: 30px;
    margin-left: 97px;
  }

  .el-button {
    width: 121px !important;
    height: 50px;
    border-radius: 0;
    background-color: #00a7ea;
  }

  .on {
    border: 1.5px solid #00a7ea;
  }

  .warning {
    color: rgb(244, 74, 7) !important;
  }
</style>
