<template>
    <div class="usermanage">
        <!--<div class="crumbs">-->
            <!--<el-breadcrumb separator="/">-->
                <!--<el-breadcrumb-item>-->
                    <!--<i class="el-icon-star-on"></i>-->
                    <!--用户管理-->
                <!--</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
        <!--</div>-->
        <div class="container">
            <div class="order_handleBox">
                <el-input v-model="select_word" placeholder="" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="dataTable" ref="multipleTable" @selection-change="handleSelectionChange"
                      style="width: 100%" class="elTable">
                <el-table-column label="用户ID" prop="userId"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="绑定手机" prop="phone"></el-table-column>
                <el-table-column label="绑定邮箱" prop="email"></el-table-column>
                <el-table-column label="状态" prop="status"></el-table-column>
                <el-table-column label="创建时间" prop="createTime"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" @click="handleHonor(scope.row.userId)" v-if="scope.row.status == '正常'" style="width: 80px">
                            封号
                        </el-button>
                        <el-button size="small" type="primary" @click="handleCancelHonor(scope.row.userId)" v-if="scope.row.status == '封禁'">
                            解除封号
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="total" page-size="10">
                </el-pagination>
            </div>
        </div>

        <el-dialog title="封号" width="300px" :visible.sync="honorVisible">
            <div class="honorDialog-item">
                <p>
                    <lable>封号时长：</lable>
                    <el-select v-model="honorParams.time" placeholder="请选择" style="width: 260px">
                        <el-option
                                v-for="item in honorTimeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </p>
                <p class="honorDialog-item">
                    <label>封号理由：</label>
                    <el-input
                            size="small"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="honorParams.reason">
                    </el-input>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="honorVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="settleHonor" size="small">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="解除封号" width="300px" :visible.sync="cancelHonorVisible">
            <p>是否确认解除该用户封号状态？</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelHonorVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="cancelHonor()" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import _ from 'lodash';
    export default {
        data() {
            return {
                currentPage: 1,
                total:0,
                select_cate: '',
                select_word: '',
                honorVisible: false,
                cancelHonorVisible: false,
                dataTable: [],
                form: {
                    id: '',
                    name: '',
                    description: '',
                    price: '',
                    stock: '',
                    type: '',
                    createtime: '',
                    lastupdate: ''
                },
                idx: -1,
                multipleSelection: [],
                del_list: [],
                pages: 0,
                honorTimeOptions:[
                    {value:'1',label:'一天'},
                    {value:'7',label:'一周'},
                    {value:'30',label:'一个月'},
                    {value:'365',label:'一年'},
                    {value:'99999',label:'永久'},
                ],
                honorParams: {
                    userId:'',
                    reason: '',
                    duration: '',
                    status: -1,
                    time:''
                },
                cancelHonorParams:{
                    userId:'',
                    status:0
                }
            }
        },
        methods: {
            search(){
                this.currentPage = 1;
                if(this.select_word !== ''){
                    var url = this.$rootUrl + "/api/ms/searchUser";
                    const options = {
                        method: 'POST',
                        url: url,
                        data: {
                            key: this.select_word,
                            pageNum:this.currentPage,
                            pageSize:10
                        }
                    };
                    this.$axios(options).then((res) => {
                        let item = res.data.data;
                        if (item.code && item.code == 0) {
                            this.dataTable = item.data.users;
                            this.total = item.data.count;
                        }else if(item.erroeCode == '403'){
                            this.$message.error(item.msg);
                            sessionStorage.setItem('pageHistory',this.$route.fullPath);
                            this.$router.push({path: '/login'});
                        }else{
                            this.$message.error(item.message);
                        }
                    })
                }else{
                    this.getData();
                }
            },
            // 分页导航
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },
            getData() {
                var url = this.$rootUrl + "/api/ms/getUser";
                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        pageIndex: this.currentPage,
                        pageSize: 10
                    }
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                if (item.code && item.code == 0) {
                    this.dataTable = item.data.users;
                    this.total = item.data.count;
                }else if(item.erroeCode == '403'){
                    this.$message.error(item.msg);
                    sessionStorage.setItem('pageHistory',this.$route.fullPath);
                    this.$router.push({path: '/login'});
                }else{
                    this.$message.error(item.message);
                }
            })
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.dataTable[index];
                this.editVisible = true;
            },
            saveEdit() {
                this.$set(this.dataTable, this.idx, this.form);
                this.editVisible = false;
                this.$message.success("修改" + this.form.id + "成功");
            },
            handleHonor(id){
                this.honorParams.userId = id;
                this.honorVisible = true;
            },
            handleCancelHonor(id){
                this.cancelHonorParams.userId = id;
                this.cancelHonorVisible = true;
            },
            deleteRow(){
                var id = this.dataTable[this.idx].userId
                var url = this.$rootUrl + "/api/ms/delUser";
                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        id: id
                    }
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                if (item.errorCode == 0) {
                    this.delVisible = false;
                    this.$message.success("删除成功");
                    this.getData();
                }else if(item.erroeCode == '403'){
                    this.$message.error(item.msg);
                    sessionStorage.setItem('pageHistory',this.$route.fullPath);
                    this.$router.push({path: '/login'});
                }else{
                    this.$message.error(item.message);
                }
            })
            },
            deleteSelected(){
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            settleHonor(){
                if(this.honorParams.time == ''){
                    this.$message.error('请输入封号时长');
                }else if(this.honorParams.reason == ''){
                    this.$message.error('请输入封号理由');
                }else{
                    this.honorParams.duration = this.afterDate(parseInt(this.honorParams.time)) + " 23:59:59";
                    var url = this.$rootUrl + "/api/ms/settleUserStatus";
                    const options = {
                        method: 'POST',
                        url: url,
                        data: this.honorParams
                    };
                    this.$axios(options).then((res) => {
                        let item = res.data.data;
                        if (item.code && item.code == 0) {
                            _.each(this.dataTable,item => {
                                if(item.userId == this.honorParams.userId){
                                    item.status = '封禁';
                                }
                            });
                            this.$message.success("封号成功");
                            this.honorVisible = false;
                            this.honorParams = {
                                userId:'',
                                reason: '',
                                duration: '',
                                status: -1,
                                time:''
                            };
                        }else if(item.erroeCode == '403'){
                            this.$message.error(item.msg);
                            sessionStorage.setItem('pageHistory',this.$route.fullPath);
                            this.$router.push({path: '/login'});
                        }else{
                            this.$message.error(item.message);
                        }
                    })
                }

            },
            cancelHonor(){
                var url = this.$rootUrl + "/api/ms/settleUserStatus";
                const options = {
                    method: 'POST',
                    url: url,
                    data: this.cancelHonorParams
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.code && item.code == 0) {
                        _.each(this.dataTable,item => {
                            if(item.userId == this.cancelHonorParams.userId){
                                item.status = '正常';
                            }
                        });
                        this.$message.success("解除封号成功");
                        this.cancelHonorVisible = false;
                        this.cancelHonorParams = {
                            userId: '',
                            status: 0
                        };
                    }else if(item.erroeCode == '403'){
                        this.$message.error(item.msg);
                        sessionStorage.setItem('pageHistory',this.$route.fullPath);
                        this.$router.push({path: '/login'});
                    }else{
                        this.$message.error(item.message);
                    }
                })
            },
            afterDate(num) {
                var d = new Date();
                d.setTime(d.getTime() + num * 3600 * 24 * 1000);

                var myyear = d.getFullYear();
                var mymonth = d.getMonth() + 1;
                var myweekday = d.getDate();

                if (mymonth < 10) {
                    mymonth = "0" + mymonth;
                }
                if (myweekday < 10) {
                    myweekday = "0" + myweekday;
                }
                return (myyear + "-" + mymonth + "-" + myweekday);
            }
        },
        created() {
            this.getData()
        },
        computed: {
            GMTToStrCreate() {
                for (let i = 0; i < this.dataTable.length; i++) {
                    let date = new Date(this.dataTable[i].gmtCreate)
                    let Str = date.getFullYear() + '-' +
                            (date.getMonth() + 1) + '-' +
                            date.getDate() + ' ' +
                            date.getHours() + ':' +
                            date.getMinutes() + ':' +
                            date.getSeconds()
                    return Str
                }
            },
            GMTToStrUpdate() {
                for (let i = 0; i < this.dataTable.length; i++) {
                    let date = new Date(this.dataTable[i].gmtUpdate)
                    let Str = date.getFullYear() + '-' +
                            (date.getMonth() + 1) + '-' +
                            date.getDate() + ' ' +
                            date.getHours() + ':' +
                            date.getMinutes() + ':' +
                            date.getSeconds()
                    return Str
                }
            }
        }
    }
</script>
<style lang="less">
    @import "common.less";
    .usermanage {

    .order_handleBox {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }


    .order_form .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .honorDialog-item{
        margin-top: 15px;
        label{
            margin-bottom: 5px;
        }
        &:first-child{
        margin-top: 0;
         }
    }

    }
</style>
