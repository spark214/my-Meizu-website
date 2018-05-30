<template>
<div>
  <v-header></v-header>
  <div class="pageContain">
  <div class="pageContain_header">
    <ul>
      <li><a>账号管理</a></li>
      <li ><a>喜币</a></li>
    </ul>
  </div>
    <div class="pageContain_section">
      <div class="section_main">
        <img src="../../../static/img/21.jpg" width="100px">
        <div class="section_main_desc">
          <p>21</p>
          <p>账号 ：<span>21</span></p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import vHeader from '../common/header/page/header';
export default {
  data(){
    return {

    }
  },
  components:{
    vHeader
  }
}
</script>
<style>

</style>
