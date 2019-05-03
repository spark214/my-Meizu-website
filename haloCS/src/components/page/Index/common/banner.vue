<template>
  <div class="banner">
    <div class="carousel clearfix">
      <el-carousel height="560px" trigger="click" arrow="never">
        <el-carousel-item v-for="(item,index) in bannerList" :key="item">
          <div class="banner-content" :style="item.css" @click="banner(item.id)"></div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="sideBar" @mouseleave="evtSideLeave">
      <div class="side-left">
        <ul class="side">
          <li class="side-item" v-for="item in sideItems" @mouseenter="evtSideEnter(item.type)" @click="goList(item.id)">
            {{item.content}}
          </li>
        </ul>
      </div>
      <div class="side-detail" v-show="goodsStatus">
        <ul class="detail-item" v-for="goods in filterCurrGoods">
          <li class="datail-goods" v-for="item in goods">
            <a class="goods-link" @click="goProduct(item.proId)">
              <img v-lazy="item.imgUrl" width="40px">
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
        bannerList: [
          {
            css:{
            backgroundImage: "url(//img.tozlam.cn/mallIndex-mz15-1240x500.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            },
            id:1
          },
          {
            css:{
            backgroundImage: "url(//img.tozlam.cn/mallIndex-pop-1240x500.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          },
          id:69
          },
          {
            css:{
              backgroundImage: "url(//img.tozlam.cn/mallIndex-halo-1240x500.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            },
            id:38
          },
        ],
        ids:[1,69,38],
        currGoods: [],
        goodsStatus: false,
        sideItems: [
          {type: 'phone', content: '手机', id: '1'},
          {type: 'device', content: '智能设备', id: '2'},
          {type: 'wear', content: '智能穿戴', id: '2'},
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
            proId: 8,
            imgUrl: '//openfile.meizu.com/group1/M00/00/2C/Cgbj0VkAUNmAeTU2AAklK6hJr4k492.png',
            name: '魅蓝E2',
          },
          {
            proId: 9,
            imgUrl: '//openfile.meizu.com/group1/M00/03/03/Cgbj0VpfCpuAF571AAwckbZIp2U479_180x180.png',
            name: '魅蓝S6',
          },
          {
            proId: 10,
            imgUrl: '//openfile.meizu.com/group1/M00/03/65/Cgbj0VqyCueAWj7qAAqHKrdRwcQ675_180x180.png',
            name: '魅蓝E3',
          },
        ],
        wear: [
          {
            proId: 11,
            imgUrl: '//openfile.meizu.com/group1/M00/00/13/Cgbj0VjkorqAGxuXAAOqzSlfPuA747_180x180.png',
            name: '魅族手环',
          },
          {
            proId: 13,
            imgUrl: 'https://openfile.meizu.com/group1/M00/01/D8/Cgbj0VmTwdWAMmW6AAMyqBgKIls907.png@240x240.png',
            name: '乐心手环MAMBO',
          },
          {
            proId: 18,
            imgUrl: 'https://openfile.meizu.com/group1/M00/02/F8/Cgbj0VpYoFOAEL9eAADkgaYbjsY383.jpg@240x240.png',
            name: '乐心ziva手环',
          },
        ],
        device:[
          {
            proId: 16,
            imgUrl: "https://openfile.meizu.com/group1/M00/03/19/Cgbj0Fp9VlGACKh3AALPKNlZNz0507.png@240x240.png",
            name: '准儿翻译机',
          },
          {
            proId: 15,
            imgUrl: "https://openfile.meizu.com/group1/M00/01/A0/Cgbj0Vk_eoaAUUaPAAGCK4nlrc0778.png@480x480.png",
            name: '魅族智能体脂秤',
          },
        ],
        game:[
          {
            proId: 20,
            imgUrl: "https://openfile.meizu.com/group1/M00/03/23/Cgbj0Vp8F6CAOo1cAASS5shpuiY984.png@240x240.png",
            name: '新游智能游戏手柄',
          },
          {
            proId: 21,
            imgUrl: "https://openfile.meizu.com/group1/M00/01/45/Cgbj0FjsTFyATCGWAAMJOhEQ_tE521.png@240x240.png",
            name: '飞智wee拉伸手柄',
          },
          {
            proId: 22,
            imgUrl: "https://openfile.meizu.com/group1/M00/02/9F/Cgbj0FoWRfWAJYXgAAfHf7kddpY167.png@240x240.png",
            name: '黑爵驱魔师游戏键盘',
          },
          {
            proId: 23,
            imgUrl: "https://openfile.meizu.com/group1/M00/02/15/Cgbj0Vm6QOuANk92AAO0i0f6FhE893.png@240x240.png",
            name: '黑爵AJ110游戏鼠标',
          },
          {
            proId: 24,
            imgUrl: "https://openfile.meizu.com/group1/M00/04/39/Cgbj0FrkYxuAI_JmAAM9eai-cD4341.png@240x240.jpg",
            name: '雷柏多模式无线鼠标',
          },
          {
            proId: 25,
            imgUrl: "https://openfile.meizu.com/group1/M00/04/38/Cgbj0FrkWw-APH7cAAGltEdNZJM829.jpg@240x240.jpg",
            name: '雷柏MT350蓝牙鼠标',
          },
          {
            proId: 26,
            imgUrl: "https://openfile.meizu.com/group1/M00/02/55/Cgbj0Vnm0JuAASkQAAR2mM4gU0M337.png@240x240.png",
            name: '博思尼AR魔力游戏枪',
          },
        ],
        hear:[
          {
            proId: 27,
            imgUrl: "https://openfile.meizu.com/group1/M00/01/AE/Cgbj0Fl22W2AJpEcAAG7IoqPYcI904.png@240x240.png",
            name: '魅族 Flow ',
          },
          {
            proId: 28,
            imgUrl: "https://storeimg.meizu.com/product/1459849377-64075.png@240x240.png",
            name: '魅族 EP51',
          },
          {
            proId: 28,
            imgUrl: "https://storeimg.meizu.com/product/1449644448-10238.png@240x240.jpg",
            name: '魅族 HD50',
          },
          {
            proId: 38,
            imgUrl: "https://openfile.meizu.com/group1/M00/04/17/Cgbj0VrcX6yABHxPAARZwWUAjc4748.png@240x240.png",
            name: '魅族 HALO激光耳机',
          },
          {
            proId: 69,
            imgUrl: "https://openfile.meizu.com/group1/M00/04/6A/Cgbj0Vr6g3mAOF08AAEjONVGr3c193.jpg240x240.jpg",
            name: '魅族 POP真无线耳机',
          },
        ],
        fitting:[
          {
            proId: 42,
            imgUrl: "https://openfile.meizu.com/group1/M00/02/2B/Cgbj0VnCAWGAVzw9AACRctujWrc893.png@240x240.png",
            name: '魅蓝双向闪充移动电源',
          },
          {
            proId: 43,
            imgUrl: "https://openfile.meizu.com/group1/M00/02/D9/Cgbj0FpDb0WATC-VAAPHRx51FFA407.png@240x240.png",
            name: '魅族小黄人移动电源',
          },
          {
            proId: 52,
            imgUrl: "https://openfile.meizu.com/group1/M00/04/15/Cgbj0VrcXw2AL0tBAApTh_xwKKk709.png@240x240.png",
            name: '魅族无线充电器',
          },
          {
            proId: 53,
            imgUrl: "https://openfile.meizu.com/group1/M00/00/B4/CnQOjVgursmAWs6DAAD98P_hzKk214.jpg@240x240.png",
            name: '魅族双口快充车载充电器',
          },
          {
            proId: 51,
            imgUrl: "https://openfile.meizu.com/group1/M00/04/41/Cgbj0VrkQsWACnb5AAHk0MWkrBA533.jpg@240x240.png",
            name: '魅族Micro USB数据线',
          },
        ],
        storage:[
          {
            proId: 55,
            imgUrl: "https://openfile.meizu.com/group1/M00/00/44/Cix_s1fFBGeATivPAAGai1ECI-U192.png@240x240.png",
            name: 'ORICO智能插线板旅行版',
          },
        ],
        hobby:[
          {
            proId: 56,
            imgUrl: "https://openfile.meizu.com/group1/M00/02/7B/Cgbj0Vn6yW6AUlsRAAWrjB0SvJc768.png@240x240.jpg",
            name: '魅蓝胸包',
          },
          {
            proId: 57,
            imgUrl: "https://openfile.meizu.com/group1/M00/03/58/Cgbj0VqwvNKAEkDfAAOIxGxcqa8118.png@240x240.png",
            name: '魅蓝数码收纳包',
          },
          {
            proId: 58,
            imgUrl: "https://openfile.meizu.com/group1/M00/00/BE/Cix_s1g7l-yANQsqAAJSWz441uE109.jpg@240x240.png",
            name: '魅蓝 休闲旅行双肩包',
          },
          {
            proId: 59,
            imgUrl: "https://openfile.meizu.com/group1/M00/03/49/Cgbj0FqwvJSAEgOEAAlTJ1rcYL0181.png@240x240.jpg",
            name: '魅蓝20寸酷MA萌旅行箱',
          },
          {
            proId: 60,
            imgUrl: "https://openfile.meizu.com/group1/M00/03/57/Cgbj0VqwvH6AfUSiAAWnWUSlznQ837.png@240x240.png",
            name: '魅蓝酷MA萌可变形颈枕',
          },
        ]
      }
    },
    methods: {
      banner(id){
        if (id <= 10) {
          this.$router.push({path: "/mallProductPhone", query: {proId: id}});
        } else{
          this.$router.push({path: "/mallProductOther", query: {proId: id}});
        }
      },
      goProduct(id){
        if (id <= 10)
          this.$router.push({path: "/mallProductPhone", query: {proId: id}})
        else
          this.$router.push({path: "/mallProductOther", query: {proId: id}})
      },
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
        let filterGoods = [[], [], [], [], []];
        if(this.currGoods){
          this.currGoods.forEach(function (item, index) {
            let goodsIndex = Math.floor(index / 6);
            filterGoods[goodsIndex].push(item);
          })
        }
        return filterGoods;
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
    margin-bottom: 40px;
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
    left: 237px;
    top: 0;
    z-index: 10;
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
    color: #666;
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
