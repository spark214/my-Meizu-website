<template>
  <div class="mall-index">

    <v-header></v-header>

    <div class="pageContain">
    <v-banner></v-banner>
    <v-msc></v-msc>
      <v-section></v-section>
    </div>
    <v-footer></v-footer>

  </div>
</template>
<script>
  import vHeader from '../common/header/page/header';
  import vFooter from '../common/footer';
  import vBanner from  '../common/mallIndex/banner';
  import vMsc from '../common/mallIndex/msc';
  import vSection from  '../common/mallIndex/sectionBox';
  export default {
    data() {
      return {
      }
    },
    components: {
      vHeader,vFooter,vBanner,vMsc,vSection
    },
    methods: {

    },
    computed: {}
  }
</script>
<style scoped>
  .pageContain{
    top:0px;
  }
  .banner {
    position: relative;
  }


</style>
