<template>
  <div class="mall-index">

    <v-header></v-header>

    <div class="pageContain">
      <v-banner></v-banner>

      <v-section :img="phoneSec" title="手机"></v-section>
      <v-list :item="phoneItem"></v-list>

      <v-section :img="otherSec" title="其他配件"></v-section>
      <v-list :item="otherItem"></v-list>
    </div>
    <v-footer></v-footer>

  </div>
</template>
<script>
  import vHeader from '../../common/header/page/header';
  import vFooter from '../../common/footer';
  import vBanner from './common/banner';
  import vMsc from './common/msc';
  import vSection from './common/sectionBox';
  import vList from './common/listItem';

  export default {
    data() {
      return {
        otherSec:[],
        phoneSec: [
          {img:"https://openfile.meizu.com/group1/M00/04/53/Cgbj0VrpkHGAIGQzAAV9apF0koQ059.jpg",id:1},
          {img:"https://openfile.meizu.com/group1/M00/04/55/Cgbj0Fr1Y-uANR-fAAB7hax7hTc240.jpg",id:5},
          {img:"https://openfile.meizu.com/group1/M00/04/55/Cgbj0Fr1YnmAPrmZAAA6kyiTWDI482.jpg",id:4},
          {img:"https://openfile.meizu.com/group1/M00/04/81/Cgbj0VsD83iAba0yAABV-bRyDiU053.jpg",id:9}],
        phoneItem: [
          {
            name: "魅族15",
            title: "2000万暗光双摄 智能美颜",
            price: "2499",
            img: "https://openfile.meizu.com/group1/M00/04/0B/Cgbj0FrcblSAGHrPAAvT_qZZSA0427.png@480x480.png",
            id:1
          },
          {
            name: "魅族15 Plus",
            title: "定制全面屏 人机交互新体验",
            price: "2999",
            img: "https://openfile.meizu.com/group1/M00/04/1C/Cgbj0VrcbrCANJBMAAxI8Fi80MA520.png@480x480.png",
            id:2
          },
          {
            name: "魅族 M15",
            title: "支持人脸识别 抬腕即解锁",
            price: "1699",
            img: "https://openfile.meizu.com/group1/M00/04/19/Cgbj0VrcbhmAHzm7AAMI5v4clPg365.png@480x480.png",
            id:3
          },
          {
            name: "魅族PRO 7",
            title: "限时领券最高减500元",
            price: "1999",
            img: "https://openfile.meizu.com/group1/M00/01/C7/Cgbj0Vl4OYOAGRToAAJwA8hDe5Y164.png@480x480.png",
            id:6
          },
          {
            id: 7,
            img: '//openfile.meizu.com/group1/M00/01/C9/Cgbj0Vl4OdOAGsDfAAuYs_pyDV0706.png',
            name: '魅族PRO 7 Plus',
            title:'限时领券最高减600元',
            price:'3199'
          },
          {
            id: 10,
            img: '//openfile.meizu.com/group1/M00/03/65/Cgbj0VqyCueAWj7qAAqHKrdRwcQ675_180x180.png',
            name: '魅蓝E3',
            title:'限量现货开售',
            price:'1898'
          },
          {
            id: 9,
            img: '//openfile.meizu.com/group1/M00/03/03/Cgbj0VpfCpuAF571AAwckbZIp2U479_180x180.png',
            name: '魅蓝S6',
            title:'限量领券，领券立减50元，限时3期免息',
            price:'999'
          },
          {
            id: 5,
            img: '//openfile.meizu.com/group1/M00/01/DC/Cgbj0FmdIJmAeVGmAAxAuuJkLGk921.png@480x480.jpg',
            name: '魅蓝Note6',
            title:'限时领券最高减150元 享3期免息',
            price:'799'
          },

        ],
        otherItem:[
          {
            id: 27,
            img: "https://openfile.meizu.com/group1/M00/01/AE/Cgbj0Fl22W2AJpEcAAG7IoqPYcI904.png@240x240.png",
            name: '魅族 Flow ',
            title:'用得惬意 听得尽兴',
            price:'599'
          },
          {
            id: 38,
            img: "https://openfile.meizu.com/group1/M00/04/17/Cgbj0VrcX6yABHxPAARZwWUAjc4748.png@240x240.png",
            name: '魅族 HALO激光耳机',
            title:'流光相随 状若霓虹',
            price:'999'
          },
          {
            id: 69,
            img: "https://openfile.meizu.com/group1/M00/04/6A/Cgbj0Vr6g3mAOF08AAEjONVGr3c193.jpg240x240.jpg",
            name: '魅族 POP真无线耳机',
            title:'双无线 零设限',
            price:'499'
          },
          {
            id: 11,
            img: '//openfile.meizu.com/group1/M00/00/13/Cgbj0VjkorqAGxuXAAOqzSlfPuA747_180x180.png',
            name: '魅族手环',
            title:'腕间流动的心率专家',
            price:'169'
          },
          {
            id: 43,
            img: "https://openfile.meizu.com/group1/M00/02/D9/Cgbj0FpDb0WATC-VAAPHRx51FFA407.png@240x240.png",
            name: '魅族小黄人移动电源',
            title:'萌宝闪充 生动可爱',
            price:'169'
          },
          {
            id: 52,
            img: "https://openfile.meizu.com/group1/M00/04/15/Cgbj0VrcXw2AL0tBAApTh_xwKKk709.png@240x240.png",
            name: '魅族无线充电器',
            title:'10W快速充电 72h内发货',
            price:'99'
          },
          {
            id: 53,
            img: "https://openfile.meizu.com/group1/M00/00/B4/CnQOjVgursmAWs6DAAD98P_hzKk214.jpg@240x240.png",
            name: '魅族双口快充车载充电器',
            title:'高速充电 省时省心',
            price:'79'
          },
          {
            id: 15,
            img: "https://openfile.meizu.com/group1/M00/01/A0/Cgbj0Vk_eoaAUUaPAAGCK4nlrc0778.png@480x480.png",
            name: '魅族智能体脂秤',
            title:'精准测量 伴您塑身',
            price:'99'
          },
        ]
      }
    },
    components: {
      vHeader, vFooter, vBanner, vMsc, vSection, vList
    },
    methods: {},
    computed: {},
    created(){
      window.scroll(0, 0);
    }
  }
</script>
<style scoped>
  .pageContain {
    top: 0px;
  }

  .banner {
    position: relative;
  }


</style>
