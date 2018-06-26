<template>
  <div class="payment_container">
    <div class="paymentMsg clearfix">
      <h4 style="font-weight: bold">选择支付方式</h4>
      <div class="payment_select clearfix">
        <div class="payment_ali clearfix">
          <div class="payment_aliSelect  clearfix">
            <span class="payment_select_span">支付宝</span>
            <ul>
              <li v-for="(item,index) in ali">
                <el-radio v-model="radio" :label="index"><img width="125" height="40" :src="item.img"></el-radio>
              </li>
            </ul>
          </div>
          <div class="payment_antIns clearfix" v-show="radio==0">
            <ul>
              <li :class="{'payment_antIns_selected':antIns[0].selected}" @click="antInsSelected(0)">
                <p v-model="antIns[0].pay" v-text="'￥'+pay3+' x '+antIns[0].month+' 期 '"
                   style="font-size: 16px;width: 100%" align="center" class="payment_antIns_p"></p></li>
              <li :class="{'payment_antIns_selected':antIns[1].selected}" @click="antInsSelected(1)">
                <p v-model="antIns[1].pay" v-text="'￥'+pay6+' x '+antIns[1].month+' 期 '"
                   style="font-size: 16px;width: 100%" align="center" class="payment_antIns_p"></p></li>
              <li :class="{'payment_antIns_selected':antIns[2].selected}" @click="antInsSelected(2)">
                <p v-model="antIns[2].pay" v-text="'￥'+pay12+' x '+antIns[2].month+' 期 '"
                   style="font-size: 16px;width: 100%" align="center" class="payment_antIns_p"></p></li>
            </ul>
          </div>
        </div>
        <div class="payment_wechat clearfix">
          <span class="payment_select_span">微信支付</span>
          <ul>
            <li>
              <el-radio v-model="radio" label="2"><img width="125" height="40"
                                                       src="data:image/png;base64,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">
              </el-radio>
            </li>
          </ul>
        </div>
        <div class="payment_bank clearfix">
          <span class="payment_select_span">网上银行</span>
          <ul style="width: 88%">
            <li v-for="(item,index) in bank">
              <el-radio v-model="radio" :label="index+3"><img width="125" height="40" :src="item.img"
                                                              style="border: 0.5px solid #ccc"></el-radio>
            </li>
          </ul>
        </div>

      </div>
      <div class="payment_computed clearfix">
        <div class="clearfix"><p>总金额</p>
          <p v-text="'￥'+totalPrice+'.00'"></p></div>
        <div class="clearfix"><p>运费</p>
          <p v-text="'￥0.00'"></p></div>
        <div style="height: 1px;border-top: 0.5px solid #ccc"></div>
        <div class="clearfix"><p>应付：</p>
          <p v-text="'￥'+totalPrice+'.00'" style="font-size: 20px;color:#e02b41;font-weight: bold;"></p></div>
        <el-button type="primary" class="payment_button" @click="sureBuy">下单并支付</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        bank: [
          {
            name: "中国银行",
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAAmCAMAAADeF2QjAAAAY1BMVEUAAAAAAACvITQAAACvITQAAACvITQAAACvITQAAACvITQAAACvITQAAACvITQAAACvITQAAACvITQAAACvITQAAACvITQAAACvITQAAACvITQAAACvITQAAACvITQAAACvITQFZv7bAAAAH3RSTlMAEBAgIDAwQEBQUGBgcHCAgI+Pn5+vr7+/z8/f3+/vdkdMmQAAA2VJREFUWMPtl92S6ygMhBsTRmGIR3YwIYQQ6f2fci8c5293T8VVu3MVXdnG5Q+LFmqAT3ziE0tsp7Oqqh5/Nr/PntFzTC98455urftv2d2kT3HZPQ1HoftMxjLm+C/zAvqHV9+Fn1RVj7tJVbf7i6rqEz5JM8t/VwKQwm1eFrDlRnQicS39pKqnLTCoKtDtX/FZJObsACBlmN66NA9QiwY+l2VupojklfC9qk4dFjqwU1X9ur/QRJJvFgCHsYlktOu0qPbUbLovkcgI+MjvC05Vj8ADHbvbI4xALyJm9AD8iCS+J8yJoAQ2Md1YUaT2FGvi93V5VL10wOZnOKrqMHxd07EFAEjMIiIpAgAznIwIyAQA0TqgidhFcZIBSgZw7+I38yLv7oo/AN1FdVoU52VOKMABLDJmRAJgYxLnpNXrlyjNqx5SK+FN+o/qBcDloeB2wH5+CpBILyLFAQAT0igtEBOAaGu1JLU5+EXxxYbaRrMm8RPwparTMAzDcFId5vvNTUki8+cjkYiM0SQCKAYRxy1blxgAXJNqYrKZV5Xbz5z/bpHeAOC28Agsy9LGEFJznE0mYPReRLLItcZNE2EAWEO/Yha5L/TzjQ4SKfMVR2pjbOKqBYDYpDT2RWpvASeNJQCIcS396w90c9vAuOXcWh65AcCYWq6FbQ5VpAecJeHeYyxrM799pd8zD+TsrxtpA2BZmruWWHZ9a/7ef2pvuIm8Tz+oTkCnqqfj8Xg8Xl5UByC359ZB1wK3FgC9CjzIin//h4rbAnvV871x+VU7d/9+wWGjqj/A9x0/zbvN/leMxbLTbrcHVf3efgGYHhP//9oaVT11f+sy0y+5qv2Cf+ywl+5abkQWgIEhgACAHAD7Rwtj17qL8/dC3xwe27upXDxshakRzH211QMhhWJTGRnwKRRfk6lM4nIxvsDU9c7qPEyquju8GLvMiTBWQm6RiEpyAJrByJzYANWAHI9Uegj6Vgyjr2EV/sVVnh+MTR5jsq0mZNcKUasegACBOY3zJcCZK0PAvpSIklbaq+8HR30ZuoeR4jklZ8QV4xpRddUBiU0mjteeEmzskRkCJlM4eNS1zvZ7Pk1cDrvuSUDMwZI33LODs8TGeQCBCa43AAwnb7gHB8fUBxhib7n/HM8+8Qn8BTthWaRdRx0sAAAAAElFTkSuQmCC",
            tel: ""
          },
          {
            name: "中国工商银行",
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAAmCAMAAADeF2QjAAAAY1BMVEUAAAAAAADHAAoAAADHAAoAAADHAAoAAADHAAoAAADHAAoAAADHAAoAAADHAAoAAADHAAoAAADHAAoAAADHAAoAAADHAAoAAADHAAoAAADHAAoAAADHAAoAAADHAAoAAADHAAo2rDQxAAAAH3RSTlMAEBAgIDAwQEBQUGBgcHCAgI+Pn5+vr7+/z8/f3+/vdkdMmQAAAehJREFUWMPtltFymzAQRa+DydoR7oJl56LI6tX/f2UfACd1nXQmfUgzw3nSiFmOdqUVACsrKysr/w3b7Zepd8+11vr89CXyvl5+7HbdWE8Pr5ONbT6KuT62N3Ofk/fToKun11mXAYBpwoGBJMkBCO5UdDfAFKMkAmjLENw93L7fZWgiyWCSlB3YDJQEANt6HGutY621q90UEMisRAaYSPIsBzitg9eRHEiSxEKgLeXAeSG39raokMGUyaw9kgpJADhdMI593/WnivFlCWBWSnKYIiXKAQDTetF4Ka7sDQ6iz7mHEjSYmd2xn3WYCunAXh4Ul4eXI8bLeOzGl4qn+jAHwGW22NPwu33ZDkND5fOUO/alSHNBb+wlvY1rXNcjUp/Q9Zexv/Q9HutuDnAqRjlM7irp1p50VpYBVM5SIWDS3iyne7nnxZ7JLP+rfdlYU3QV3cu9yAAXqawCbIoM4B/bflt5iEHnpaF+3qm8uUUd9m4wJZKUA2YmmRlgYnZNXSElFQUA9r69LVK6nrq4SdIHp+5ux80jASYWSjIgiRKTbLJ7uWtHM1w7LsUNNpHl/Y57tbcMZmYMgM0ALVsAjAAOAYNh45hm9/TP3zbPX3DTHm9u2m3/T+y+01cGAB4e17+MlZWVlW/HL6R2QGfCHwO8AAAAAElFTkSuQmCC",
            tel: ""
          },
          {
            name: "中国建设银行",
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAAmCAMAAADeF2QjAAAAY1BMVEUAAAAAAAAMT50AAAAMT50AAAAMT50AAAAMT50AAAAMT50AAAAMT50AAAAMT50AAAAMT50AAAAMT50AAAAMT50AAAAMT50AAAAMT50AAAAMT50AAAAMT50AAAAMT50AAAAMT53VHnqUAAAAH3RSTlMAEBAgIDAwQEBQUGBgcHCAgI+Pn5+vr7+/z8/f3+/vdkdMmQAAAxJJREFUWMPtllF35SYMhMdlieJlWV1CvFPKJcP//5X7YN/cbJJN+tDTnNNmnowl+CwhYYBPfepT/2Pd3H4g/Nt5zh83HwD+cnee83xzP+f89q/DT3POOefDP4UP8dn4Lecfc/4GX3hZp/JRDpi7J3fJPQMgSVCSlAGgKsEkSSMAyCPGY258Ab+f8xV8JsmhRnIDIBV3d/ciAuZNlZQoGeDuDipbFYEd7OruXQYkjbLuk/1FFr5eyA8X/A8AoKpZUzaTDJAqm0TugGX0PVZJSCQRuwyuFpCGstm6Gw1Zo2j7Xd7Pl7BvDvxff+x0B7iDDZCSZcksiUAa6vmIPcNcQuG2IGxMSKOrMauZNRlyLxr9+FI+b/ILHDjw+/sX9Kexm1OJlI6tlHBJhQOJqu4a+0aHTfJoZibl5/v+/RG+4/fIX6EbTNqGi0CqrgvOdvomuVVpBUpXYxUHw6gIY8gBHAu90m2XgG8eLvCXdPcqFVEEosbIe817ACBVrxKlBAAui1ms6iMAwd+hPzbZ7el0On3b6VcdmSd5ZD4MkdfML5Kqd0mjJAAuqqrVJkYA/rdjn/Oo+Wh21LzZAkhtpzcRcHWNg16ApuGSmm+SgCCpNEkLxQs9sWkseGff55ynR2O0i79dFYEQEJ4Ml7TAdtdoAFZbEM0WIEYAwQIQzOzlmfe85ueceyIWi4gL8DRbweJvT8yr32JXtyW+fSj/+Uu/zznPAIB1FFYa8KRF11FYn0wt16VTvPpZ99Yuz3ybfvv0rJtzzq97za+As7ci9l4a+wq0FYt770lt5N7a6KMRnnpjbzoMK6zZOnJrla0XpvbmT+Zu/qL7o+MMiM2M4mqs3h0YATAtoWvxbXimNxDOjOwmLWFocYd1Lz0XkstKKbwd/f0rcNS6rGOnm40RNwdqXVLvce2CM6+iEx1kWTY3HQaHEaGPlEkYW34n9/j+8Ah/rPfFucUUQvIUQnKWAiyFW1zJ6LC00X1LKCyxMq102w2GSDKv9K0gpIQc37vbnM5zznm++/JR17rbj7xTfupTn/rv6idrP2lS4ibb4QAAAABJRU5ErkJggg==",
            tel: ""
          },
          {
            name: "中国交通银行",
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAAmCAMAAADeF2QjAAAAM1BMVEUAAAAANnoANnoANnoANnoANnoANnoANnoANnoANnoANnoANnoANnoANnoANnoANnoANnppupiKAAAAEHRSTlMAECAwQFBgcICPn6+/z9/vIxqCigAAAv1JREFUGBntwduu4zYMBdBNXWhKosT9/187jk8unjRugQLFPDRr4evr638q4Q/qhmtbz/gkC87EBP+GOA3XnIbfJOxkMBJOjAPI2htOelT8vTxJw7U0+taX4YkGHUHOhJcUHBgkAy+dkc2GD1wpQdJwpWwjuBt4Wtz6spiCEyepPjI7noyRsUguXKi8MUA2j3DFb5w7pwpearUCZVQVPBlndnOSFU/ayJ5H11Q3fGS8MdTgYSacFDd3zGUZT4NdpHJneFDuNLkZC16cdHMPkgWfGG/a4MMSnCk7NMiGB6NmkrGx4k7JETPD54q8Ku46OXmzhuIj42H25vzR8SLGKa3n2hUPToAtSBYcZJDaFgM+fAs6DjLITcemHLhi3PWEnRhvAi/J19TJihN3gCtWYsGPEQpyFYnuDMWhLC4W7NhxxUgq7nJwV3CSF+k4awvgWnQWvGxjhdI6wwQ3MwxU7Oi4YuSGp8pdwZkEZ8JJYgHXWsqCFydnZi1zMhLuaNhx4opxAZAW0QWAk8w4STMswgQPZssLzXywZN1wt5HsJFXmEtzRIAUkrhg3AIM7B1DJwJOZc2bIJLsKDs7DGp1BThzKInvF5BJIwgMNMoPEFWMBEg/NrJGGp1xKxk4ayYWDYFe0T5LRBYfqPQFwFpyNCmBw4YqxAIWH6e5cgg+SVsE/ygkfFMEVYwUQvBEgM+OSFDzlBEjBZ1JwkhN+FMGbzA5AuVMApjjQY5OYsBAaayiAGh7VpyuAuVbbYkbiqDR6obGYWwjNKz1SYWsr3M3X8sLiFh4VbwYTgGxWAEjDD/oyXVEsBo007LyhuU/PQKFIcYUb2WiMRmMxtxg094YifYaYw50itFjTwkfBG5lT8JBxx+K+VnRrk8YRCUAfGMO3IkBm1u5NlnFwGQeXsTa3Nmk+hozKSTWHd+bMzRt7q9PwTtpMeOfu6lJcNbs6WgMgw0duGTfmXrN7F9fe1HU03dxVNbu2PLzXjq1pQ1N1t9xkaHfP+CtRfH19ff1HfgFKwCwv2htnNwAAAABJRU5ErkJggg==",
            tel: ""
          },
          {
            name: "中国农业银行",
            img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAAmCAMAAADeF2QjAAAAY1BMVEUAAAAAAAAAnJYAAAAAnJYAAAAAnJYAAAAAnJYAAAAAnJYAAAAAnJYAAAAAnJYAAAAAnJYAAAAAnJYAAAAAnJYAAAAAnJYAAAAAnJYAAAAAnJYAAAAAnJYAAAAAnJYAAAAAnJbQe7Q2AAAAH3RSTlMAEBAgIDAwQEBQUGBgcHCAgI+Pn5+vr7+/z8/f3+/vdkdMmQAAA7VJREFUWMPtVtmyrCgQxB0UBUUFVCj+/yunUNteT8SZiIk7D7froaURyMqsRQj52te+9pdamlMpSfm/YJdzkDIEarxM/zg4Ap/oIfj6t7tY9p+AjwjuT+445A+vKhA/brPtqzvVw8Z/wXwpzYEuOeKXn9GLXlsAe50LTZU8HaTtNUwAXWPiUudHmXIET8kNnZQhbA90oBdixytW0G3brNBcr9zq2N23jDx4KhxjK1wTmesTppz6qDuSNbLDJ6KT7tKeCQ2wagc6ngc9MlcCDu7N5CBT0N+JQwZVdnIsAM1puDmnHWvwKPZeaiGM+DCbkTOmPA63sJzSglbovj7Rqx60EMeJGejJNmqaHtAJsNWdKaEahmhwc8apJKl6oXTxgs6POGO2m5j5ZCefngdWFSjmbLKjT8jHNoeaCbqhSOvEE3d3hiWuTcA66w6hkhYmlBDgLYdl8OQZnWICnPpNOm7Z2QpbIHdQp/IEw+DsRaXFhRWc4BW64ZK485QmcZZNrMVMfM2+IZj4mI0ZFxPjTsgNnYh1AlVV5xgBrNYngrLArBPJxXwCBsVRaY0odl9Ana+t03sdvJfhiY7EZ39wv6PH2N92CNs2otfsEA8lAMIsHtvvyiRFC7u0sdJQ+ahaa9d2h1dOiKezfqX8044WYv6vR9yVaypdOZYhokY1izYmhdbYECLLqsX8hMy2+LchmUh+RK/fsm4IgbyjF1PsrHi8ODoZxvUqXwW2Z0cOJMcD4479gTCt99AjusJibd4rzu8VV0vsslKW+8T8Af1qI7e01fdGm70WElEZOnrvhLEPiPVT1x5PoeVJeXgUPvvg7y8tS15nig/9Frn68o6O9W/+5Pe1Pj6rBzr++usTjxrkNE8pzXP8LdOS4IhQSss8LUuKr2maRs9LWsbV+b4gv7bFSYpXljwvyxR3lp8uD0g3GB77fbeFQ4hznlM/Br4NXg5+8J0hmBro4DxKGvtDRwMOYs6OnuJqGcogZ88JbvPcS06GZRlDaqQxC5f5nmFvRhH0Zia/pmPvH7jp/LJJg72fHugkEBnRF9+N23agh1CbbUGQIGPg5ICfLb/VxNDYPgK+iGct/vPNiS8n9sPVIvcmdNuIW9NwcPfSS4MUiFzG2dABO5WXG1I0I+pjwijxhjYuA0HegUe3xnmeA4nca9xsPP/pM4/hpE+uUU5qymVNa8IxhhIfssS7Z96RtJMpT3PekZrL/QWPqzlNZVwZC5jmESntuhQXlbxO8aiYBV/72tf+NvsHJZFZgnlmyBMAAAAASUVORK5CYII=",
            tel: ""
          },
        ],
        ali: [
          {name: "蚂蚁花呗", img: "../../../../static/img/payment_antIns.png"},
          {
            name: "支付宝",
            img: "data:image/png;base64,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"
          }
        ],
        radio: 0,
        antIns: [{pay: 0, month: 3, selected: true}, {pay: 0, month: 6, selected: false}, {
          pay: 0,
          month: 12,
          selected: false
        }],
        totalPrice: 0,
        type: 0,
      }
    },
    methods: {
      sureBuy() {
        var reform=[]
        if(this.type==1){
          reform.push( JSON.parse(sessionStorage.getItem('orderProduct')))
        }
        else{
          reform= JSON.parse(sessionStorage.getItem('orderProduct'))
        }
        let form = {
          "id": sessionStorage.getItem('orderId'),
          "products": reform,
          "receiver": JSON.parse(sessionStorage.getItem('receiver')),
          "payType":this.radio+1
        }
        var token = sessionStorage.getItem('accessToken');
        var url = this.$rootUrl + "/api/halo/orders/";
        const options = {
          method: 'POST',
          headers: {'access_token': token},
          url: url,
          data: form
        };
        this.$axios(options).then((res) => {
          if (res.data.data) {
            if (res.data.errorCode == 0) {
              this.$router.push({path: "/myOrder"});
            }
          }
        })
      },
      antInsSelected(index) {
        for (var i = 0; i < this.antIns.length; i++) {
          this.antIns[i].selected = false;

        }
        this.antIns[index].selected = true;
      },
      aliSelected(index) {

        if (index == 0) {
          this.antInsShow = true;
        }
        else
          this.antInsShow = false;
      },
      getData() {
        if (this.type == 1) {
          this.totalPrice = JSON.parse(sessionStorage.getItem('orderProduct')).total;
        }
        else if (this.type == 2) {
          var pros = JSON.parse(sessionStorage.getItem('orderProduct'));
          for (let i = 0; i < pros.length; i++) {
            this.totalPrice += pros[i].total
          }
        }
      }
    },
    computed: {
      pay3: function () {
        return this.antIns[0].pay = (this.totalPrice / this.antIns[0].month).toFixed(2);

      },
      pay6: function () {
        return this.antIns[1].pay = (this.totalPrice / this.antIns[1].month).toFixed(2);

      },
      pay12: function () {
        return this.antIns[2].pay = (this.totalPrice / this.antIns[2].month).toFixed(2);

      }

    },
    created() {
      this.type = this.$route.query.type
      this.getData()
    }
  }
</script>
<style>
  .paymentMsg {
    width: 100%;
    margin-bottom: 20px;
  }

  .payment_select {
    width: 95%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid #efefef;
    margin-top: 30px;
  }

  .payment_select .el-radio__input {
    position: relative;
    top: -15px;
    margin-right: 5px;
  }

  .payment_select_span {
    width: 70px;
    float: left;
    margin-right: 50px;
    margin-top: 10px;
  }

  .payment_aliSelect ul, .payment_bank ul, .payment_wechat ul {
    float: left;
  }

  .payment_ali li, .payment_bank li:not(:last-child) {
    float: left;
    margin-right: 50px;
  }

  .payment_antIns {
    position: relative;
    width: 600px;
    background-color: #f8f8f8;
    left: 50px;
    top: 20px;
  }

  .payment_antIns li {
    width: 160px;
    height: 50px;
    border-radius: 4px;
    border: 1px solid #DCDCDC;
    margin: 20px 0 20px 20px;
    cursor: pointer;
  }

  .payment_antIns_p {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .payment_ali, .payment_wechat, .payment_bank {
    margin: 50px 0 50px 50px;
  }

  .payment_computed {
    width: 254px;
    height: 318px;
    float: right;
    position: relative;
    right: 50px;
    top: 50px;
    line-height: 40px;
    color: #666;
  }

  .payment_computed > div p:first-child {
    float: left;
  }

  .payment_computed > div p:last-child {
    float: right;
  }

  .payment_button {
    height: 40px;
    float: right;
    margin-top: 5px;
  }
</style>
