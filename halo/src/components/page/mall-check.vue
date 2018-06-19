<template>
  <div class="mallCheck">
    <v-header></v-header>
    <div class="pageContain">
      <v-address></v-address>
      <v-ordermsg></v-ordermsg>
      <v-payment></v-payment>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import vHeader from '../common/header/page/header';
  import vFooter from '../common/footer';
  import vAddress from '../common/mallCheck/address';
  import vOrdermsg from '../common/mallCheck/orderMsg';
  import vPayment from '../common/mallCheck/payment';

  export default {
    data() {
      return {}
    },
    components: {
      vHeader, vFooter, vAddress,vOrdermsg,vPayment
    }
  }
</script>
<style scoped>
  .header {
    background: white;
  }

  .mallCheck {
    background: #f8f8f8;
  }

  .pageContain {
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>
