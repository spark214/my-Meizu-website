<template>
  <div class="advice">
    <p>您想对哪一方面提出建议</p>
    <el-select v-model="value" placeholder="请选择问题分类">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
    <p>请详细描述您的问题</p>
    <el-input
      type="textarea"
      :rows="3"
      placeholder="描述您遇到的问题"
      v-model="textarea"
    resize="none"
    style="width: 500px">
    </el-input>
    <p>邮箱（选填）</p>
    <el-input type="email" style="width: 300px"></el-input><br>
    <el-button type="primary" class="advice_button">提交</el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: [{
          value: '购物体验',
          label: '购物体验'
        }, {
          value: '支付流程',
          label: '支付流程'
        }, {
          value: '活动建议',
          label: '活动建议'
        }, {
          value: '商品建议',
          label: '商品建议'
        }, {
          value: '其他建议',
          label: '其他建议'
        }],
        textarea:""
      }
    }
  }
</script>
<style scoped>
.active {
  width: 100%;
  line-height: 50px;
}
  p{
    color: #666666;
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .advice_button{
    margin-top: 30px;
  }
</style>
