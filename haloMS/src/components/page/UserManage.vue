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
                <el-input v-model="select_word" placeholder="通过用户id筛选" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="dataTable" ref="multipleTable" @selection-change="handleSelectionChange"
                      style="width: 100%" class="elTable">
                <el-table-column label="用户ID" prop="userId"></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="绑定手机" prop="phone"></el-table-column>
                <el-table-column label="绑定邮箱" prop="email"></el-table-column>
                <el-table-column label="创建时间" prop="createTime"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" @click="handleHonor(scope.$index,scope.row)">
                            封号
                        </el-button>
                        <el-button size="small" type="primary" @click="handleCancelHonor(scope.$index,scope.row)">
                            解除封号
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-count="pages">
                </el-pagination>
            </div>
        </div>

        <el-dialog title="提示" width="300px" center :visible.sync="honorVisible">
            <div>
                <p>
                    <lable>封号时长：</lable>
                    <el-select v-model="honor.time" placeholder="请选择">
                        <el-option
                                v-for="item in honorTimeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </p>
                <p>
                    <label>封号理由：</label>
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="honor.reason">
                    </el-input>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible=false" size="small">取 消</el-button>
                <el-button type="primary" @click="deleteRow" size="small">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示" width="300px" center :visible.sync="cancelHonorVisible">
            <div>
                <p>
                    <label>解除封号理由：</label>
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="cancelHonor.reason">
                    </el-input>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible=false" size="medium">取 消</el-button>
                <el-button type="primary" @click="deleteRow" size="medium">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage: 1,
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
                    {value:'2',label:'一周'},
                    {value:'3',label:'一个月'},
                    {value:'4',label:'一年'},
                    {value:'5',label:'永久'},
                ],
                honor:{
                    time:'',
                    reason:''
                },
                cancelHonor:{
                    reason:''
                }
            }
        },
        methods: {
            search(){
                var url = this.$rootUrl + "/api/ms/searchUser";
                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        key: this.select_word
                    }
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                if (item.errorCode == 0) {
                    this.dataTable = [];
                    this.dataTable.push(item.data.user);
                }
            })
            },
            // 分页导航
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getData();
            },
            getPages() {
                var url = this.$rootUrl + "/api/ms/getUserPage";
                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        pageSize: 10
                    }
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                if (item.errorCode == 0) {
                    this.pages = item.data.pages;
                }
            })
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
                if (item.errorCode == 0) {
                    this.dataTable = item.data.users;
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
            handleHonor(index, row){
                this.idx = index;
                this.honorVisible = true;
            },
            handleCancelHonor(index, row){
                this.idx = index;
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
        },
        created() {
            this.getPages()
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

    .el-button {
        height: 31px !important;
    }
    }
</style>
