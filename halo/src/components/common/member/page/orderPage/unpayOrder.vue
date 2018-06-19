<template>
  <div>
    <v-order v-if="order.length>0"></v-order>
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
