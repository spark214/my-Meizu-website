<template>
  <div class="right_support">
    <dl>
      <dt>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持：</dt>
      <dd class="support-dd"><i class="el-icon-circle-check-outline"
                                style="color: #31a5e7"></i><span>花呗分期</span></dd>
      <dd class="support-dd"><i class="el-icon-circle-check-outline"
                                style="color: #31a5e7"></i><span>百城速达</span></dd>
      <dd class="support-dd"><i class="el-icon-circle-check-outline"
                                style="color: #31a5e7"></i><span>顺丰包邮</span></dd>
      <dd class="support-dd"><i class="el-icon-circle-check-outline"
                                style="color:#31a5e7"></i><span>7天无理由退货</span></dd>
      <dt>服&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务：</dt>
      <dd><span>本商品由 {{brand}} 负责发货并提供售后服务</span></dd>
    </dl>
  </div>
</template>
<script>
export default {
  props:{
    brand:{
      type:[String]
    }
  }
}
</script>
<style>
  .right_support {
    margin-top: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #dcdcdc;
  }

  .right_support dd {
    color: #666;
    position: relative;
    top: -16px;
    left: 80px;
    font-size: 12px;
  }

  .right_support dt {
    font-size: 12px;
    color: #666;
    position: relative;
    left: 11px;
  }

  .support-dd {
    display: inline;
    margin-right: 10px;
  }

  .support-dd span {
    position: relative;
    top: 0px;
    left: 2px;
  }
</style>
