<template>
  <div class="contain_detail" id="contain_detail">
    <div class="contain_detail_header">
      <ul>
        <li :class="{selectedSection:sectionIndex==1}" @click="sectionIndex=1"><a>商品详情</a></li>
        <li :class="{selectedSection:sectionIndex==2}" @click="sectionIndex=2"><a>常见问题</a></li>
      </ul>
    </div>

    <section class="detail_section" v-show="sectionIndex==1">
      <p v-html="common">
        {{common}}
      </p>
    </section>

    <section class="question_section" v-show="sectionIndex==2">
      <div class="question-list">
        <h4>热门回答</h4>
        <dl v-for="(item,index) in questions">
          <dt v-text="item.title"></dt>
          <dd v-text="item.answer"></dd>
        </dl>
      </div>
    </section>

  </div>
</template>
<script>
  export default {

    data() {
      return {
        common:[],
        questions: [
          {title: "魅族15 系列解锁方式是怎样的？", answer: "支持指纹识别解锁以及面部识别解锁；指纹解锁键位于手机屏幕下方。"},
          {title: "魅族15 系列是否保留 mBack 实体按键？形状？", answer: "非物理按键，可识别轻触及按压，操作逻辑和 mBack 相同。7mm 直径圆圈。"},
          {title: "魅族15 系列采用的系统是什么？", answer: "搭载全新的Flyme7系统。"}
        ],
        sectionIndex: 1,

      }
    },
    methods: {
      getData() {
        var proId = this.$route.query.proId
        var url = this.$rootUrl + "/api/product/productDetail";

        const options = {
          method: 'POST',
          url: url,
          data: {
            proId:proId
          }
        };

        this.$axios(options).then((res) => {
          let item = res.data.data;
          if (item.data) {
            var src = item.data.itemDetail.detailImg;
            this.common=src.replace(/data-original/g,"src");
          }
        })
      }
    },
    created() {
      this.getData()
    },
    watch: {
      '$route'(to, from) {
        this.getData()
      }
    }
  }
</script>
<style>
  .contain_detail {
    position: relative;
    top: 70px;
  }

  .contain_detail_header {
    border-bottom: 1px solid #dcdcdc;
    width: 100%;
  }

  .contain_detail_header ul li {
    width: 100px;
    height: 35px;
    display: inline-block;
    margin-right: 50px;
    text-align: center;
    cursor: pointer;
  }

  .detail_section p {
    line-height: 0;
    position: relative;
  }

  .detail_section {
    margin-top: 25px;
  }

  .question_section {
    width: 1240px;
  }

  .question-list dl {
    position: relative;
    border-top: 1px solid #dcdcdc;
    padding-top: 35px;
    margin-bottom: 20px;
  }

  .question-list dt {
    font-size: 18px;
    color: black;
    padding-left: 65px;
    height: 36px;
    line-height: 2;
    position: relative;
  }

  .question-list dl:nth-child(2) {
    border-top: 2px !important;
  }

  .question-list dt::after {
    content: "";
    width: 36px;
    height: 26px;
    position: absolute;
    left: 10px;
    top: 3px;
    background: url("../../../static/img/icons.png") left top no-repeat;
  }

  .question-list dd {
    color: #999;
    position: relative;
    padding-left: 65px;
    line-height: 2;
    padding: 15px 0 20px 65px;
  }

  .question-list dd::after {
    content: "";
    width: 36px;
    height: 26px;
    position: absolute;
    left: 10px;
    background: url("../../../static/img/icons.png") -36px top no-repeat;
  }

  .question-list h4 {
    color: #00c3f5;
    font-weight: 700;
  }

  .question-list {
    margin-top: 30px;
    border-bottom: 1px solid #dcdcdc;
  }

</style>
