<template>
  <div class="dashboard clear">
    <div class="calenderCard clear">
      <v-calender></v-calender>
    </div>
    <div class="statusCard clear">
      <el-row :gutter="10" class="clear">
        <el-col :span="6">
          <el-card shadow="hover">
            <i class="el-icon-sold-out" @click="goRouter('ordermanage')"></i>
            <div class="card-info" @click="goRouter('ordermanage')">
              <p>{{msg.totalOrder}}</p>
              <p>总订单数</p>
            </div>

          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" :class="alertCard(this.pendingOrder)?'cardInfo-danger':'el-card'">
            <i class="el-icon-bell" @click="goRouter('ordermanage')"></i>
            <div class="card-info" @click="goRouter('ordermanage')">
              <p>{{msg.noHandledOrder}}</p>
              <p>待处理订单</p>
            </div>

          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" :class="alertCard(this.unstockedGoods)?'cardInfo-warning':'el-card'">
            <i class="el-icon-circle-close-outline" @click="goRouter('goodsmanage')"></i>
            <div class="card-info" @click="goRouter('goodsmanage')">
              <p>{{msg.zeroStock}}</p>
              <p>无库存商品</p>
            </div>

          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" :class="alertCard(this.dealTotalMoney)?'cardInfo-success':'el-card'">
            <i class="el-icon-tickets" @click="goRouter('ordermanage')"></i>
            <div class="card-info" @click="goRouter('ordermanage')">
              <p>{{msg.totalTurnover}}</p>
              <p>成交总额</p>
            </div>

          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="schartCard clear">
      <v-schart ></v-schart>
      <v-schart2></v-schart2>
    </div>

  </div>
</template>
<script>
  import vCalender from './calendar.vue';
  import vSchart from './schart';
  import vSchart2 from './schart2';

  export default {
   data(){
     return{
     msg:{}
     }
   },
    components: {
      vCalender, vSchart2, vSchart
    },
    methods: {
      alertCard(that) {
        if (that > 0) {
          return true;
        }
        return false;
      },
      goRouter(that) {
        this.$router.push({path: "/" + that});
      },
      getData() {
        var url = this.$rootUrl + "/api/ms/firstPage";

        const options = {
          method: 'GET',
          url: url,
          data: {}
        };

        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.errorCode == 0) {
            this.msg = item.data.info;
            if(item.data.info.totalTurnover == null){
              this.msg.totalTurnover = 0;
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
<style>
  .dashboard {
    overflow: hidden;
  }

  .clear::after {
    content: "";
    height: 0;
    clear: both;
  }

  .schartCard {
    float: left;
    margin-top: 10px;
    width: 68%;
    height: 20%;
    background-color: #A4A7B0;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
  }

  .statusCard {
    float: left;
    width: 68%;
  }

  .el-card {
    overflow: hidden;
    cursor: pointer;
  }

  .el-card i {
    font-size: 32px;
    padding-top: 5px;
    float: left;
  }

  .el-card {
    background-color: #409EFF;
    color: #fff;
  }

  .cardInfo-warning {
    background-color: #E6A23C;
    color: #fff;
  }

  .cardInfo-danger {
    background-color: #F56C6C;
    color: #fff;
  }

  .cardInfo-success {
    background-color: #67C23A;
    color: #fff;
  }

  #F56C6C
  .el-card .card-info {
    float: left;
    margin-bottom: 20px;
    padding-left: 10%;
  }

  .card-info p:nth-child(1) {
    font-size: 24px;
  }

  .card-info p:nth-child(2) {
    font-size: 12px;
  }

</style>

