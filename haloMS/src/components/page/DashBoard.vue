<template>
  <div class="dashboard clear">
    <!--<div class="calenderCard clear">-->
      <!--<v-calender></v-calender>-->
    <!--</div>-->
    <div>
      <div>

      </div>
    </div>
    <div style="width: 460px;height: 400px;margin-right:10px" v-loading="c1loading">
      <highcharts :options="allocateChart" ></highcharts>
    </div>
    <div style="width: 460px;height: 400px;margin-right:10px" v-loading="c2loading">
      <highcharts :options="yearAndProjectChart"></highcharts>
    </div>
    <div style="width: 460px;height: 400px;" v-loading="c3loading">
      <highcharts :options="forumChart"></highcharts>
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
       c1loading:false,
       c2loading:false,
       c3loading:false,
       allocateChart: {
         chart: {
           type: 'column',
           spacing: [40, 20, 50, 20],
           width:'460'
         },
         title: {
           text: '当前未完成交易的订单'
         },
         xAxis: {
           categories:[
                   '未付款','已付款','未发货','已发货'
           ],
           crosshair: true
         },
         yAxis: {
           min: 0,
           title: {
             text: ''
           },
           allowDecimals: true
         },
         tooltip: {
           // head + 每个 point + footer 拼接成完整的 table
           headerFormat: '<span style="font-size:10px">{point.key}订单</span><table>',
           pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name} </td>' +
           '<td style="padding:0"><b>{point.y}单</b></td></tr>',
           footerFormat: '</table>',
           shared: true,
           useHTML: true
         },
         plotOptions: {
           column: {
             showInLegend: false,
             borderWidth: 0,
           }
         },
         series: [{
           data: []
         }]
       },
       yearAndProjectChart: {
         colors: ["#96BFFF", "#37A1DA", "#67E0E3", " #FFDB5B", "#FF9E7F", "#FB7292"],
         chart: {
           spacing: [0, 0, 0, 0],
           marginRight: 150
         },
         title: {
           floating: true,
           text: '商城各类型商品占比',
           y: 205,
           x: -75,
           useHTML: true
         },
         series: [],
         tooltip: {
           pointFormat: '{series.data.name}{point.percentage:.1f}% '
         },
         plotOptions: {
           pie: {
             allowPointSelect: true,
             showInLegend: true,
             size: 220,
             dataLabels: {
               backgroundColor: '#000000',
               enabled: false,
               format: '<b>{point.name}</b>: {point.percentage:.1f} %',
               style: {
                 color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
               }
             },
             point: {
               events: {
                  mouseOver: function (e) {  // 鼠标滑过时动态更新标题
                    this.series.chart.setTitle({
                      text: e.target.name + ':\t\t' + e.target.y + ' 件',
                    });

                  }
                 ,
                  click: function(e) { // 同样的可以在点击事件里处理
                      chart.setTitle({
                          text: e.point.name+ '\t'+ e.point.y + ' %'
                      });
                  }
               }
             }
           }
         },
         legend: {//控制图例显示位置
           layout: 'vertical',
           align: 'right',
           verticalAlign: 'middle',
           borderWidth: 0,
           floating: true,
           itemMarginTop: 10,
           labelFormat: '{name} : {y}件',
           itemStyle: {"fontWeight": "500"},

         },
       },
       forumChart: {
         colors: ["#96BFFF", "#37A1DA", "#67E0E3", " #FFDB5B", "#FF9E7F", "#FB7292"],
         chart: {
           spacing: [0, 20, 0, 0],
           marginRight: 150
         },
         title: {
           floating: true,
           text: '论坛各版块话题占比',
           y: 205,
           x: -65,
           useHTML: true
         },
         series: [],
         tooltip: {
           pointFormat: '{series.data.name}{point.percentage:.1f}% '
         },
         plotOptions: {
           pie: {
             allowPointSelect: true,
             showInLegend: true,
             size: 220,
             dataLabels: {
               backgroundColor: '#000000',
               enabled: false,
               format: '<b>{point.name}</b>: {point.percentage:.1f} %',
               style: {
                 color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
               }
             },
             point: {
               events: {
                 mouseOver: function (e) {  // 鼠标滑过时动态更新标题
                   this.series.chart.setTitle({
                     text: e.target.name + ':\t\t' + e.target.y + ' 件',
                   });

                 }
                 ,
                 click: function(e) { // 同样的可以在点击事件里处理
                   chart.setTitle({
                     text: e.point.name+ '\t'+ e.point.y + ' %'
                   });
                 }
               }
             }
           }
         },
         legend: {//控制图例显示位置
           layout: 'vertical',
           align: 'right',
           verticalAlign: 'middle',
           borderWidth: 0,
           floating: true,
           itemMarginTop: 10,
           labelFormat: '{name} : {y}帖',
           itemStyle: {"fontWeight": "500"},

         },
       },
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
        this.c1loading = true;
        var url = this.$rootUrl + "/api/ms/orderChartData";

        const options = {
          method: 'GET',
          url: url,
          data: {}
        };

        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.code == 0) {
            this.c1loading = false;
            this.allocateChart.series = [{name: '', colorByPoint: true, data: item.data}];
          }
        })
      },
      getData2() {
        this.c2loading = true;
        var url = this.$rootUrl + "/api/ms/productChartData";

        const options = {
          method: 'GET',
          url: url,
          data: {}
        };

        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.code == 0) {
            this.c2loading = false;
            this.yearAndProjectChart.series = [{
              type: 'pie',
              innerSize: '80%',
              name: '社区各版块帖子数量',
              data: item.data
            }];
          }
        })
      },
      getData3() {
        this.c3loading = true;
        var url = this.$rootUrl + "/api/ms/forumChartData";

        const options = {
          method: 'GET',
          url: url,
          data: {}
        };

        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.code == 0) {
            this.c3loading = false;
            this.forumChart.series = [{
              type: 'pie',
              innerSize: '80%',
              name: '社区各版块帖子数量',
              data: item.data
            }];
          }
        })
      }
    },
    created() {
      this.getData();
      this.getData2();
      this.getData3();
    }
  }
</script>
<style>
  .dashboard {
    overflow: hidden;
    display: flex;
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

