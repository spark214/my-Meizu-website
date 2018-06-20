<template>
  <div class="forgetPassword">
    <v-header></v-header>
    <div class="forget_container">

    </div>
  </div>
</template>
<script>
  import vHeader from '../common/header/page/header';
  import vFooter from '../common/footer';

  export default {
    data() {
      return {
        components: {
          vFooter, vHeader
        }
      }
    }
  }
</script>
<style>

</style>
