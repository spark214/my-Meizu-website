<template>
  <div>
    <div class="hoverbar clearfix" id="hoverbar" v-show="barShow">
      <div class="bar-button">
        <a href="login.html"><span>现在购买</span></a>
      </div>
      <div class="bar-desc">
        <span>{{name}}&nbsp;<span
          class="bar-desc-price">￥{{buyCount*price}}.00</span></span>
        <br>
        <label>{{nettype}} <a class="bar-color">{{colorName}}</a> {{rom}}</label>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      name: {
        type: [String, Number]
      },
      buyCount: {
        type: [Number]
      },
      price: {
        type: [Number]
      },
      nettype:{
        type:[String]
      },
      colorName:{
        type:[String]
      },
      rom:{
        type:[String]
      },



    },
    data(){
      return{
        barShow: false,
      }
    },
    methods:{
      handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var detailPosition = document.getElementById("contain_detail").offsetTop
        if (scrollTop > detailPosition) {
          this.barShow = true;
        }
        else {
          this.barShow = false;
        }
      },
    },
    mounted() {
      setTimeout(() => {
        this.handleScroll()
      }, 300)
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleScroll)

    }
  }
</script>
<style>
  .hoverbar {
    position: fixed !important;
    top: 0px;
    left: 0px;
    background: #fff;
    width: 100%;
    height: 70px;
    z-index: 1000;
    opacity: .9;

  }

  .bar-desc {
    float: right;
    position: relative;
    right: 0px;
    top: 15px;
  }

  .bar-desc > span {
    position: relative;
    right: 50px;
    float: right;
  }

  .bar-desc-price {
    color: #e22841;
    font-size: 18px;
    font-weight: 800;
    position: relative;
    right: 0px;
    float: right;
    top: -2px;
    margin-left: 10px;

  }

  .bar-desc label {
    font-size: 12px;
    position: relative;
    color: #666;
    top: 0px;
    right: 50px;
    float: right;
  }

  .bar-button {
    float: right;
    position: relative;
    top: 15px;
    right: 20px;
    cursor: pointer;
  }

  .bar-button a {
    width: 120px;
    height: 40px;
    border: 1px solid #31a5e7;
    border-radius: 2px;
    display: inline-block;
    background: #31a5e7;
    text-align: center;
  }

  .bar-button a span {
    color: #fff;
    font-size: 14px;
    position: relative;
    top: 8px;
  }

</style>
