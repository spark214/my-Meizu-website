<template>
  <div class="dashboard clear">
    <!--<div class="calenderCard clear">-->
      <!--<v-calender></v-calender>-->
    <!--</div>-->
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
    <div style="width: 98%;height: 384px">
      <highcharts :options="allocateChart" ></highcharts>
    </div>

  </div>
</template>
<script>
  import Highcharts from 'highcharts';
  import { genComponent } from 'vue-highcharts';

  export default {
   data(){
     return{
     msg:{},
       allocateChart: {
         chart: {
           type: 'column',
           spacing: [60, 20, 50, 20],
           width:'640'
         },
         title: {
           text: ''
         },
         xAxis: {
           crosshair: true
         },
         yAxis: {
           min: 0,
           title: {
             text: ''
           },
           tickPositions: [0, 20, 40, 60, 80, 100],
           allowDecimals: true
         },
         tooltip: {
           // head + 每个 point + footer 拼接成完整的 table
           headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
           pointFormat: '<tr><td style="color:{series.color};padding:0"> </td>' +
           '<td style="padding:0"><b>{series.y}</b></td></tr>',
           footerFormat: '</table>',
           shared: false,
           useHTML: true
         },
         plotOptions: {
           column: {
             showInLegend: false,
             borderWidth: 0,
             dataLabels: {
               enabled: true,  //显示数量提示
               color: '#000000',
               formatter: function () {
                 var a = this.y / this.total * 100;    //a为当前柱状图y轴值除以总数然后乘以100
                 return a.toFixed(2) + "%" + "<br/>";  //返回百分比和个数
               }
             },

           }
         },
         series: [{
           data: [{color: "#96BFFF", y: 12}, {color: "#67E0E3", y: 32}, {color: "#FFDB5B", y: 24}, {
             color: "#FF9E7F",
             y: 30
           }]
         }]
       }
     }
   },
    components: {
      Highcharts: genComponent('Highcharts', Highcharts),
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

  .statusCard {
    padding: 20px;
    width: 600px;
    height: 100px;
    background-color: #fff;
  }

  .el-card {
    overflow: hidden;
    cursor: pointer;
  }

  .el-card i {
    font-size: 32px;
    padding-top: 5px;
    float: left;
    margin-right: 5px;
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

