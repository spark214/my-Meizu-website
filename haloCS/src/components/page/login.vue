<template>
    <div id="login_wrap">
        <el-container>
            <el-main id="login_main">
                <el-container id="login_container">
                    <el-header id="login_container_header">
                        <div class="login_box_header">
                            <a style="margin-right: 20px" @click="accLogin=true;errormsg = ''" :class="{on:accLogin}">账号登录</a> |
                            <a style="margin-left: 20px" @click="accLogin=false;errormsg = ''" :class="{on:!accLogin}">验证码登录</a>
                        </div>
                    </el-header>
                    <el-container id="login_container_main">
                        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="form_main">
                            <el-form-item prop="phone">
                                <el-input v-model="loginForm.phone" placeholder="手机号"
                                          @change="verifyPhone()" :class="{'is-error':errormsg !== ''}"></el-input>
                                <p style="color:#f56c6c;font-size: 12px;position: absolute;top: 30px;">{{errormsg}}</p>
                            </el-form-item>
                            <el-form-item prop="loginPwd" v-show="accLogin">
                                <el-input placeholder="密码" type="password" v-model="loginForm.loginPwd"
                                          @keyup.enter.native="" :class="{'is-error':errormsg === '密码错误'}"></el-input>
                            </el-form-item>

                            <el-container id="login_container_mains" v-show="!accLogin">
                                <el-form :model="loginFormMsg" :rules="rules" ref="loginFormMsg">
                                    <el-form-item prop="code">
                                        <el-input v-model="loginFormMsg.code" placeholder="短信验证码"
                                                  @change="send"></el-input>
                                        <el-button @click="countDown" :class="{disabled:!canClick}" class="button_sms">
                                            {{content}}
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                            </el-container>

                            <v-code @codeAva="getAva" v-show="accLogin"></v-code>
                            <el-form-item>
                                <el-button type="primary" @click="check()" class="loginBtn">登录</el-button>
                            </el-form-item>
                            <el-form-item>
                                <a @click="goRouter('register')" class="loginButton">注册</a>
                            </el-form-item>
                        </el-form>

                    </el-container>

                </el-container>
            </el-main>
            <el-footer style=" height: 40px;">&copy;2018 Halo Telecom Equipment Co., Ltd. All rights reserved.
            </el-footer>
        </el-container>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible">
            <p>{{errormsg}}</p>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
    import vCode from "./register/common/vCode";
    import vSms from "./register/common/sms";
    import { JSEncrypt } from 'jsencrypt';
    import qs from 'qs';
    export default {
        data: function () {
            return {
                loginForm: {
                    phone: "",
                    pwd: "",
                    loginPwd:''
                },
                loginFormMsg: {
                    phone: "",
                    code: ''
                },
                rules: {
                    phone: [
                        {required: true, message: "请输入手机号码", trigger: "blur"}
                    ],
                    loginPwd: [
                        {required: true, message: "请输入密码", trigger: "blur"}
                    ],
                    sms: [
                        {required: true, message: '请输入短信验证码', trigger: "blur"}

                    ],

                },
                codeAva: false,
                accLogin: true,
                errormsg: "",
                content: '点击发送验证码',
                totalTime: 60,
                canClick: true,
                count: 0,
                dialogVisible: false,
                publicDer:''
            };
        },
        methods: {
            verifyPhone() {
                let data = this.loginForm.phone;
                const url = this.$rootUrl + "/api/user/loginVerifyPhone";
                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        phone: data
                    }
                };

                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.errorCode == 0) {
                        this.errormsg = '';
                    } else {
                        this.errormsg = item.msg;
                        this.$message.error('请检查账号');
                    }
                })
            },
            check(){
                if (this.accLogin) {
                    var encrypt = new JSEncrypt();
                    encrypt.setPublicKey(this.publicDer);
                    this.loginForm.pwd =  encrypt.encrypt(this.loginForm.loginPwd);
                    var url = this.$rootUrl + "/api/user/loginByPwd";
                    const options = {
                        method: 'POST',
                        url: url,
                        data: {
                            phone: this.loginForm.phone,
                            pwd: this.loginForm.pwd
                        }
                    };
                    this.$axios(options).then((res) => {
                        let item = res.data.data;
                            if (item.errorCode == 0) {
                                let userInfo = item.data.userinfo;
                                this.$store.commit('LOGIN', {
                                    username: userInfo.username,
                                    avatar: userInfo.avatar,
                                    phone:userInfo.phone,
                                    token:item.token
                                });
                                sessionStorage.setItem('token',item.token);
                                sessionStorage.setItem('userName',userInfo.username);
                                sessionStorage.setItem('avatar',userInfo.avatar);
                                sessionStorage.setItem('expireTime', (new Date().getTime() + 58 * 60 * 1000));
                                document.cookie = 'cart=; expires=' + new Date().toUTCString() ;
                                let pageHistory = sessionStorage.getItem('pageHistory');
                                if (pageHistory) {
                                    this.$router.push({path: pageHistory});
                                } else {
                                    this.$router.push({path: "/"});
                                }
                            }else {
                                this.errormsg = item.msg;
                                this.$message.error('请检查密码');
                            }
                    })
                } else {
                    var url = this.$rootUrl + "/api/user/loginByCode";
                    this.loginFormMsg.phone = this.loginForm.phone
                    const options = {
                        method: 'POST',
                        url: url,
                        data: this.loginFormMsg
                    };
                    this.$axios(options).then((res) => {
                        let item = res.data.data;
                            if (item.errorCode == 0) {
                                let userInfo = item.data.userinfo;
                                this.$store.commit('LOGIN',{
                                    username:userInfo.username,
                                    avatar:userInfo.avatar,
                                    phone:userInfo.phone,
                                    token:item.token
                                });
                                sessionStorage.setItem('token',item.token);
                                sessionStorage.setItem('userName',userInfo.username);
                                sessionStorage.setItem('avatar',userInfo.avatar);
                                sessionStorage.setItem('expireTime', (new Date().getTime() + 58 * 60 * 1000));
                                document.cookie = 'cart=; expires=' + new Date().toUTCString() ;
                                let pageHistory = sessionStorage.getItem('pageHistory');
                                if (pageHistory) {
                                    this.$router.push({path: pageHistory});
                                } else {
                                    this.$router.push({path: "/"});
                                }
                            }
                            else {
                                this.errormsg = item.msg;
                                this.$message.error('请检查验证码');
                            }
                    })

                }
            },
            getAva(msg) {
                this.codeAva = msg
            },
            goRouter(that) {
                this.$router.push({path: "/" + that});
            },
            countDown() {
                if (!this.canClick) return
                this.canClick = false;
                this.content = this.totalTime + "s后重新发送";
                this.count = 1;
                let clock = window.setInterval(() => {
                    this.totalTime--;
                    this.content = this.totalTime + "s后重新发送";
                    if (this.totalTime <= 0) {
                        window.clearInterval(clock);
                        this.content = '重新发送验证码';
                        this.totalTime = 60;
                        this.canClick = true;
                    }
                }, 1000)
                var phone = this.loginForm.phone;
                var url = this.$rootUrl + "/api/user/loginRequestSmsCode";
                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        phone: phone
                    }
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.data) {
                        if (item.errorCode != 0) {
                            this.errormsg = item.msg;
                            this.dialogVisible = true;
                        }
                    }
                })
            },
            publicKey(){
                var url = this.$rootUrl + "/api/user/publicKey";
                const options = {
                    method: 'GET',
                    url: url,
                    data: {}
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                if (item.errorCode == 0) {
                    this.publicDer = item.data;
                }
            })
            }
        },
        created(){
            this.publicKey();
        },
        components: {
            vCode, vSms
        }
    }
</script>
<style lang="less">
    #login_wrap {
        padding: 0;
        margin: 0;
        list-style: none;
        font-family: "微软雅黑", Arial, Helvetica, sans-serif;


    .el-container {
        position: relative;
    }

    #login_main {
        background: linear-gradient(to bottom, #f8fcff, #f8fcff, #f8fcff);
        min-height: 750px;
        max-height: 1080px;
        position: relative;
    }

    #login_main:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("http://img.tozlam.cn/login_banner.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;

    }

    #login_container {
        width: 350px;
        height: 420px;
        background: white;
        position: relative;
        top: 100px;
        left: 60%;
    }

    #login_container_header {
        height: 100px !important;
        color: #999;
        font-size: 16px;
        text-align: center;
        line-height: 120px;

    }

    #login_container_header a {
        color: #999;
        cursor: pointer;
    }

    .on {
        color: #32A5E7 !important;
    }

    .el-form-item{
        margin-bottom: 25px;
    }

    .el-input, .el-button {
        width: 300px;
        height: 36px;
    }

    #login_container_main {
        position: absolute;
        left: 50%;
        top: 65%;
        transform: translate(-50%, -50%);
        line-height: 40px;
    }

    .el-footer {
        bottom: 0;
        text-align: center;
        background-color: #ffffff;
        width: 100%;
        line-height: 40px;
        font-size: 12px;
    }

    @media screen and (max-width: 960px) {
        body {
            width: 1080px;
        }
    }

    .loginButton {
        position: relative;
        top: -10px;
        font-size: 14px;
        color: #409EFF;
        cursor: pointer;
    }

    .button_sms {
        margin-top: 20px;
    }

    .disabled {
        background-color: #ddd;
        border-color: #ddd;
        color: #57a3f3;
        cursor: not-allowed;
    }
    .loginBtn{
        height: 36px;
    }
    .is-error{
    .el-input__inner{
        border-color: #f56c6c!important;
    }
    }
    }
</style>
