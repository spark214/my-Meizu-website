<template>
    <div class="addressWrite clearfix">
        <el-form class="clearfix">
            <el-form-item label="收货人姓名" label-width="100px">
                <el-input auto-complete="off" style="width: 230px;" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="收货人电话" label-width="100px">
                <el-input auto-complete="off" style="width: 230px" v-model="form.phone"></el-input>
            </el-form-item>
            <!--<el-form-item label="收货人地址" label-width="100px">-->
            <!--<el-cascader size="large" :options="addressOptions" v-model="selectedOptions" @change="addressHandleChange"></el-cascader>-->
            <!--</el-form-item>-->
            <el-form-item label="收货详细地址" label-width="100px">
                <el-input auto-complete="off" v-model="form.address"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" class="write_button" @click="ok">确 定</el-button>
        <!--<el-checkbox v-model="form.checked" v-if="type==1" class="write_button" style="padding-top: 5px;">默认地址-->
        </el-checkbox>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                center>
            <span>地址列表数量已达上限，请管理地址列表</span>
            <span slot="footer" class="dialog-footer">
                 <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {regionData, CodeToText, TextToCode} from 'element-china-area-data';
    import bus from '../../../common/bus';
    import qs from 'qs';
    export default {
        props: {
            form: {id: "", name: "", phone: "", address: ""},
            type: "",
            length: 0
        },
        data() {
            return {
                addressOptions: regionData,
                selectedOptions: [],
                dialogVisible: false,
            }
        },
        methods: {
            check(){
                let regPhone = /^1[3|4|5|7|8]\d{9}$/;
                let regAddress = /.+?(省|市|自治区|自治州|县|区)/g;
                if(this.form.name == ''){
                    this.$message.error('请检查收货人姓名');
                    return false;
                }else if(!regPhone.test(this.form.phone)){
                    this.$message.error('请检查收货人电话');
                    return false;
                }else if(!regAddress.test(this.form.address)){
                    this.$message.error('请检查收货详细地址');
                    return false;
                }
                return true;
            },
            ok() {
                if(this.check()){
                    if (this.type != 0) {
                        if (this.length <= 10) {
                            if (this.type == 1 || this.type == 3) {
                                this.form.id = this.length + 1
                            }
                            var options;
                            if (this.type == 2 || this.type == 4) {
                                var url = this.$rootUrl + "/api/user/updateAddress";
                                options = {
                                    method: 'POST',
                                    url: url,
                                    data: this.form
                                };
                            }
                            else {
                                var url = this.$rootUrl + "/api/user/addAddress";
                                options = {
                                    method: 'POST',
                                    url: url,
                                    data: this.form
                                };
                            }
                            this.$axios(options).then((res) => {
                                let item = res.data.data;
                                if (item.id || item.errorCode == 0) {
                                    if (this.type <= 2) {
                                        this.$emit("ok", 1)
                                    }
                                    else {
                                        bus.$emit('dialogVisible', false);
                                    }
                                }else if (item.errorCode == 403) {
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
                        else {
                            this.dialogVisible = true
                        }
                    }
                }

            }
        }
    }
</script>
<style>
    .write_button {
        float: right;
        margin-left: 20px;

    }
</style>
