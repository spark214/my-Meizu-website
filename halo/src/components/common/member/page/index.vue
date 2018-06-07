<template>
  <div>
    <div class="user_info clearfix">
      <div class="info_img">
        <img src="../../../../../static/img/21.jpg" width="135px">
      </div>
      <div class="info_welcome">
        <h4>221</h4>
        <p>欢迎您回来!</p>
      </div>
      <div class="info_msg">
        <ul>
          <li><span class="info_msg_title">Halo.账号：</span><span>{{msg.id}}</span></li>
          <li><span class="info_msg_title">绑定手机号：</span><span>{{filterPhone}}</span></li>
          <li><span class="info_msg_title">绑定邮箱：</span><span>{{filterMail}}</span></li>
        </ul>
      </div>
      <div class="info_enter">
        <a class="enter_btn">修改个人信息 > </a>
      </div>

    </div>

    <div class="user_order">
      <div class="user_order_title">
        <p>订单状态</p>
      </div>
      <div class="user_order_content">
        <div class="order_pay">
          <div class="order_pay_icon order_icon">
            <img src="../../../../../static/img/wallet.png">
          </div>
          <p>代付款订单：<span class="order_pay_num">0</span></p>
          <p class="order_seeall">查看全部待付款订单 ></p>
        </div>
        <div class="order_send">
          <div class="order_send_icon order_icon">
            <img src="../../../../../static/img/send.png">
          </div>
          <p>待发货订单：<span class="order_send_num">0</span></p>
          <p class="order_seeall">查看全部待发货订单 ></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        msg: {
          id: "zijian21",
          phone: "13192256005",
          mail: "707624560@qq.com"
        }
      }
    },
    methods: {},
    computed: {
      filterMail() {
        var mail = this.msg.mail.replace(/(.{2}).+(.{2}@.+)/g, '$1****$2')
        return mail;
      },
      filterPhone() {
        var phone = this.msg.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
        return phone;
      }
    }
  }
</script>
<style>
  .user_info, .user_order {
    width: 100%;
    border: 0.5px solid #f3f3f3;
    position: relative;
  }

  .user_order {
    margin-top: 25px;
  }

  .info_img {
    float: left;
    width: 140px;
    border: 5px solid #fafafc;
    text-align: center;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info_img img {
  }

  .info_welcome {
    float: left;
    margin-top: 30px;
    color: #666666;
    line-height: 35px;
  }

  .info_welcome h4 {
    font-size: 20px;
    font-weight: 500;
  }

  .info_welcome p {
    font-size: 14px;
    color: #999;
  }

  .info_msg {
    float: left;
    color: #999;
    font-size: 14px;
    line-height: 30px;
    position: relative;
    top: 30px;
    left: 200px;

  }

  .info_msg_title {
    display: inline-block;
    width: 100px;
  }

  .info_enter {
  }

  .enter_btn {
    color: #999;
    font-size: 14px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 15px;
    cursor: pointer;
  }

  .user_order_title {
    height: 40px;
    background-color: #fafafc;
    color: #666666;
    font-size: 14px;
    display: flex;
    align-items: center;
  }

  .user_order_title p {
    margin-left: 20px;
  }
  .order_icon{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .order_pay_icon{
    background-color:rgb(245,99,19);
  }
  .order_send_icon{
    background-color: #00a7ea;
  }
</style>
