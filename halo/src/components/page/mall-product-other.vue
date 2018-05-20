<template>
  <div class="mall-product">

    <v-header></v-header>

    <div class="container clearfix pageContain">
      <div class="contain_head clearfix">
        <v-photo :imgurl="filterImg"></v-photo>
        <div class="contain_head_right">
          <h1>{{common.name}}</h1>
          <p class="right_slogan">{{common.title}}</p>
          <div class="right_price">
            <a>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格：</a>
            <span>￥{{common.price}}.00</span>
          </div>
          <div class="right_selecct">
            <dl>
              <dt class="right_selecct_item_lab">颜色分类：</dt>
              <dd v-for="item in filterColor" class="right_selecct_item right_selecct_item_lab">
                <a @click=""
                   :class="{selected:form.color==item.name}">
                  <img :src="item.img" width="32px"><span>{{item.name}}</span>
                </a>
              </dd>
            </dl>
          </div>
          <v-suport :brand="common.name"></v-suport>
          <div class="right_count">
            <dl>
              <dt class="right_selecct_item_lab">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</dt>
              <dd class="right_selecct_item_lab">
                <el-input-number v-model="form.buyCount" :min="1" :max="10" size="mini"
                                 controls-position="right"></el-input-number>
              </dd>
            </dl>

            <div class="right_button">
              <el-button type="danger" size="medium" class="right_buynow">
                立即购买
              </el-button>
              <el-button type="primary" size="medium" class="right_buynow">
                加入购物车
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!--<v-detail :name=""></v-detail>-->

      <v-footer></v-footer>

    </div>
    <!--<v-hover :brand="mobPhone.brand" :name="form.name" :nettype="form.nettype" :buyCount="form.buyCount"-->
             <!--:price="form.price"-->
             <!--:rom="form.rom" :colorName="form.colorName"></v-hover>-->

  </div>
</template>
<script>
  import vHeader from '../common/header';
  import vPhoto from '../common/photoShow';
  import bus from '../common/bus.js';
  import vSuport from '../common/suport';
  import vDetail from '../common/detail';
  import vFooter from '../common/footer';
  import vHover from '../common/hoverBar';

  export default {
    data() {
      return {
        "common": {
          "name": "魅族手环",
          "title": "腕间流动的心率专家",
          "price": 169,
          "color": [
            "https://openfile.meizu.com/group1/M00/00/C8/Cix_s1hGFveAE3RcAAOqzSlfPuA022.png@240x240.jpg:黑色"
          ],
          "imgUrl": [
            "https://openfile.meizu.com/group1/M00/00/C8/Cix_s1hGFveAE3RcAAOqzSlfPuA022.png680x680.jpg,https://openfile.meizu.com/group1/M00/00/C8/CnQOjVhGFveAQPDGAAPhPu3QlRw570.png680x680.jpg,https://openfile.meizu.com/group1/M00/00/C8/CnQOjVhGFveAE13JAAK1qX5uOUc838.png680x680.jpg,https://openfile.meizu.com/group1/M00/00/C8/Cix_s1hGFvmAKqehAAEitg7s_D0643.png680x680.jpg"
          ],
        },
        form: {
          name: '15',
          color: 'while',
          colorName: '汝窑白',
          version: '魅族15',
          price: 2499,
          buyCount: 1,
          nettype: '全网通公开版',
          rom: '4GB+64GB',
        },
        sumPrice: 0,
        selectColor: 0,

      }
    },
    components: {
      vHeader, vPhoto, vSuport, vDetail, vFooter, vHover
    },
    methods: {
      changePic(index) {
        this.selectPic = (index + 1);
      },

    },

    computed: {
      filterImg() {
        let imgurl = []
        let currindex = 0
        let nextindex = this.common.imgUrl[this.selectColor].indexOf(",", currindex)

        while (nextindex > 0) {
          imgurl.push(this.common.imgUrl[this.selectColor].slice(currindex, nextindex))
          currindex = nextindex + 1
          nextindex = this.common.imgUrl[this.selectColor].indexOf(",", currindex)
        }
        imgurl.push(this.common.imgUrl[this.selectColor].slice(currindex))
        return imgurl
      },
      filterColor() {
        let color=[]
        const item = this.common.color
        for (let i = 0; i < item.length; i++) {
          let index = item[i].lastIndexOf(":")
          color.push({name:item[i].substr(index+1),img:item[i].slice(0, index)})
        }
        return color
      },
      }
  }
</script>
<style>
  .contain_head {
    width: 100%;
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

  .right_selecct dl, .right_count dl {
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

  .right_selecct dd, .right_count dd {
    margin-left: 15px;
  }

  .right_selecct_item {
    display: inline;
  }

  .right_selecct_item a {
    width: 100px;
    height: 39px;
    display: inline-block;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    margin-bottom: 10px;
    text-align: center;
    cursor: pointer;
  }

  .selected {
    border: 1px solid #31a5e7 !important;
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

  .right_selecct_item_lab, .right_selecct_rom_lab {
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

  .right_selecct_rom span, .right_selecct_nettype span {
    position: relative;
    top: 8px;
    left: 12px;
    color: #666666;
  }

  .right_selecct_nettype {
    width: 100px;
    height: 32px;
    border: 1px solid #31a5e7;
    border-radius: 5px;
  }

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

  .right_buynow {
    width: 120px;
    margin-left: 50px;
  }

  .right_button {
    margin-left: -40px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .selectedSection {
    border-bottom: 2px solid #31a5e7;
    color: #31a5e7;
  }

</style>
