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
        order: [],
      }
    },
    methods:{
      getData(){
        var token = sessionStorage.getItem('accessToken');
        var url = this.$rootUrl + "/api/halo/orders/products";
        const options = {
          method: 'GET',
          headers: {'access_token': token},
          url: url,
          data: {}
        };
        this.$axios(options).then((res) => {
          if (res.data.data) {
            if (res.data.errorCode == 0) {
              this.order=res.data.data.orderDetailList
            }
          }
        })
      }
    },
    components: {
      vOrder,vUnfound
    },
    created(){
      this.getData()
    }
  }
</script>
<style>

</style>
