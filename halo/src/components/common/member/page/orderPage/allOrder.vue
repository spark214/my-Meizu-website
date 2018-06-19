<template>
  <div>
    <v-order v-if="order.length>0"  :datas="order"></v-order>
    <v-unfound v-if="order.length==0"></v-unfound>
  </div>
</template>
<script>
  import vOrder from '../../common/orderTable';
  import vUnfound from '../../common/unfound';
  export default {
    data() {
      return {
        order: [
          {
            orderTime: "2018-06-17 21:42:34",
            orderId: "51061734422120088081",
            msg: [{
              name: "魅族PRO 6s",
              version: "全网通公开版 星空黑 64GB",
              img: "https://openfile.meizu.com/group1/M00/00/C8/Cix_s1hGFveAE3RcAAOqzSlfPuA022.png@240x240.jpg",
              num: 1,
            },
              {
                name: "魅族PRO 6s",
                version: "全网通公开版 星空黑 64GB",
                img: "https://openfile.meizu.com/group1/M00/00/C8/Cix_s1hGFveAE3RcAAOqzSlfPuA022.png@240x240.jpg",
                num: 1,
              }],
            price: 2299,
            status: 0
          },
          {
            orderTime: "2018-03-17 21:56:34",
            orderId: "50061734422120088081",
            msg: [{
              name: "魅族PRO 6s",
              version: "全网通公开版 星空黑 64GB",
              img: "https://openfile.meizu.com/group1/M00/00/C8/Cix_s1hGFveAE3RcAAOqzSlfPuA022.png@240x240.jpg",

              num: 1,
            }],
            price: 2299,
            status: 3
          },
        ],
      }
    },
    components: {
      vOrder,vUnfound
    }
  }
</script>
<style>

</style>
