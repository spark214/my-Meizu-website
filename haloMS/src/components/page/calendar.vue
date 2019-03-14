<template>
  <div id="calender">
    <!-- 年份 月份 -->
    <div class="month">
      <ul>
        <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
        <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮&nbsp;</li>
        <li class="year-month">
          <p class="choose-month">{{ currentMonth }}月</p>
          <p class="choose-year">{{ currentYear }}</p>
        </li>
        <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
      </ul>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li style="color:red">六</li>
      <li style="color:red">日</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
      <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
      <li v-for="dayobject in days">
        <!--本月-->
        <!--如果不是本月  改变类名加灰色-->

        <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>

        <!--如果是本月  还需要判断是不是这一天-->
        <span v-else>
                        <!--今天  同年同月同日-->
                        <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()"
                              class="active">{{ dayobject.day.getDate() }}</span>
                        <span v-else>{{ dayobject.day.getDate() }}</span>
                    </span>

      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
      }
    },
    created() {
      let that = this;
      that.initData(null);
    },
    methods: {
      initData: function (cur) {
        let that = this;
        let leftcount = 0; //存放剩余数量
        let date;
        if (cur) {
          date = new Date(cur);
        } else {
          let now = new Date();
          let d = new Date(that.formatDate(now.getFullYear(), now.getMonth()+1, 1));
           d.setDate(35);
          date = new Date(that.formatDate(d.getFullYear(), d.getMonth(), 1));
        }
        that.currentDay = date.getDate();
        that.currentYear = date.getFullYear();
        that.currentMonth = date.getMonth() + 1;
        that.currentWeek = date.getDay(); // 1...6,0
        if (that.currentWeek == 0) {
          that.currentWeek = 7;
        }
        let str = that.formatDate(that.currentYear, that.currentMonth, that.currentDay);
        that.days.length = 0;
        // 今天是周日，放在第一行第7个位置，前面6个
        //初始化本周
        for (let i = that.currentWeek - 1; i >= 0; i--) {
          let d = new Date(str);
          d.setDate(d.getDate() - i);
          let dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
          dayobject.day = d;
          that.days.push(dayobject); //将日期放入data 中的days数组 供页面渲染使用
        }
        //其他周
        for (let i = 1; i <= 35 - that.currentWeek; i++) {
          let d = new Date(str);
          d.setDate(d.getDate() + i);
          let dayobject = {};
          dayobject.day = d;
          that.days.push(dayobject);
        }
      },
      pickPre: function (year, month) {
        let that = this;
        // setDate(0); 上月最后一天
        // setDate(-1); 上月倒数第二天
        // setDate(dx) 参数dx为 上月最后一天的前后dx天
        let d = new Date(that.formatDate(year, month, 1));
        d.setDate(0);
        that.initData(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      },
      pickNext: function (year, month) {
        let that = this;
        let d = new Date(that.formatDate(year, month, 1));
        d.setDate(35);
        that.initData(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      },

      // 返回 类似 2016-01-02 格式的字符串
      formatDate: function (year, month, day) {
        let y = year;
        let m = month;
        if (m < 10) m = "0" + m;
        let d = day;
        if (d < 10) d = "0" + d;
        return y + "-" + m + "-" + d
      },
    }

  }
</script>
<style>
  #calender{
    width:31%;
    box-sizing: border-box;
    border: 0.5px solid #A4A7B0;
    height: 335px;
    background-color: rgb(50,65,87);
    border-radius: 4px;
    float: right;
  }
  .month {
    width: 92%;
    height: 48px;
    /*border: 2px solid #FFFFFF;*/
    display: flex;
    justify-content: center;
    margin: auto ;
    margin-top: 15px;

  }

  .month ul {
    display: flex;
    margin-top: 11px;
    justify-content: space-between;
  }

  .year-month {
    padding-left: 10px;
  }

  .choose-year {
    padding: 0 20px;
    font-size: 12px;
    font-weight: 200;
  }

  .choose-month {
    text-align: center;
    font-size: 20px;
    font-weight: 200;
  }

  .arrow {
    width: 3%;
    height: 25px;
    cursor: pointer;
  }
  .month ul li {
    color: #909399;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
    list-style: none;
  }

  .weekdays {
    margin: auto;
    color: #FFFFFF;
    background: #909399;
    width: 100%;
    margin-top: 20px;
    height: 34px;
    line-height: 34px;
    display: flex;
    justify-content: space-around;
  }

  .weekdays li {
    display: inline-block;
    text-align: center;
    color: #e9eaec;
    font-size: 14px;
    font-weight: 100;
  }

  .days {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    text-align: center;
    padding-bottom: 3px;
    padding-top: 7px;
    color: #409EFF;;
    font-weight: 200;
  }

  .days li span span {
    height: 29px;
    width: 27px;
    line-height: 29px;
    display: inline-block;
  }

  .days li .other-month {
    color: #909399;
    height: 29px;
    width: 27px;
    line-height: 29px;
  }
</style>
