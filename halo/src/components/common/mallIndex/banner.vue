<template>
  <div class="banner">
    <div class="carousel clearfix">
      <el-carousel height="560px" trigger="click" arrow="never">
        <el-carousel-item v-for="item in banner" :key="item">
          <div class="banner-content" :style="item"></div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="sideBar" @mouseleave="evtSideLeave">
      <div class="side-left">
        <ul class="side">
          <li class="side-item" @mouseenter="evtSideEnter(item.type)" v-for="item in sideItems"
              @click="goList(item.id)">
            {{item.content}}
          </li>
        </ul>
      </div>
      <div class="side-detail" v-show="goodsStatus" @mouseenter="evtSideEnter(item.type)">
        <ul class="detail-item" v-for="goods in filterCurrGoods">
          <li class="datail-goods" v-for="item in goods">
            <a class="goods-link">
              <img :src="item.imgUrl" width="40px">
              <div class="goods-link-name">
                {{item.name}}
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        banner: [
          {
            backgroundImage: "url(//p9f6ljki4.bkt.clouddn.com/mallIndex-halo-1240x500.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",

          },
          {
            backgroundImage: "url(//p9f6ljki4.bkt.clouddn.com/mallIndex-mz15-1240x500.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          },
          {
            backgroundImage: "url(//p9f6ljki4.bkt.clouddn.com/mallIndex-pop-1240x500.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          },
        ],
        currGoods: [],
        goodsStatus: false,
        sideItems: [
          {type: 'phone', content: '手机', id: '1'},
          {type: 'device', content: '智能设备', id: '2'},
          {type: 'wear', content: '智能穿戴', id: '3'},
          {type: 'game', content: '游戏设备', id: '4'},
          {type: 'hear', content: '数码影音', id: '5'},
          {type: 'fitting', content: '手机配件/移动电源', id: '6'},
          {type: 'storage', content: '移动存储/办公设备', id: '7'},
          {type: 'hobby', content: '生活周边', id: '8'}
        ],
        phone: [
          {
            proId: 1,
            imgUrl: '//openfile.meizu.com/group1/M00/04/1F/Cgbj0VrciICAchSAAAvT_qZZSA0067_180x180.png',
            name: '魅族15',
          },
          {
            proId: 2,
            imgUrl: '//openfile.meizu.com/group1/M00/04/10/Cgbj0FrciDGAFKL5AAxI8Fi80MA698_180x180.png',
            name: '魅族15 Plus',
          },
          {
            proId: 3,
            imgUrl: '//openfile.meizu.com/group1/M00/04/19/Cgbj0VrcbhmAHzm7AAMI5v4clPg365.png',
            name: '魅族M15',
          },
          {
            proId: 6,
            imgUrl: '//openfile.meizu.com/group1/M00/01/B8/Cgbj0Fl4NtOAU4aRAAvVzqN22Ug687.png',
            name: '魅族PRO 7',
          },
          {
            proId: 7,
            imgUrl: '//openfile.meizu.com/group1/M00/01/C9/Cgbj0Vl4OdOAGsDfAAuYs_pyDV0706.png',
            name: '魅族PRO 7 Plus',
          },
          {
            proId: 5,
            imgUrl: '//openfile.meizu.com/group1/M00/01/DC/Cgbj0FmdIJmAeVGmAAxAuuJkLGk921.png@480x480.jpg',
            name: '魅蓝Note6',
          },
          {
            proId: 4,
            imgUrl: '//openfile.meizu.com/group1/M00/02/2F/Cgbj0VnCGzWAWqh8AAwk2MA0gtk390.png',
            name: '魅蓝6',
          },
          {
            proId: 1,
            imgUrl: '//openfile.meizu.com/group1/M00/00/2C/Cgbj0VkAUNmAeTU2AAklK6hJr4k492.png',
            name: '魅蓝Note6',
          },
          {
            proId: 1,
            imgUrl: '//openfile.meizu.com/group1/M00/03/03/Cgbj0VpfCpuAF571AAwckbZIp2U479_180x180.png',
            name: '魅蓝Note6',
          },
          {
            proId: 10,
            imgUrl: '//openfile.meizu.com/group1/M00/03/65/Cgbj0VqyCueAWj7qAAqHKrdRwcQ675_180x180.png',
            name: '魅蓝E3',
          },
        ],
        wear: [
          {
            proId: 10,
            imgUrl: '//openfile.meizu.com/group1/M00/00/13/Cgbj0VjkorqAGxuXAAOqzSlfPuA747_180x180.png',
            name: '魅族手环',
          }
        ]

      }
    },
    methods: {
      evtSideEnter(currType) {
        this.currGoods = this[currType]
        this.goodsStatus = true
      },
      evtSideLeave() {
        this.goodsStatus = false
      },
      goRouter(that) {
        this.$router.push({path: "/" + that});
      },
      goList(id) {
        this.$router.push({path: "/mallList", query: {cateId: id}})
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
      }
    }
  }
</script>
<style>
  .carousel {
    position: relative;
    margin-top: 0px;
  }

  .banner {
    position: relative;
    top: 30px

  }

  .banner-content {
    position: relative;
    top: 10%;
    left: -31%;
    width: 2005px;
    height: 500px;
  }

  .sideBar {
    width: 240px;
    height: auto;
    background: rgba(255, 255, 255, .6);
    position: absolute;
    left: 40px;
    top: 56px;
    z-index: 1000;
    color: #515151;
  }

  .side {
    width: 235px;
    height: 480px;
    padding-top: 20px;
    margin-left: 30px;
  }

  .side-item {
    width: 100%;
    height: 62.5px;
    cursor: pointer;
  }

  .side-item:hover {
    color: #409EFF;
  }

  .side-detail {
    position: absolute;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    left: 235px;
    top: 0;
    z-index: 1000;
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
