<template>
  <div class="mall-product">
    <v-header></v-header>
    <div class="container">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/mallIndex' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{mobPhone.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="contain_head">
        <div class="contain_head_img">
          <img :src="'../../../static/img/'+mobPhone.name+'_'+selectColor+'_'+selectPic+'_680x680.jpg'" width="395px"
               class="img_preview">
          <ul>
            <li v-for="(pic,picIndex) in 4">
              <img :src="'../../../static/img/'+mobPhone.name+'_'+selectColor+'_'+(picIndex+1)+'_680x680.jpg'"
                   width="75px" @click="changePic(picIndex)" :class="{selectPic:selectPic==(picIndex+1)}">
            </li>
          </ul>
        </div>
        <div class="contain_head_right">
          <h1>{{mobPhone.brand+mobPhone.name}}</h1>
          <p class="right_slogan">{{mobPhone.slogan}}</p>
          <div class="right_price">
            <a>价&nbsp;&nbsp;&nbsp;&nbsp;格</a>
            <span>￥{{mobPhone.price}}.00</span>
          </div>
          <div class="right_selecct">
            <dl>
              <dt class="right_selecct_rom_lab">网络类型：</dt>
              <dd v-for="item in mobPhone.nettype" class="right_selecct_nettype right_selecct_rom_lab"><span>{{item.name}}</span></dd>
            </dl>
            <dl>
              <dt class="right_selecct_item_lab">颜色分类：</dt>
              <dd v-for="item in mobPhone.color" class="right_selecct_item right_selecct_item_lab">
                <a>
                  <img :src="'../../../static/img/'+mobPhone.name+'_'+item.name+'_2_680x680.jpg'" width="32px"><span>{{item.colorName}}</span>
                </a>
              </dd>
            </dl>
            <dl>
              <dt class="right_selecct_rom_lab">内存容量：</dt>
              <dd v-for="item in mobPhone.rom" class="right_selecct_rom right_selecct_rom_lab"><span>{{item.size}}</span></dd>
            </dl>
          </div>
          <div class="right_support">
            <dl>
              <dt>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持：</dt>
              <dd class="support-dd"><i class="el-icon-circle-check-outline" style="color: #31a5e7"></i><span>花呗分期</span></dd>
              <dd class="support-dd"><i class="el-icon-circle-check-outline" style="color: #31a5e7"></i><span>百城速达</span></dd>
              <dd class="support-dd"><i class="el-icon-circle-check-outline" style="color: #31a5e7"></i><span>顺丰包邮</span></dd>
              <dd class="support-dd"><i class="el-icon-circle-check-outline" style="color:#31a5e7"></i><span>7天无理由退货</span></dd>
              <dt>服&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务：</dt>
              <dd><span>本商品由 魅族 负责发货并提供售后服务</span></dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import vHeader from '../common/header';

  export default {
    data() {
      return {
        mobPhone:
          {
            brand: '魅族',
            name: '15',
            slogan: '2000万暗光双摄， AI智能美颜',
            nettype:[{name:'全网通公开版'}],
            price: '2499',
            color: [{colorName: '雅金', name: 'gold'}, {colorName: '汝窑白', name: 'while'}, {
              colorName: '砚墨',
              name: 'black'
            }],
            rom: [{size: '4GB+64GB'}, {size: '4GB+128GB'}],
          },
        selectColor: 'while',
        selectPic: 1,


      }
    },
    components: {
      vHeader
    },
    methods: {
      changePic(index) {
        this.selectPic = (index + 1);
      }
    },
    computed: {}
  }
</script>
<style>
  .contain_head {
    width: 100%;
    margin-top: 10px;
  }

  .contain_head_img {
    position: relative;
    float: left;
    width: 450px;
    margin-left: 30px;
  }

  .contain_head_img ul {
    margin-left: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .contain_head_img ul li {
    display: inline;
    margin-right: 25px;
    cursor: pointer;
  }

  .contain_head_img ul li img {
    box-sizing: border-box;
  }

  .selectPic {
    border: 1px solid #dcdcdc;
  }

  .contain_head_right {
    position: relative;
    width: 700px;
    float: left;
    left: 30px;
    top: 40px;
  }

  .contain_head_right h1 {
    font-size: 24px;
    font-weight: 400;
  }

  .right_slogan {
    color: #e22841;
    font-size: 16px;
    margin-top: 10px;
  }

  .right_price {
    width: 700px;
    height: 50px;
    background: #F0F0F0;
    margin-top: 20px;
  }

  .right_price a {
    position: relative;
    top: 7px;
    left: 10px;
    color: #707070;
    font-size: 12px;
  }

  .right_price span {
    color: #e22841;
    font-size: 24px;
    position: relative;
    top: 11px;
    left: 15px;
  }

  .right_selecct {
    margin-top: 30px;
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: 10px;
  }

  .right_selecct dl {
    font-size: 12px;
    color: #666666;
    position: relative;
    left: 10px;
    margin-bottom: 15px;
  }

  .right_selecct dt {
    position: relative;
    top: 10px;
    vertical-align: top;
  }
  .right_selecct dd{
    margin-left: 15px;
  }
  .right_selecct_item {
    display: inline;
  }

  .right_selecct_item a {
    width: 100px;
    display: inline-block;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    margin-bottom: 10px;
    text-align: center;
  }

  .right_selecct_item a img {
    margin-left: 10px;
    margin-top: 2px;
  }

  .right_selecct_item a span {
    display: inline-block;
    width: 55px;
    position: relative;
    left: 6px;
    top: -10px;
    color: #666666;
  }

  .right_selecct_item_lab,.right_selecct_rom_lab {
    display: inline-block;
    margin-bottom: 15px;
  }

  .right_selecct_rom {
    width: 90px;
    height: 35px;
    border: 1px solid #31a5e7;
    border-radius: 5px;
    margin-right: 10px;
  }
  .right_selecct_rom span,.right_selecct_nettype span{
    position: relative;
    top: 8px;
    left: 12px;
    color: #666666;
  }
  .right_selecct_nettype{
    width: 100px;
    height: 32px;
    border: 1px solid #31a5e7;
    border-radius: 5px;
  }
  .right_support{
    margin-top: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #dcdcdc;
  }
  .right_support dd{
    color: #666;
    position: relative;
    top: -16px;
    left: 80px;
    font-size: 12px;
  }
  .right_support dt{
    font-size: 12px;
    color: #666;
    position: relative;
    left: 11px;
  }
  .support-dd{
    display: inline;
    margin-right: 10px;
  }
  .support-dd span{
    position: relative;
    top: 0px;
    left: 2px;
  }


</style>
