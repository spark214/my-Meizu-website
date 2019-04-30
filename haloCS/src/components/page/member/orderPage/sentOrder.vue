<template>
  <div v-loading="orderLoading" class="allOrder">
    <v-order v-if="order.length > 0" :datas="order" ></v-order>
    <v-unfound v-if="orderLoading == false && order.length == 0"></v-unfound>
  </div>
</template>
<script>
  import vOrder from '../common/orderTable';
  import vUnfound from '../common/unfound';
  export default {
    data() {
      return {
        order: [],
        orderLoading:false
      }
    },
    methods: {
      getData(){
        this.orderLoading = true;
        var url = this.$rootUrl + "/api/order/myOrder";
        const options = {
          method: 'POST',
          url: url,
          data: {
            status:'3'
          }
        };
        this.$axios(options).then((res) => {
          let item = res.data.data;
            if (item.errorCode == 0) {
              this.order = item.data.orderDetailList;
              this.orderLoading = false;
            } else if (item.errorCode == 403) {
              sessionStorage.setItem('pageHistory', this.$route.fullPath);
              this.$router.push({path: "/login"});
              throw item.msg;
            } else {
              throw item.msg;
            }
        }).catch(errorMsg => {
          this.$message.error(errorMsg);
        });
      }
    },
    components: {
      vOrder, vUnfound
    },
    created(){
      this.getData()
    }
  }
</script>
<style lang="less">
  .allOrder{
    min-height: 300px;
  }
</style>
