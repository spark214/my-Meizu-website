<template>
  <div class="mallList">
    <v-header></v-header>
    <div class="pageContain mallList_container" @mouseenter="test">
      <v-selector :types="types" :brands="brands"></v-selector>
      <v-grid :item="phoneItem"></v-grid>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import vHeader from '../common/header/page/header';
  import vGrid from '../common/malllist/grid';
  import vFooter from '../common/footer';
  import vSelector from '../common/malllist/selector';

  export default {
    data() {
      return {
        phoneItem: [
          {
            name: "魅族15",
            title: "2000万暗光双摄 智能美颜",
            price: "2499",
            img: ["https://openfile.meizu.com/group1/M00/04/0B/Cgbj0FrcblSAGHrPAAvT_qZZSA0427.png@480x480.png",
              "https://openfile.meizu.com/group1/M00/04/1A/Cgbj0VrcbmKALZ1BAA0NVqTeXpU942.png@240x240.jpg",
              "https://openfile.meizu.com/group1/M00/04/0C/Cgbj0FrcbnGANGRlAAzqchlSKjQ833.png@240x240.jpg",
              "https://openfile.meizu.com/group1/M00/04/0B/Cgbj0FrcbkeAW38NAAjvsXhhyFE066.png@240x240.jpg"
            ],
            selectPic: 0
          },
          {
            name: "魅族15",
            title: "2000万暗光双摄 智能美颜",
            price: "2499",
            img: ["https://openfile.meizu.com/group1/M00/04/0B/Cgbj0FrcblSAGHrPAAvT_qZZSA0427.png@480x480.png",
              "https://openfile.meizu.com/group1/M00/04/1A/Cgbj0VrcbmKALZ1BAA0NVqTeXpU942.png@240x240.jpg",
              "https://openfile.meizu.com/group1/M00/04/0C/Cgbj0FrcbnGANGRlAAzqchlSKjQ833.png@240x240.jpg",
              "https://openfile.meizu.com/group1/M00/04/0B/Cgbj0FrcbkeAW38NAAjvsXhhyFE066.png@240x240.jpg"
            ],
            selectPic: 0
          },
          {
            name: "魅族15",
            title: "2000万暗光双摄 智能美颜",
            price: "2499",
            img: ["https://openfile.meizu.com/group1/M00/04/0B/Cgbj0FrcblSAGHrPAAvT_qZZSA0427.png@480x480.png",
              "https://openfile.meizu.com/group1/M00/04/1A/Cgbj0VrcbmKALZ1BAA0NVqTeXpU942.png@240x240.jpg",
              "https://openfile.meizu.com/group1/M00/04/0C/Cgbj0FrcbnGANGRlAAzqchlSKjQ833.png@240x240.jpg",
              "https://openfile.meizu.com/group1/M00/04/0B/Cgbj0FrcbkeAW38NAAjvsXhhyFE066.png@240x240.jpg"
            ],
            selectPic: 0
          },
          {
            name: "魅族15",
            title: "2000万暗光双摄 智能美颜",
            price: "2499",
            img: ["https://openfile.meizu.com/group1/M00/04/0B/Cgbj0FrcblSAGHrPAAvT_qZZSA0427.png@480x480.png",
              "https://openfile.meizu.com/group1/M00/04/1A/Cgbj0VrcbmKALZ1BAA0NVqTeXpU942.png@240x240.jpg",
              "https://openfile.meizu.com/group1/M00/04/0C/Cgbj0FrcbnGANGRlAAzqchlSKjQ833.png@240x240.jpg",
              "https://openfile.meizu.com/group1/M00/04/0B/Cgbj0FrcbkeAW38NAAjvsXhhyFE066.png@240x240.jpg"
            ],
            selectPic: 0
          },
          {
            name: "魅族15",
            title: "2000万暗光双摄 智能美颜",
            price: "2499",
            img: ["https://openfile.meizu.com/group1/M00/04/0B/Cgbj0FrcblSAGHrPAAvT_qZZSA0427.png@480x480.png",
              "https://openfile.meizu.com/group1/M00/04/1A/Cgbj0VrcbmKALZ1BAA0NVqTeXpU942.png@240x240.jpg",
              "https://openfile.meizu.com/group1/M00/04/0C/Cgbj0FrcbnGANGRlAAzqchlSKjQ833.png@240x240.jpg",
              "https://openfile.meizu.com/group1/M00/04/0B/Cgbj0FrcbkeAW38NAAjvsXhhyFE066.png@240x240.jpg"
            ],
            selectPic: 0
          },
        ],
        types: ["手机","智能硬件"],
        brands: ["全部", "魅族", "魅蓝"]
      }

    },
    components: {
      vHeader, vGrid, vFooter, vSelector
    },
    methods:{
      test(){
        console.log(typeof this.types);
      }
    }
  }
</script>
<style scoped>
  .header {
    background-color: white;
  }

  .mallList {
    background-color: #f8f8f8;
  }

  .mallList_container {
    margin-bottom: 100px;
  }
</style>
