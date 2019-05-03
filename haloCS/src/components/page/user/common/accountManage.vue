<template>
    <div class="accountManage">
        <div class="pageContain_section">
            <div class="section_main clearfix">
                <img :src="avatar" width="100px" @mouseenter="showEdit=true" @mouseout="showEdit=false">
                <span class="editPortrait" v-show="showEdit" @mouseenter="showEdit=true" @mouseout="showEdit=false"
                      @click="editPortrait">编辑头像</span>
                <div class="section_main_desc">
                    <p>{{userinfo.username}}</p>
                    <p class="section_main_desc_account">账号 : <span>{{userinfo.phone}}</span></p>
                </div>
            </div>

            <div class="section_safety clearfix">
                <div class="safety_header clearfix">
                    <h3 class="safety_title">账号安全</h3>
                    <h3 class="safety_level">安全等级 <span> {{userinfo.securityLevel}}</span>
                        <i class="el-icon-question" style="cursor: pointer" @click="dialogVisible = true"></i>
                    </h3>
                </div>
                <div class="safety_box">
                    <div class="safety_password clearfix">
                        <div v-show="pwdStep==0" class=" safety_div">
                            <p class="safety_left">密码</p>
                            <p class="safety_right" @click="pwdStep=1">修改</p>
                        </div>


                        <div class="mail_update" v-show="pwdStep!=0" style="background-color: white;border-top: none">
                            <div class="mail_first" v-show="pwdStep==1">
                                <h4 class="mail_title">验证手机</h4>
                                <v-sms :type="1" @ok="checkPhonePwd"></v-sms>

                                <el-button @click="pwdStep=0" style="width: 298px;margin-top: 10px;margin-bottom: 30px">
                                    取消
                                </el-button>
                                </el-form>
                            </div>

                            <div v-show="pwdStep==2">
                                <el-form :model="pwdForm" :rules="rules" ref="pwdForm" class="mailForm">
                                    <el-form-item prop="old">
                                        <el-input v-model="pwdForm.oldPwd" style="width: 298px" placeholder="当前密码"
                                                  type="password"></el-input>
                                    </el-form-item>
                                    <el-form-item prop="new">
                                        <el-input v-model="pwdForm.newPwd" style="width: 298px" placeholder="新密码"
                                                  type="password"></el-input>
                                        <span style="font-size: 12px;line-height: 20px;color: #666;margin-left: 8px;">新密码长度为 8-16 位，至少包含字母、数字和符号中的两种类型且不可与当前密码相同</span>
                                    </el-form-item>
                                    <p><el-button type="primary" @click="updatePwd" style="width: 298px">提交</el-button></p>
                                    <p><el-button @click="pwdStep=0" style="width: 298px">取消</el-button></p>
                                </el-form>
                            </div>
                        </div>
                    </div>

                    <div class="safety_mail clearfix">
                        <div class=" safety_div" v-show="mailStep==0">
                            <p class="safety_left">邮箱</p>
                            <span class="have" v-if="mailForm.old!=''">
                                <p>{{filterMail}}</p>
                                <p>已验证，可通过邮箱找回密码</p>
                            </span>
                            <p class="safety_right" @click="mailStep=2" v-if="mailForm.old!=''">修改</p>
                            <p class="safety_right" @click="mailStep=2" v-if="mailForm.old==''">添加</p>
                        </div>

                        <div class="mail_update" v-show="mailStep!=0">
                            <div class="mail_first" v-show="mailStep==1">
                                <h4 class="mail_title">修改邮箱第一步</h4>
                                <el-form :model="mailForm" :rules="rules" ref="mailForm" class="mailForm">
                                    <el-form-item prop="old">
                                        <span class="label">当前邮箱</span> <span>{{filterMail}}</span>
                                    </el-form-item>
                                    <el-form-item prop="sms1">
                                        <el-input v-model="mailForm.sms1" placeholder="邮件验证码" style="width: 15%"></el-input>
                                        <el-button @click="countDown(0)"
                                                   :class="[{disabled:!canClick},{button_sms:canClick}]">{{content}}
                                        </el-button>
                                    </el-form-item>
                                    <el-button type="primary" @click="mailStep=2" style="width: 298px">下一步</el-button>
                                    <el-button @click="mailStep=0" style="width: 15%">取消</el-button>
                                </el-form>
                            </div>
                            <div class="mail_second" v-show="mailStep==2">
                                <h4 class="mail_title">修改邮箱</h4>
                                <el-form :model="mailForm" :rules="rules" ref="mailForm" class="mailForm">
                                    <el-form-item prop="new">
                                        <span>
                                            <el-input type="text" v-model="mailForm.new" placeholder="新邮箱" style="width: 298px">
                                            </el-input>
                                        </span>
                                    </el-form-item>
                                    <el-form-item prop="sms2">
                                        <el-input v-model="mailForm.sms2" placeholder="邮件验证码" style="width:180px"></el-input>
                                        <el-button @click="countDown(1)"
                                                   :class="[{disabled:!canClick},{button_sms:canClick}]"
                                                   class="AMbutton">
                                            {{content}}
                                        </el-button>
                                    </el-form-item>
                                    <p><el-button type="primary" @click="updateEmail()" style="width: 298px">保存</el-button></p>
                                    <p><el-button @click="mailStep=0" style="width: 298px">取消</el-button></p>
                                </el-form>
                            </div>
                        </div>

                    </div>
                    <div class="safety_phone clearfix ">
                        <div class="safety_div" v-show="phoneStep==0">
                            <p class="safety_left">手机号码</p>
                            <span class="have">
                                <p>{{filterPhone}}</p>
                                <p>已验证，可通过手机找回密码</p>
                            </span>
                            <p class="safety_right" @click="phoneStep=1">修改</p>
                        </div>

                        <div class="mail_update" v-show="phoneStep!=0" style="border-bottom: none">
                            <div class="mail_first" v-show="phoneStep==1">
                                <h4 class="mail_title">验证密码</h4>
                                <el-form :model="phoneForm" :rules="rules" ref="phoneForm" class="mailForm">
                                    <el-form-item prop="sms1">
                                        <el-input type="password" v-model="pwd" placeholder="验证密码" style="width: 298px"></el-input>
                                    </el-form-item>
                                    <p><el-button type="primary" @click="checkPwd"  style="width: 298px">下一步</el-button></p>
                                    <p><el-button @click="phoneStep=0"  style="width: 298px">取消</el-button></p>
                                </el-form>
                            </div>

                            <div class="mail_second" v-show="phoneStep == 2">
                                <h4 class="mail_title">验证手机</h4>
                                <v-sms :type="1" @ok="checkPhone"></v-sms>
                                <el-button @click="phoneStep==0" style="width: 298px;margin-top: 10px;margin-bottom: 30px">
                                    取消
                                </el-button>
                            </div>

                            <div class="mail_second" v-show="phoneStep == 3">
                                <h4 class="mail_title">修改手机</h4>
                                <el-form :model="mailForm" :rules="rules" ref="mailForm" class="mailForm">
                                    <el-form-item prop="new">
                                        <span>
                                            <el-input type="text" v-model="phoneForm.new" @change="phoneChange" style="width: 298px" placeholder="新手机号码"></el-input>
                                        </span>
                                    </el-form-item>
                                    <v-sms :type="2" :phone="phoneForm.new" @ok="checkPhone"></v-sms>
                                </el-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                center>
            <span>设置密码+20，验证邮箱+20，绑定手机号+30，设置密保问题+30，账号安全等着你拿100满分哦</span>
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
    import qs from 'qs';
    import vSms from "../../register/common/sms";
    import { JSEncrypt } from 'jsencrypt';

    export default {
        props:{
            reload:{
                type:Number,
                default:0
            }
        },
        data() {
            return {
                updateMail: true,
                mailForm: {
                    old: "",
                    new: "",
                    sms1: "",
                    sms2: ""
                },
                phoneForm: {
                    old: "",
                    new: ""
                },
                pwdForm: {
                    oldPwd: "",
                    newPwd: ""
                },
                content: '点击发送验证码',
                totalTime: 60,
                canClick: true,
                mailStep: 0,
                pwdStep: 0,
                phoneStep: 0,
                showEdit: false,
                dialogVisible: false,
                userinfo: {},
                avatar: "",
                pwd: "",
                publicDer:''
            }
        },
        components: {
            vSms
        },
        methods: {
            getCookie(name) {
                var strcookie = document.cookie;//获取cookie字符串
                var arrcookie = strcookie.split("; ");//分割
//遍历匹配
                for (var i = 0; i < arrcookie.length; i++) {
                    var arr = arrcookie[i].split("=");
                    if (arr[0] == name) {
                        return arr[1];
                    }
                }
                return "";
            },
            updatePwd() {
                if(this.pwdForm.newPwd !== this.pwdForm.oldPwd) {
                    var reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,16}$/;
                    if (reg.test(this.pwdForm.newPwd)) {
                        var encrypt = new JSEncrypt();
                        encrypt.setPublicKey(this.publicDer);
                        this.pwdForm.newPwd = encrypt.encrypt(this.pwdForm.newPwd);
                        var url = this.$rootUrl + "/api/user/updatePwd";
                        const options = {
                            method: 'POST',
                            url: url,
                            data: {
                                data: this.pwdForm,
                            }
                        };
                        this.$axios(options).then((res) => {
                            let item = res.data.data;
                            if (item.errorCode == 0) {
                                this.$message({
                                    message: '密码修改成功',
                                    type: 'success'
                                });
                                this.pwdStep = 0;
                            } else if (item.errorCode == 403) {
                                sessionStorage.setItem('pageHistory', this.$route.fullPath);
                                this.$router.push({path: "/login"});
                                throw item.msg;
                            } else {
                                throw item.msg;
                            }
                        }).catch(errorMsg => {
                            this.$message.error(errorMsg);
                        })
                    } else {
                        this.$message.error('新密码不符合规范，请检查！');
                    }
                }else{
                    this.$message.error('新密码不可与当前密码相同，请检查！');
                }
            },
            phoneChange() {
                this.$router.push({path: '/user', query: {phone: this.phoneForm.new}});
            },
            checkPhonePwd(msg) {
                if (msg == 1) {
                    this.pwdStep = 2;
                    this.publicKey();
                }
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
            },
            checkPhone(msg) {
                if (msg == 1) {
                    this.phoneStep = 3;
                }
                else if (msg == 2) {
                    this.phoneStep = 0;
                    this.getData();
                }
            },
            checkPwd() {
                var url = this.$rootUrl + "/api/user/verifyPwd";
                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        pwd: this.pwd,
                    }
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                        if (item.errorCode == 0) {
                            this.phoneStep = 2
                            this.$router.push({path: '/user', query: {phone: this.phoneForm.old}});
                        } else if (item.errorCode == 403) {
                            sessionStorage.setItem('pageHistory', this.$route.fullPath);
                            this.$router.push({path: "/login"});
                            throw item.msg;
                        } else {
                            throw item.msg;
                        }
                }).catch(errorMsg => {
                    this.$message.error(errorMsg);
                });
            },
            updateEmail() {
                var token = sessionStorage.getItem('accessToken');
                let form = {"email": this.mailForm.new, "code": this.mailForm.sms2}
                var url = this.$rootUrl + "/api/user/updateEmail";
                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        data: form,
                        token: token
                    }
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                        if (item.errorCode == 0) {
                            this.getData();
                            this.mailStep = 0;
                            this.$message({
                                message: '邮箱设置成功',
                                type: 'success'
                            });
                        } else if (item.errorCode == 403) {
                            sessionStorage.setItem('pageHistory', this.$route.fullPath);
                            this.$router.push({path: "/login"});
                            throw item.msg;
                        } else {
                            throw item.msg;
                        }
                }).catch(errorMsg => {
                    this.$message.error(errorMsg);
                });

            },
            updatePhone() {
                let form = {"phone": this.phoneForm.new, "code": this.mailForm.sms2}
                var url = this.$rootUrl + "/api/user/updatePhone";
                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        data: form
                    }
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                        if (item.errorCode == 0) {
                            this.getData();
                            this.mailStep = 0;
                            this.$message({
                                message: '手机更新成功',
                                type: 'success'
                            });
                        } else if (item.errorCode == 403) {
                            sessionStorage.setItem('pageHistory', this.$route.fullPath);
                            this.$router.push({path: "/login"});
                            throw item.msg;
                        } else {
                            throw item.msg;
                        }
                }).catch(errorMsg => {
                    this.$message.error(errorMsg);
                });

            },
            countDown(item) {
                if (!this.canClick) return
                this.canClick = false
                this.content = this.totalTime + "s后重新发送"
                this.count = 1
                let clock = window.setInterval(() => {
                    this.totalTime--
                    this.content = this.totalTime + "s后重新发送"
                    if (this.totalTime <= 0) {
                        window.clearInterval(clock)
                        this.content = '重新发送验证码'
                        this.totalTime = 60
                        this.canClick = true
                    }
                }, 1000)
                let token = sessionStorage.getItem('accessToken');
                let params = {
                    token: token
                };
                if (item == 0) {
                    params.data = this.mailForm.old
                } else {
                    params.data = this.mailForm.new
                }
                let url = this.$rootUrl + "/api/user/requestEmailVerify";
                const options = {
                    method: 'POST',
                    url: url,
                    data: params
                };
                this.$axios(options).then((res) => {
                    if (res.data.data) {
                        if (res.data.errorCode != 0) {

                        }
                    }
                })
            },
            editPortrait() {
                this.$emit('edit', '3');
            },
            getData() {
                var url = this.$rootUrl + "/api/user/userData";
                const options = {
                    method: 'POST',
                    url: url,
                    data: {}
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.errorCode == 0) {
                        this.userinfo = item.data.userinfo
                        this.mailForm.old = item.data.userinfo.email
                        this.phoneForm.old = item.data.userinfo.phone
                        this.$router.push({path: '/user', query: {phone: this.phoneForm.old}});
                        if (this.userinfo.avatar == "//" || this.userinfo.avatar == "") {
                            this.avatar = "https://image-res.mzres.com/img/download/uc/11/03/57/90/00/11035790/w100h100?t=1556275801"
                        }
                        else {
                            this.avatar = this.userinfo.avatar
                        }
                    } else if (item.errorCode == 403) {
                        sessionStorage.setItem('pageHistory', this.$route.fullPath);
                        this.$router.push({path: "/login"});
                        throw item.msg;
                    } else {
                        throw item.msg;
                    }
            }).catch(errorMsg => {
                    this.$message.error(errorMsg);
            });
            }
        },
        computed: {
            filterMail() {
                if (this.mailForm.old === undefined) {
                    return null;
                }
                var mail = this.mailForm.old.replace(/(.{2}).+(.{2}@.+)/g, '$1****$2')
                return mail;
            },
            filterPhone() {
                var phone = this.phoneForm.old.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
                return phone;
            }
        },
        mounted() {
            this.getData()
        },
        watch: {
            '$route'(to, from) {
                this.getData();
            },
            reload:function (msg) {
                window.scroll(0, 0);
                this.getData();
            }
        }
    }
</script>
<style lang="less">
    .accountManage {

    .pageContain_section {
        margin-top: 20px;
        margin-left: 20px;
        width: 100%;
    }

    .section_main {
        position: relative;
    }

    .section_main img {
        float: left;
        margin-left: 10px;
        width: 100px;
        height: 100px;
    }

    .editPortrait {
        position: absolute;
        top: 80px;
        left: 10px;
        width: 100px;
        height: 20px;
        background-color: rgba(50, 50, 50, .5);
        color: #fff;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        z-index: 100;
    }

    .section_main_desc {
        float: left;
        position: relative;
        left: 20px;
        line-height: 30px;
    }

    .section_main_desc_account {
        color: #666666;
        font-size: 14px;
    }

    .section_safety {
        width: 100%;
    }

    .safety_header {
        margin-top: 30px;
        border-bottom: 0.5px solid #dcdcdc;
        line-height: 30px;
        color: #666666;
    }

    .safety_title {
        float: left;
        font-weight: normal;
        margin-bottom: 10px;
        margin-left: 10px;
    }

    .safety_level {
        float: right;
        font-weight: normal;
        margin-right: 50px;
    }

    .safety_box {
        line-height: 40px;
        font-size: 14px;
        color: #666;
        margin-top: 10px;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 0.5px solid #DCDCDC;
    }

    .safety_left {
        float: left;
        width: 100px;
    }

    .safety_right {
        float: right;
        position: relative;
        right: 50px;
        color: #00a7ea;
        cursor: pointer;
    }

    .safety_right:not(:nth-child(2)) {
        top: -50px;
    }

    .safety_div {
        margin-left: 10px;
        height: 75px;
    }

    .have {
        position: relative;
        left: 50px;
        top: 10px;
        line-height: 25px;
        width: 300px;
    }

    .have p:first-child {
        font-weight: bold;
        width: 300px;
    }

    .have p:last-child {
        color: #999;
        width: 300px;
    }

    .label {
        display: inline-block;
        width: 100px;
    }

    .mailForm {
        margin-top: 20px;
        padding-bottom: 20px;
    }

    .mail_update {
        margin-left: 10px;
        border-top: 0.5px solid #DCDCDC;
        border-bottom: 0.5px solid #DCDCDC;
    }

    .mail_title {
        margin-top: 10px;
    }

    .AMbutton {
        /*width: 50px !important;*/
    }

    }
</style>
