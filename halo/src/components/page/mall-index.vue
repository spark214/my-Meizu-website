<template>
  <div class="mall-index">

    <v-header></v-header>

    <div class="pageContain">
      <div class="banner">
        <div class="carousel clearfix">
          <el-carousel height="600px" trigger="click" arrow="never">
            <el-carousel-item v-for="item in banner" :key="item">
              <div class="banner-content" :style="item"></div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="sideBar" @mouseleave="evtSideLeave">
          <div class="side-left">
            <ul class="side">
              <li class="side-item" @mouseenter="evtSideEnter(item.type)" v-for="item in sideItems">
                {{item.content}}
              </li>
            </ul>
          </div>
          <div class="side-detail" v-show="goodsStatus">
            <ul class="detail-item" v-for="goods in filterCurrGoods">
              <li class="datail-goods" v-for="item in goods">
                <a class="goods-link">
                  <img :src="item.imgUrl">
                  <div class="goods-link-name">
                    {{item.name}}
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
  import vHeader from '../common/header/page/header';

  export default {
    data() {
      return {
        banner: [
          {
            backgroundImage: "url(" + require("../../../static/img/mallIndex-halo-1240x500.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",

          },
          {
            backgroundImage: "url(" + require("../../../static/img/mallIndex-mz15-1240x500.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          },
          {
            backgroundImage: "url(" + require("../../../static/img/mallIndex-pop-1240x500.jpg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          },
        ],
        currGoods: [],
        goodsStatus: false,
        sideItems: [
          {type: 'phone', content: '手机'},
          {type: 'device', content: '智能设备'},
          {type: 'wear', content: '智能穿戴'},
          {type: 'game', content: '游戏设备'},
          {type: 'hear', content: '数码影音'},
          {type: 'fitting', content: '手机配件/移动电源'},
          {type: 'storage', content: '移动存储/办公设备'},
          {type: 'hobby', content: '生活周边'}
        ],
        phone: [
          {
            sourceUrl: '//www.mi.com/mi5/',
            buyUrl: '//item.mi.com/buyphone/mi5',
            imgUrl: 'http://c1.mifile.cn/f/i/15/goods/list/mi5bar80.jpg?width=40&height=40',
            name: '小米手机5',
            buyStatus: true
          },
          {
            sourceUrl: '//www.mi.com/mimax/',
            buyUrl: '//item.mi.com/buyphone/mimax',
            imgUrl: 'http://c1.mifile.cn/f/i/15/goods/sidebar/maxbar80.jpg?width=40&height=40',
            name: '小米Max',
            buyStatus: true
          },
          {
            sourceUrl: '//www.mi.com/note3/pro/',
            buyUrl: '//item.mi.com/buyphone/note3',
            imgUrl: 'http://c1.mifile.cn/f/i/15/goods/sidebar/note3.jpg?width=40&height=40',
            name: '小米Note3',
            buyStatus: true
          },
          {
            sourceUrl: '//www.mi.com/hongmi3s/',
            buyUrl: '//item.mi.com/buyphone/hongmi3s',
            imgUrl: 'http://c1.mifile.cn/f/i/g/2015/video/hm3s80x80.jpg?width=40&height=40',
            name: '红米手机3S',
            buyStatus: true
          },
          {
            sourceUrl: '//www.mi.com/redmipro/',
            buyUrl: '//item.mi.com/buyphone/redmipro/',
            imgUrl: 'http://c1.mifile.cn/f/i/15/goods/sidebar/hongmi3.jpg?width=40&height=40',
            name: '红米Pro',
            buyStatus: true
          },
          {
            sourceUrl: '//www.mi.com/hongmi3/',
            buyUrl: '//item.mi.com/buyphone/hongmi3/',
            imgUrl: 'http://c1.mifile.cn/f/i/15/goods/list/mi5bar80.jpg?width=40&height=40',
            name: '红米手机3',
            buyStatus: true
          },
          {
            sourceUrl: '//www.mi.com/hongmi3x/',
            buyUrl: '//item.mi.com/buyphone/hongmi3x',
            imgUrl: 'http://c1.mifile.cn/f/i/g/2015/video/3X80.jpg?width=40&height=40',
            name: '红米手机3X',
            buyStatus: true
          },
          {
            sourceUrl: '//heyue.mi.com/',
            buyUrl: '//item.mi.com/buyphone/mi5',
            imgUrl: 'http://c1.mifile.cn/f/i/15/goods/sidebar/heyue.jpg?width=40&height=40',
            name: '合约机',
            buyStatus: false
          },
          {
            sourceUrl: '//www.mi.com/compare/',
            buyUrl: '//item.mi.com/buyphone/mi5',
            imgUrl: 'http://c1.mifile.cn/f/i/15/goods/sidebar/compare.jpg?width=40&height=40',
            name: '对比手机',
            buyStatus: false
          },
          {
            sourceUrl: '//www.mi.com/mimobile/',
            buyUrl: '//item.mi.com/buyphone/mi5',
            imgUrl: 'http://c1.mifile.cn/f/i/15/goods/sidebar/mimobile.jpg?width=40&height=40',
            name: '小米移动 电话卡',
            buyStatus: false
          }
        ],

      }
    },
    components: {
      vHeader
    },
    methods: {
      evtSideEnter(currType) {
        this.currGoods = this[currType]
        this.goodsStatus = true
      },
      evtSideLeave() {
        this.goodsStatus = false
      }
    },
    computed: {
      filterCurrGoods: function () {
        let filterGoods = [[], [], [], [], []]
        this.currGoods.forEach(function (item, index) {
          let goodsIndex = Math.floor(index / 6)
          filterGoods[goodsIndex].push(item)
        })
        return filterGoods
      },
      totalPrices: function () {
        this.totalPrice = 0;
        for (var i = 0; i < this.product.length; i++) {
          if (this.product[i].checked != false)
            this.totalPrice += this.product[i].sum;
        }
        return this.totalPrice;
      }
    },
  }
</script>
<style scoped>
  .pageContain{
    top:0px;
  }

  .carousel {
    position: relative;
    margin-top: 0px;
  }

  .banner {
    position: relative;
  }

  .sideBar {
    width: 235px;
    height: auto;
    background: rgba(255, 255, 255, .6);
    position: absolute;
    left: 40px;
    top: 90px;
    z-index: 10;
    color: #515151;
  }

  .side {
    width: 235px;
    height: 480px;
    padding-top: 20px;
    margin-left: 30px;
  }

  .side-item {
    width: 80%;
    height: 62.5px;
    cursor: pointer;
  }
  .side-item:hover{
   color: #409EFF;
  }

  .side-detail {
    position: absolute;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    left: 235px;
    top: 0;
    z-index: 100;
    border: 1px solid #e0e0e0;
  }

  .detail-item {
    width: auto;
    height: 500px;
    background: #ffffff;
  }

  .datail-goods {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 180px;
    height: 80px;
    padding: 0 20px 0 20px;
    box-sizing: border-box;
    background: #fff;
    cursor: pointer;
    color: black;
  }

  .goods-link {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 170px;
  }

  .goods-link-name {
    padding-left: 10px;
    font-size: 14px;
  }
</style>
