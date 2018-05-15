<template>
  <div class="mall-product pageContain">
    <v-header></v-header>
    <div class="container">
      <div class="contain_head clearfix">
        <div class="contain_head_img">
          <img :src="'../../../static/img/'+mobPhone.name+'_'+form.selectColor+'_'+selectPic+'_680x680.jpg'" width="395px"
               class="img_preview">
          <ul>
            <li v-for="(pic,picIndex) in 4">
              <img :src="'../../../static/img/'+mobPhone.name+'_'+form.selectColor+'_'+(picIndex+1)+'_680x680.jpg'"
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
              <dd v-for="item in mobPhone.nettype" class="right_selecct_rom_lab"><el-button>{{item.name}}</el-button></dd>
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
              <dd v-for="item in mobPhone.rom" class=" right_selecct_rom_lab"><el-button>{{item.size}}</el-button></dd>
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
              <dd><span>本商品由 {{mobPhone.brand}} 负责发货并提供售后服务</span></dd>
            </dl>
          </div>
          <div class="right_count">
            <dl>
              <dt class="right_selecct_item_lab">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</dt>
              <dd class="right_selecct_item_lab">
                <el-input-number v-model="form.buyCount"  :min="1" :max="10" size="mini"  controls-position="right"></el-input-number>
              </dd>
              <dd class="right_selecct_item_lab">
                <el-button type="primary" size="medium" class="right_buynow">
                  立即购买
                </el-button>
              </dd>

            </dl>

          </div>
        </div>
      </div>

      <div class="contain_detail" id="contain_detail">
        <div class="contain_detail_header">
          <ul>
            <li :class="{selectedSection:sectionIndex==1}" @click="sectionIndex=1"><a>商品详情</a></li>
            <li :class="{selectedSection:sectionIndex==2}" @click="sectionIndex=2"><a>常见问题</a></li>
          </ul>
        </div>

        <section class="detail_section" v-show="sectionIndex==1">
          <p v-for="(item,index) in 13">
            <img :src="'../../../static/img/'+mobPhone.name+'page_detail_'+(index+1)+'.jpg'">
          </p>
        </section>

        <section class="pd-section-question" v-show="sectionIndex==2">
          <div class="question-list">
            <h4>热门回答</h4>
            <dl v-for="(item,index) in questions">
              <dt v-text="item.title"></dt>
              <dd v-text="item.answer"></dd>
            </dl>
          </div>
        </section>

      </div>

      <div class="contain_footer clearfix">
        <table class="foottable">
          <tr>
            <td><img src="../../../static/img/sf.png" class="tinyicon"><a>顺丰包邮</a></td>
            <td><img src="../../../static/img/nextarrive.png"  class="tinyicon"><a>100+城市次日送达</a></td>
            <td><img src="../../../static/img/7days.png" class="tinyicon"><a>7天无理由退货</a></td>
            <td><img src="../../../static/img/15days.png" class="tinyicon"><a>15天换货保障</a></td>
          </tr>

          <tr>
            <td><img src="../../../static/img/1years.png" class="tinyicon"><a>1年免费保修</a></td>
            <td><img src="../../../static/img/2300.png" class="tinyicon"><a>2300+线下体验店</a></td>
            <td><img src="../../../static/img/further.png" class="tinyicon"><a>远程支持服务</a></td>
            <td><img src="../../../static/img/fix.png" class="tinyicon"><a>上门快修</a></td>
          </tr>
        </table>
      </div>
        <div class="copyright">
          <p>&copy;2018 Halo Telecom Equipment Co., Ltd. All rights reserved.  备案号：	粤ICP备18002543号-1 </p>
        </div>

    </div>
    <div class="hoverbar clearfix" id="hoverbar" v-show="barShow">
      <div class="bar-button">
        <a href="login.html"><span>现在购买</span></a>
      </div>
      <div class="bar-desc">
        <span>{{mobPhone.brand+mobPhone.name}}</span>
        <span class="bar-desc-price">￥{{form.buyCount*mobPhone.price}}.00</span>
        <label>全网通公开版 <a class="bar-color">{{selectColorName}}</a> 64GB</label>
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
        form: {
          selectColor: 'while',
          selectColorName:'汝窑白',
          buyCount:1,
          nettype:'全网通公开版',
          rom:'4GB+64GB',
        },
        selectPic: 1,
        sectionIndex:1,

        questions:[
          {title:"魅族15 系列解锁方式是怎样的？",answer:"支持指纹识别解锁以及面部识别解锁；指纹解锁键位于手机屏幕下方。"},
          {title:"魅族15 系列是否保留 mBack 实体按键？形状？",answer:"非物理按键，可识别轻触及按压，操作逻辑和 mBack 相同。7mm 直径圆圈。"},
          {title:"魅族15 系列采用的系统是什么？",answer:"搭载全新的Flyme7系统。"}
        ],
        sumPrice:0,
        barShow:false,


      }
    },
    components: {
      vHeader
    },
    methods: {
      changePic(index) {
        this.selectPic = (index + 1);
      },
      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        var detailPosition=document.getElementById("contain_detail").offsetTop
        if(scrollTop>detailPosition){
          this.barShow=true;
        }
        else {
          this.barShow=false;
        }
      },

    },
    computed: {

    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll);
    },
  }
</script>
<style>
  .contain_head {
    width: 100%;
  }

  .contain_head_img {
    position: relative;
    float: left;
    width: 40%;
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
    width: 50%;
    float: left;
    padding-left: 1%;
    box-sizing: content-box;
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

  .right_selecct dl , .right_count dl{
    font-size: 12px;
    color: #666666;
    position: relative;
    left: 10px;
    margin-bottom: 10px;
  }

  .right_selecct dt {
    position: relative;
    top: 10px;
    vertical-align: top;
  }
  .right_selecct dd,.right_count dd{
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
  .right_buynow{
    margin-left: 50px;
  }
  .contain_detail{
    position: relative;
    top: 70px;
  }
  .contain_detail_header{
    border-bottom: 1px solid #dcdcdc;
    width: 100%;
  }
  .contain_detail_header ul li{
    width: 100px;
    height: 35px;
    display: inline-block;
    margin-right: 50px;
    text-align: center;
    cursor: pointer;
  }
  .detail_section p{
    line-height: 0;
    position: relative;
    left: -20px;
  }
  .detail_section{
    margin-top: 25px;
  }
  .question-list dl{
    position: relative;
    border-top: 1px solid #dcdcdc;
    padding-top: 35px;
    margin-bottom: 20px;
  }
  .question-list dt{
    font-size: 18px;
    color: black;
    padding-left: 65px;
    height: 36px;
    line-height: 2;
    position: relative;
  }
  .question-list dt::after{
    content: "";
    width: 36px;
    height: 26px;
    position: absolute;
    left: 10px;
    top: 3px;
    background: url("../../../static/img/icons.png") left top no-repeat;
  }
  .question-list dd{
    color: #999;
    position: relative;
    padding-left: 65px;
    line-height: 2;
    padding: 15px 0 20px 65px;
  }
  .question-list dd::after{
    content: "";
    width: 36px;
    height: 26px;
    position: absolute;
    left:10px;
    background: url("../../../static/img/icons.png") -36px top no-repeat;
  }
  .question-list h4{
    color: #00c3f5;
    font-weight: 700;
  }
  .question-list{
    margin-top: 30px;
    border-bottom: 1px solid #dcdcdc;
  }
  .foottable{
    width: 800px;
    position: relative;
    left: 50%;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: -380px;
  }
  .foottable tr{
    text-align: justify;
  }
  .foottable td{
    width: 200px;
    height: 80px;
  }
  .foottable a{
    color: #999999;
    position: relative;
    top:-7px;
    left: 5px;
  }
  .contain_footer{
    margin-top: 100px;
    width: 100%;
    border-bottom: 1px solid #DCDCDC;
  }
  .copyright{
    text-align: center;
  }
  .copyright p{
    font-size: 14px;
    color: #999999;
    margin-top: 20px;
  }
  .hoverbar{
    position: fixed !important;
    top: -1px;
    left: 10px;
    background: #fff;
    width: 100%;
    height: 70px;
    z-index: 10;
    opacity: .9;

  }
  .bar-desc{
    float: right;
    position: relative;
    right: 0px;
    top: 15px;
  }
  .bar-desc span{
     position: relative;
     right: -50px;
   }
  .bar-desc-price{
    color: #e22841;
    font-size: 18px;
    font-weight: 800;
    position: relative;
    right: -60px !important;

  }

  .bar-desc label{
    font-size: 12px;
    position: relative;
    right: 50px;
    color: #666;
    top:20px
  }
  .bar-button{
    float: right;
    position: relative;
    top:15px;
    right: 20px;
    cursor: pointer;
  }
  .bar-button a{
    width: 120px;
    height: 40px;
    border: 1px solid #31a5e7;
    border-radius: 2px;
    display: inline-block;
    background: #31a5e7;
    text-align: center;
  }
  .bar-button a span{
    color: #fff;
    font-size: 14px;
    position: relative;
    top: 8px;
  }
  .selectedSection{
    border-bottom: 2px solid #31a5e7;
    color: #31a5e7;
  }
</style>
