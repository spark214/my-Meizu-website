<template>
    <div>
        <div class="user_info clearfix">
            <div class="info_img">
                <img :src="avatar" width="135px">
            </div>
            <div class="info_welcome">
                <h4>{{msg.username}}</h4>
                <p>欢迎您回来!</p>
            </div>
            <div class="info_msg">
                <ul>
                    <li><span class="info_msg_title">Halo.账号：</span><span>{{msg.username}}</span></li>
                    <li><span class="info_msg_title">绑定手机号：</span><span>{{filterPhone}}</span></li>
                    <li v-if="msg.email !== '' "><span class="info_msg_title">绑定邮箱：</span><span>{{filterMail}}</span></li>
                </ul>
            </div>
            <div class="info_enter">
                <a class="enter_btn" @click="goUser">修改个人信息 > </a>
            </div>

        </div>

        <div class="user_order">
            <div class="user_order_title">
                <p>订单状态</p>
            </div>
            <div class="user_order_content clearfix">
                <div class="order_pay clearfix  order_box" @click="goRouter('unsentOrder')">
                    <div class="order_pay_icon order_icon">
                        <img src="../../../../static/img/wallet.png">
                    </div>
                    <div class="order_info">
                        <p>待发货订单：<span class="order_pay_num">{{unsend}}</span></p>
                        <p class="order_seeall">查看全部待发货订单 ></p>
                    </div>

                </div>
                <div class="order_send clearfix order_box" @click="goRouter('sentOrder')">
                    <div class="order_send_icon order_icon">
                        <img src="../../../../static/img/send.png">
                    </div>
                    <div class="order_info clearfix">
                        <p>已发货订单：<span class="order_send_num">{{sent}}</span></p>
                        <p class="order_seeall">查看全部已发货订单 ></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: {},
                sent: 0,
                unsend: 0,
                avatar: ""
            }
        },
        methods: {
            goUser(){
                this.$router.push({path: '/user', query: {phone: this.msg.phone}});
            },
            goRouter(that) {
                this.$router.push({path: "/" + that});
            },
            getData(){
                var url = this.$rootUrl + "/api/user/userData";
                const options = {
                    method: 'POST',
                    url: url,
                    data: {}
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.data) {
                        if (item.errorCode == 0) {
                            this.msg = item.data.userinfo;
                            if (this.msg.avatar == "//" || this.msg.avatar == "") {
                                this.avatar = "https://image-res.mzres.com/img/download/uc/11/03/57/90/00/11035790/w100h100?t=1556275801"
                            }
                            else {
                                this.avatar = this.msg.avatar
                            }
                        }

                    }
                })

          },
            getNum(){
                var url = this.$rootUrl + "/api/order/indexOrderNum";
                const options = {
                    method: 'GET',
                    url: url,
                    data: {}
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.data) {
                        if (item.errorCode == 0) {
                            this.sent = item.data.sent;
                            this.unsend = item.data.unsent;
                        }
                    }
                });
            }
        },
        computed: {
            filterMail() {
                if (this.msg.email === undefined) {
                    return null;
                }
                var mail = this.msg.email.replace(/(.{2}).+(.{2}@.+)/g, '$1****$2');
                return mail;
            },
            filterPhone() {
                var phone = this.msg.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                return phone;
            }
        },
        created(){
            this.getData();
            this.getNum();
        }
    }
</script>
<style lang="less">
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

        img{
            width: 135px;
            height: 135px;
        }
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

    .order_icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
    }

    .order_pay_icon {
        background-color: rgb(245, 99, 19);
    }

    .order_send_icon {
        background-color: #00a7ea;
    }

    .order_pay p, .order_send p {
        color: #666666;
        font-size: 17px;
    }

    .order_info {
        float: left;
        margin-top: 15px;
        margin-left: 30px;
    }

    .order_seeall {
        font-size: 14px !important;
        color: #999 !important;
        margin-top: 10px;
        cursor: pointer;
    }

    .order_box {
        margin: 30px 0 50px 100px;
        float: left;
    }

    .order_pay_num {
        color: rgb(245, 99, 19);
    }

    .order_send_num {
        color: #00a7ea;
    }

    .order_seeall:hover, .enter_btn:hover {
        color: #00a7ea !important;
    }
</style>
