<template>
  <div class="mallCheck">
    <v-header></v-header>
    <div class="pageContain">
      <v-address></v-address>
      <v-ordermsgs v-if="type==1"></v-ordermsgs>
      <v-ordermsg v-else></v-ordermsg>
      <v-payment></v-payment>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import vHeader from '../../common/header/page/header';
  import vFooter from '../../common/footer';
  import vAddress from './common/address';
  import vOrdermsg from './common/orderMsg';
  import vOrdermsgs from './common/orderMsgs';
  import vPayment from './common/payment';

  export default {
    data() {
      return {
        type:0
      }
    },
    components: {
      vHeader, vFooter, vAddress,vOrdermsg,vPayment,vOrdermsgs
    },
    created(){
      this.type = this.$route.query.type
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
