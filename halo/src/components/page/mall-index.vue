<template>
  <div class="mall-index">

    <v-header></v-header>

    <div class="pageContain">
      <v-banner></v-banner>
      <v-msc></v-msc>

      <v-section :img="phoneSec" title="手机"></v-section>
      <v-list :item="phoneItem"></v-list>

      <v-section :img="phoneSec" title="智能配件"></v-section>
      <v-list :item="phoneItem"></v-list>
    </div>
    <v-footer></v-footer>

  </div>
</template>
<script>
  import vHeader from '../common/header/page/header';
  import vFooter from '../common/footer';
  import vBanner from '../common/mallIndex/banner';
  import vMsc from '../common/mallIndex/msc';
  import vSection from '../common/mallIndex/sectionBox';
  import vList from '../common/mallIndex/listItem';

  export default {
    data() {
      return {
        phoneSec: ["https://openfile.meizu.com/group1/M00/04/53/Cgbj0VrpkHGAIGQzAAV9apF0koQ059.jpg",
          "https://openfile.meizu.com/group1/M00/04/55/Cgbj0Fr1Y-uANR-fAAB7hax7hTc240.jpg",
          "https://openfile.meizu.com/group1/M00/04/55/Cgbj0Fr1YnmAPrmZAAA6kyiTWDI482.jpg",
          "https://openfile.meizu.com/group1/M00/04/81/Cgbj0VsD83iAba0yAABV-bRyDiU053.jpg"],
        phoneItem: [
          {
            name: "魅族15",
            title: "2000万暗光双摄 智能美颜",
            price: "2499",
            img: "https://openfile.meizu.com/group1/M00/04/0B/Cgbj0FrcblSAGHrPAAvT_qZZSA0427.png@480x480.png"
          },
          {
            name: "魅族15 Plus",
            title: "定制全面屏 人机交互新体验",
            price: "2999",
            img: "https://openfile.meizu.com/group1/M00/04/1C/Cgbj0VrcbrCANJBMAAxI8Fi80MA520.png@480x480.png"
          },
          {
            name: "魅族 M15",
            title: "支持人脸识别 抬腕即解锁",
            price: "1699",
            img: "https://openfile.meizu.com/group1/M00/04/19/Cgbj0VrcbhmAHzm7AAMI5v4clPg365.png@480x480.png"
          },
          {
            name: "魅族PRO 7",
            title: "2000万暗光双摄 智能美颜",
            price: "2499",
            img: "https://openfile.meizu.com/group1/M00/01/C7/Cgbj0Vl4OYOAGRToAAJwA8hDe5Y164.png@480x480.png"
          },
          {
            name: "魅族15",
            title: "2000万暗光双摄 智能美颜",
            price: "2499",
            img: "https://openfile.meizu.com/group1/M00/01/DC/Cgbj0FmdIJmAeVGmAAxAuuJkLGk921.png@480x480.jpg"
          },
          {
            name: "魅族15",
            title: "2000万暗光双摄 智能美颜",
            price: "2499",
            img: "https://openfile.meizu.com/group1/M00/02/30/Cgbj0VnCGzuARl88AAnFI7AK-Xs392.png@480x480.png"
          },
          {
            name: "魅族15",
            title: "2000万暗光双摄 智能美颜",
            price: "2499",
            img: "https://openfile.meizu.com/group1/M00/03/BB/Cgbj0Vq9-m2AJr_PAAp1B7CA5GY057.png@480x480.png"
          },
          {
            name: "魅族15",
            title: "2000万暗光双摄 智能美颜",
            price: "2499",
            img: "https://openfile.meizu.com/group1/M00/01/59/Cgbj0FkAUNWADAgGAAZo5v0_vu8708.png@680x680.png"
          },

        ]
      }
    },
    components: {
      vHeader, vFooter, vBanner, vMsc, vSection, vList
    },
    methods: {},
    computed: {}
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
