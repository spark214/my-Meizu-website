<template>
    <div class="postDetail" id="postDetail">
        <center-header></center-header>
        <div class="postDetail-coontainer clearfix">
            <div class="postDetail-body">
                <div class="postDetail-body-context">
                    <div class="postDetail-body-context-header clearfix">
                        <div class="body-context-header-left">
                            <img :src="post.avatar" width="60px" height="60px">
                        </div>
                        <div class="body-context-header-right">
                            <p class="title">{{post.title}}</p>
                            <div class="header-info clearfix">
                                <p class="header-info-author">{{post.userName}}</p>
                                <p class="header-info-right">
                                    <span class="header-info-postTime">{{post.updateTime}}</span>
                                    <!--<span class="header-info-view">{{post.view}}<i class="el-icon-view"></i></span>-->
                                    <span class="header-info-replyNum"> <i class="el-icon-message"></i> {{post.backNumber || 0}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="postDetail-body-context-body" v-html="post.content">
                    </div>
                    <div class="postDetail-body-context-footer">
                        <el-button type="primary" @click="update(post.topicId)" v-if="userName == post.userName">编辑</el-button>
                        <el-button type="primary" @click="topicBack">回复</el-button>
                        <el-button type="danger" @click="delTopic" v-if="userName == post.userName">删除</el-button>
                        <el-button class="body-reply-backBtn" @click="goRouter('/centerSection',post.typeId,post.typeName)" v-if="!post.backList || post.backList.length === 0">返回列表</el-button>
                    </div>
                </div>
                <div class="postDetail-body-reply clearfix" v-if="post.backList && post.backList.length > 0">
                    <div class="postDetail-body-reply-header">
                        <span style="font-size: 24px">{{post.backList.length}} </span>条回复
                    </div>
                    <div class="postDetail-body-reply-item clearfix" v-for="(item,index) in post.backList">
                        <div class="body-reply-left">
                            <img :src="item.avatar" width="40px" height="40px">
                        </div>
                        <div class="body-reply-right">
                            <p class="body-reply-left-info"><span class="reply-left-info-userName">{{item.userName}} </span>
                                <span class="reply-left-info-time">{{item.backTime}} </span>
                                <span class="reply-left-info-position">{{index+1}}楼</span></p>
                            <p class="body-reply-left-context" v-html="item.content"></p>
                            <p class="body-reply-left-btn">
                                <span @click="replyBack(item.userId,item.userName,item.content)">回复</span>
                            </p>
                        </div>
                    </div>
                    <div class="postDetail-body-footer">
                        <el-button class="body-reply-backBtn" @click="goRouter('/centerSection')">返回列表</el-button>
                        <el-pagination @current-change="handlePage" layout="total, prev, pager, next" :total="total" page-size="10">
                        </el-pagination>
                    </div>
                </div>
                <div class="postDetail-body-editor clearfix">
                    <editor type="2" :reply="quote" @newPost="newBack"></editor>
                </div>

            </div>
            <div class="right">
                <section-board></section-board>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import _ from 'lodash';
    import CenterHeader from './common/header.vue';
    import VFooter from './common/footer.vue';
    import SectionBoard from './common/sectionBoard.vue';
    import Editor from './common/editor.vue';
    export default{
        components: {
            CenterHeader, VFooter, Editor, SectionBoard
        },
        data(){
            return {
                post: {},
                reply:{
                    content:'',
                    userId:[]
                },
                quote:'',
                userName:'',
                total:0,
                pageNum:1
            }
        },
        methods: {
            handlePage(value){
                this.pageNum = value;
                this.getData();
            },
            goRouter(item, id, name){
                this.$router.push({path: item, query: {id: id, name: name}});
            },
            getData(){
                const topicId = this.$route.query.topicId;
                const url = this.$rootUrl + "/api/forum/getTopicDetail";

                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        id: topicId,
                        pageSize:10,
                        pageNum:this.pageNum
                    }
                };

                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.code == 0) {
                        this.post = item.data;
                        this.total = item.data.backNumber;
                        this.quote = '';
                        this.reply = {
                            content:'',
                            userId:[]
                        };
                        if(this.post.avatar == ''){
                            this.post.avatar = '../../../../../static/img/user.png';
                        }
                    }
                })
            },
            replyBack(userId,userName,content){
                content = content.replace(/<blockquote(([\s\S])*?)<\/blockquote>/g, "");
                content = content.replace(/(\n)/g, "");
                content = content.replace(/(\t)/g, "");
                content = content.replace(/(\r)/g, "");
                content = content.replace(/<\/?[^>]*>/g, "");
                content = content.replace(/\s*/g, "");
                this.quote = '<blockquote style="display: block;background: #f0f0f0;padding: 10px;font-size: 14px;color: #666;max-height: 100px;margin-bottom: 10px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"><font size="2" color="#999">' + userName + ':</font><br>' + content + '</blockquote>';
                this.reply.userId.push(userId);
                const div = document.getElementById('postDetail');
                window.scroll(0, div.scrollHeight);
            },
            topicBack(){
                this.quote = '';
                this.reply.userId = [];
                const div = document.getElementById('postDetail');
                window.scroll(0, div.scrollHeight);
            },
            newBack(msg){
                this.reply.userId.push(this.post.userId);
                const url = this.$rootUrl + "/api/forum/newBack";

                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        topicId:this.post.topicId,
                        content:msg,
                        receivers:this.reply.userId
                    }
                };

                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.code == 0) {
                        this.getData();
                        this.quote = '';
                        this.reply = {
                            content:'',
                            userId:[]
                        };
                    }else{
                        this.$alert(item.message, '失败', {
                            confirmButtonText: '确认',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {

                        }).catch(() => {

                        });
                    }
                })
            },
            update(id){
                let newContent = this.post.content.replace(/<p style='margin-top: 20px;font-size: 14px;color: #999999'(([\s\S])*?)<\/p>/g, "");
                const list = {
                    typeName:this.post.typeName,
                    title:this.post.title,
                    content:newContent
                }
                this.$store.commit('UPDATETOPIC',list);
                this.$router.push({path: '/newPost', query: {id:id,type:3}});
            },
            delTopic(){
                this.$confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const url = this.$rootUrl + "/api/forum/delTopic";

                    const options = {
                        method: 'POST',
                        url: url,
                        data: {
                            id:this.post.topicId
                        }
                    };

                    this.$axios(options).then((res) => {
                        let item = res.data.data;
                        if (item.code == 0) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.$route.go(-1);
                        }
                    })
                })
            }
        },
        watch: {
            '$route'(to, from) {
                this.getData();
                window.scroll(0, 0);
            }
        },
        created(){
            this.getData();
            this.userName = sessionStorage.getItem('userName');
            window.scroll(0, 0);
        }
    }
</script>
<style lang="less">
    @import "../../common.less";

    .postDetail {
        position: relative;
        background-color: #f2f2f2 !important;

    .postDetail-coontainer {
        /*position: absolute;*/
        /*top: 80px;*/
        /*left: 50%;*/
        /*transform: translateX(-50%);*/
        min-height: 700px;
        margin: 20px auto;
        width: 1100px;

    .postDetail-body {
        width: 750px;
        box-shadow: 1px 1px 10px #e2e2e2;
        float: left;
        margin: 10px;
        margin-top:0;

    .postDetail-body-context {
        background-color: #fff;

    .postDetail-body-context-header {
        padding: 20px;

    .body-context-header-left {
        float: left;
    }

    .body-context-header-right {
        width: 630px;
        float: left;
        padding-left: 20px;

    .title {
        font-size: 24px;
    }

    .header-info {
        position: relative;
        width: 100%;
        justify-content: space-between;
        margin-top: 5px;
        color: #666;

    .header-info-author {
        cursor: pointer;
        color: #00a0e9;
        font-weight: bold;
        display: inline-block;
        float: left;
    }

    .header-info-right {
        color: #dcdcdc;
        float: right;
        position: relative;
        top: -2px;
        display: inline-block;

    span {
        margin-left: 10px;
    }

    i {
        margin-left: 5px;
    }

    }

    }
    }
    }
    .postDetail-body-context-body {
        padding: 20px;
        word-wrap: break-word;
        word-break: break-all;
        color: #777;
        line-height: 32px;
    }

    .postDetail-body-context-footer {
        text-align: right;
        padding: 20px;
        padding-top: 0;
    }

    }
    .postDetail-body-reply {
        background-color: #fff;
        margin-top: 10px;
        padding: 20px;

    .postDetail-body-reply-header {
        font-size: 18px;
    }

    .postDetail-body-reply-item {
        position: relative;
        padding: 20px 0;
        border-bottom: 1px solid #e6e6e6;

    .body-reply-left {
        float: left;
    }

    .body-reply-right {
        width: 620px;
        float: left;
        margin-left: 10px;

    .body-reply-left-btn{
        width: 650px;
        color: #999;
        font-size: 14px;
        text-align: right;
        margin-top: 15px;
        cursor: pointer;
    }

    .body-reply-left-info {
        width: 650px;
        color: #666;
        margin-bottom: 8px;

    .reply-left-info-userName {
        position: relative;
        cursor: pointer;
        font-weight: 600;
        color: #00a0e9;
    }

    .reply-left-info-time {
        color: #999;
        font-size: 14px;
        margin-left: 10px;
    }

    .reply-left-info-position {

        color: #999;
        font-size: 14px;
        float: right;
    }

    }
    .body-reply-left-context {
        line-height: 32px;
        color: #666;
    }

    }

    }
    .body-reply-backBtn {
        /*margin-top: 15px;*/
      float:right;
    }
    }
    .postDetail-body-footer{
        margin-top: 15px;
    }
    .postDetail-body-editor{
        margin-top: 10px;
        background-color: #fff;
        padding: 20px;

        .el-button{
            float:right;
            margin-top: 15px;
        }
    }
    }
    .right {
        float: left;
    }

    }
    }
</style>