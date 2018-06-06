<template>
  <div class="user">
    <v-header></v-header>
    <div class="pageContain">
      <div class="pageContain_header">
        <ul>
          <li :class="{on:select==1||select==3}" @click="select=1"><a>账号管理</a></li>
          <li :class="{on:select==2}" @click="select=2"><a>喜元</a></li>
        </ul>
      </div>
      <v-manage v-show="select==1" @edit="selectEdit"></v-manage>
      <v-coin v-show="select==2"></v-coin>
      <v-crop v-show="select==3"></v-crop>
    </div>

    <v-footer></v-footer>
  </div>
</template>
<script>
  import vHeader from '../common/header/page/header';
  import vFooter from '../common/footer';
  import vManage from '../common/user/accountManage';
import vCoin from '../common/user/hCoin';
import vCrop from '../common/user/cropper';
  export default {
    data() {
      return {
        select:1,
      }
    },
    methods:{
      selectEdit(msg){
        this.select=msg;

      }
    },
    components: {
      vHeader, vFooter, vManage,vCoin,vCrop
    },

  }
</script>
<style scoped>
  .pageContain {
    width: 1100px !important;
    margin-left: -550px;
  }

  .pageContain_header {
    border-bottom: 1px solid #dcdcdc;
    width: 100%;
    margin-top: 30px;
  }

  .pageContain_header ul li {
    width: 100px;
    height: 35px;
    display: inline-block;
    margin-right: 50px;
    text-align: center;
    cursor: pointer;
    color: #666666;
  }

  .on {
    color: #00a7ea !important;
    border-bottom: 2px solid #00a7ea;
  }


</style>
