<template>
    <div class="postManage">
        <!--<div class="crumbs">-->
            <!--<el-breadcrumb separator="/">-->
                <!--<el-breadcrumb-item>-->
                    <!--<i class="el-icon-goods"></i>-->
                    <!--社区管理-->
                <!--</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
        <!--</div>-->
        <div class="container">
            <div class="post-header">
                <el-input v-model="keyword" placeholder="" class="searchInput"></el-input>
                <el-button icon="search" @click="search" type="primary">搜索</el-button>
                <!--<el-button type="primary" @click="handleNew()" class="newBtn">发帖</el-button>-->
                <loader exportName="帖子列表"  :headMapping="headMapping"
                        :exportData="dataTable" class="loadBtn"></loader>
            </div>
            <el-table :data="dataTable" ref="multipleTable"
                      style="width: 100%" class="elTable">
                <el-table-column label="ID" prop="topicId"></el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="版块" prop="typeName"></el-table-column>
                <el-table-column label="用户ID" prop="userId"></el-table-column>
                <el-table-column label="用户名" prop="userName"></el-table-column>
                <el-table-column label="回复量" prop="backNumber">
                    <template slot-scope="scope">
                        {{scope.row.backNumber || 0}}
                        </template>
                </el-table-column>
                <el-table-column label="最后回复时间" prop="lastTime"></el-table-column>
                <el-table-column label="操作" min-width="100">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="getTopicDetail(scope.row.topicId,scope.row.typeName,scope.row.backNumber,scope.row.userName)">
                            查看
                        </el-button>
                        <el-button size="small" type="danger" @click="delTopic(scope.row.topicId)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="total" page-size="10">
                </el-pagination>
            </div>
        </div>
        <el-dialog :visible.sync="editorVisible" :title="editorTitle">
            <div class="editDialog-header" width="720px">
                <div class="editor-header-item">
                    <label>版块：</label>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="editor-header-item">
                    <lable>标题：</lable>
                    <el-input class="editor-item-titleInput"></el-input>
                </div>
            </div>
            <div>
                <editor></editor>
            </div>
            <div class="editor-footer">
                <el-button type="primary">提交</el-button>
                <el-button>取消</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="viewVisible" :title="查看帖子">
            <div class="viewDialog-header">
                <p class="view-title">{{view.title}}</p>
                <p class="view-info"><span>作者：{{view.userName}}</span><span> 版块: {{view.typeName}}</span><span>回复量：{{backTotal || 0}}</span><span>发帖时间：{{view.gmtCreate}}</span>
                </p>
                <div class="view-header-button">
                    <!--<el-button type="primary">编辑</el-button>-->
                    <el-button type="danger" @click="delTopic(view.topicId)">删帖</el-button>
                </div>
            </div>
            <div class="viewDialog-body">
                <p v-html="view.content"></p>
            </div>
            <div class="viewDialog-comment" >
                <h4>回复</h4>
                <div class="backPagination">
                    <el-pagination @current-change="handleBackPageChange" layout="total, prev, pager, next" :total="backTotal" page-size="10">
                    </el-pagination>
                </div>
                <div v-for="(item,index) in reply" class="comment-item" v-if="reply.length > 0">
                    <p class="comment-item-floor">F{{index+1}}</p>
                    <p class="comment-item-context" v-html="item.content"></p>
                    <p class="comment-item-info"><span>回复者：{{item.userName}}</span><span>回复时间：{{item.backTime}}</span><span class="comment-item-delReply" @click="delBack(item.backId)">删除该回复</span></p>
                </div>
                <p v-if="reply.length == 0" style="margin-left: 6px;color: #333333">暂无回复</p>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import editor from '../common/editor.vue';
    import loader from '../common/loader.vue';
export default{
    components:{
        editor,loader
    },
    data(){
        return{
            options: [
                {value: '1', label: '综合讨论'},
                {value: '2', label: '闲置交易'},
                {value: '3', label: '建议反馈'},
                {value: '4', label: '谈天说地'},
            ],
            keyword:'',
            dataTable:[],
            view: {},
            reply: [],
            editorVisible:false,
            editorTitle:'发布帖子',
            viewVisible:false,
            idx:-1,
            headMapping : [
                {header: '帖子ID', key: 'topicId'},
                {header: '标题', key: 'title'},
                {header: '版块ID', key: 'typeId'},
                {header: '版块名称', key: 'typeName'},
                {header: '用户头像', key: 'avatar'},
                {header: '用户ID', key: 'userId'},
                {header: '用户名', key: 'userName'},
                {header: '回复量', key: 'backNumber'},
                {header: '最后回复', key: 'lastBack'},
                {header: '最后活跃时间', key: 'lastTime'},
            ],
            validTableData:[],
            pageNum:1,
            total:0,
            backTotal:0,
            backPageNum:1
        }
    },
    methods:{
        handleCurrentChange(value){
            this.pageNum = value;
            this.getData();
        },
        handleBackPageChange(value){
            this.backPageNum = value;
            this.getBack();
        },
        handleEdit(index,row){
            this.idx = index;
            this.editorTitle = '编辑帖子';
            this.editorVisible = true;
        },
        handleNew(){
            this.editorTitle = '发布帖子';
            this.editorVisible = true;
        },
        getData(){
            const url = this.$rootUrl + "/api/ms/getTopicList";

            const options = {
                method: 'POST',
                url: url,
                data: {
                    pageNum:this.pageNum,
                    pageSize:10
                }
            };

            this.$axios(options).then((res) => {
                let item = res.data.data;
                if (item.code == 0) {
                    this.total = item.data.count;
                    this.dataTable = item.data.topics;
                }
            })
        },
        getTopicDetail(id,typeName,backNumber,userName){
            const url = this.$rootUrl + "/api/ms/getTopicDetail";

            const options = {
                method: 'POST',
                url: url,
                data: {
                    pageNum:this.backPageNum,
                    pageSize:10,
                    id:id
                }
            };

            this.$axios(options).then((res) => {
                let item = res.data.data;
                if (item.code == 0) {
                    this.view = item.data.topic;
                    this.view.typeName = typeName;
                    this.view.backNumber = backNumber;
                    this.view.userName = userName;
                    this.reply = item.data.backs;
                    this.backTotal = item.data.count;
                    this.viewVisible = true;
                }
            })
        },
        getBack(id){
            const url = this.$rootUrl + "/api/ms/topicBack";

            const options = {
                method: 'POST',
                url: url,
                data: {
                    pageNum:this.backPageNum,
                    pageSize:10,
                    id:id
                }
            };

            this.$axios(options).then((res) => {
                let item = res.data.data;
                if (item.code == 0) {
                    this.reply = item.data.backs;
                    this.backTotal = item.data.count;
                }
            })
        },
        search(){
            const url = this.$rootUrl + "/api/ms/searchTopic";

            const options = {
                method: 'POST',
                url: url,
                data: {
                    pageNum:this.pageNum,
                    pageSize:10,
                    keyword:this.keyword
                }
            };

            this.$axios(options).then((res) => {
                let item = res.data.data;
                if (item.code == 0) {
                    this.total = item.data.count;
                    this.dataTable = item.data.topics;
                }
            })
        },
        delTopic(id){
            this.$confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const url = this.$rootUrl + "/api/ms/delTopic";

                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        ids: id
                    }
                };

                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.code == 0) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getData();
                    }
                })
            })
        },
        delBack(id){
            this.$confirm('此操作将永久删除该回复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const url = this.$rootUrl + "/api/ms/delBack";

                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        ids: id
                    }
                };

                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.code == 0) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getBack(id);
                    }
                })
            })
        }
    },
    created(){
        this.getData();
    }
}
</script>
<style lang="less">
@import "common.less";
.postManage{
.post-header{
    position: relative;
    margin-bottom: 30px;

    .searchInput{
        width: 280px;
    }
    .newBtn{
        position: absolute;
        right: 0px;
    }
    .loadBtn{
        position: absolute;
        right: 0px;
        top:0px;
    }
}
.editDialog-header{
    margin-bottom: 20px;
    .editor-header-item{
        margin: 20px 0;

        .editor-item-titleInput{
            width: 550px;
        }

        &:first-child{
          margin-top: 0;
         }
    }
}

.editor-footer{
    margin-top: 20px;
    text-align: right;
}
    .viewDialog-header {
        position: relative;

        .view-title{
            margin: 10px 0;
            font-size: 18px;
            font-weight: bold;
        }
        .view-info{
            display: flex;
            flex-direction: row;

            span{
                color: #999;
                margin-right: 15px;
            }
        }
    .view-header-button{
        position: absolute;
        top: 10px;
        right: 0px;
    }
    }
.viewDialog-body{
    max-height: 300px;
    overflow-y: auto;
    margin: 15px 0;
    border: 1px solid #dddddd;
    border-radius: 3px;
    padding: 20px 10px;
}
.viewDialog-comment{
    position: relative;
    max-height: 350px;
    overflow-y: auto;
    margin: 20px 0;
    border-radius: 3px;
    border: 1px solid #dddddd;
    padding: 10px 5px;

    h4{
        margin-left: 3px;
        font-size: 18px;
        color: #bbb;
        margin-bottom: 10px;
    }
    .comment-item{
        border-top: 1px solid #dddddd;
        position: relative;
        padding: 10px 0;
        .comment-item-floor{
            font-size: 14px;
            color: #bbb;
            position: absolute;
            right: 10px;
            top:10px;
        }
       .comment-item-context{
           padding: 5px;
           padding-top: 0px;
           color: #666;
       }
       .comment-item-info{
           span{
               margin-left: 3px;
               margin-right: 10px;
               font-size: 12px;
               padding-bottom: 10px;
           }
           .comment-item-delReply{
               color: #409EFF;
               cursor: pointer;
           }
       }
    }
}
.backPagination{
    position: absolute;
    right: 20px;
    top: 5px;
}
}
</style>