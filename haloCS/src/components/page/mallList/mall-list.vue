<template>
  <div class="mallList">
    <v-header></v-header>
    <div class="pageContain mallList_container" @mouseenter="test">
      <v-selector></v-selector>
      <v-grid ></v-grid>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
  import vHeader from '../../common/header/page/header';
  import vGrid from './common/grid';
  import vFooter from '../../common/footer';
  import vSelector from './common/selector';

  export default {
    data() {
      return {
        phoneItem: [],
      }

    },
    components: {
      vHeader, vGrid, vFooter, vSelector
    },

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
