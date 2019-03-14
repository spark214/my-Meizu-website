<template>
  <div class="errorPage">
    <button @click="back">Go Back</button>
  </div>
</template>
<style type="text/css">
  .errorPage {
    width: 100%;
    height: 100%;
    background: url("../../../static/img/404page.jpg");
    background-position: center;
    overflow: hidden;
  }

  button {
    width: 150px;
    height: 50px;
    border: 3px solid #fff;
    position: relative;
    background-color: transparent;
    left: 43.5%;
    top: 76%;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
  }
</style>
<script>
  export default {
    methods: {
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>

