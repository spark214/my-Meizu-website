<template>
    <div class="postDetail">
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
                                <p class="header-info-author">{{post.author}}</p>
                                <p class="header-info-right">
                                    <span class="header-info-postTime">{{post.postTime}}</span>
                                    <span class="header-info-view">{{post.view}}<i class="el-icon-view"></i></span>
                                    <span class="header-info-replyNum">{{post.replyNum}}<i
                                            class="el-icon-message"></i></span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="postDetail-body-context-body" v-html="post.context">
                    </div>
                    <div class="postDetail-body-context-footer">
                        <el-button type="primary">回复</el-button>
                    </div>
                </div>
                <div class="postDetail-body-reply clearfix">
                    <div class="postDetail-body-reply-header">
                        <span style="font-size: 24px">{{post.reply.length}} </span>条回复
                    </div>
                    <div class="postDetail-body-reply-item clearfix" v-for="(item,index) in post.reply">
                        <div class="body-reply-left">
                            <img :src="item.avatar">
                        </div>
                        <div class="body-reply-right">
                            <p class="body-reply-left-info"><span class="reply-left-info-userName">{{item.user}} </span><span
                                    class="reply-left-info-time">{{item.replyTime}} </span><span
                                    class="reply-left-info-position">{{index+1}}楼</span></p>
                            <p class="body-reply-left-context" v-html="item.context"></p>
                            <p class="body-reply-left-btn">
                                <span>回复</span>
                            </p>
                        </div>
                    </div>
                    <el-button class="body-reply-backBtn">返回列表</el-button>
                </div>
                <div class="postDetail-body-editor clearfix">
                    <editor></editor>
                    <el-button type="primary">发表评论</el-button>
                </div>

            </div>
            <div class="right">
                <section-board></section-board>
            </div>
        </div>
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
                post: {
                    title: "欢迎来到Halo社区",
                    author: 'halo user',
                    avatar: '//cdn.v2ex.com/gravatar/7c3d2db8337080adfccf106782b5b866?s=48&d=retro',
                    postTime: "30分钟前",
                    view: "1100",
                    replyNum: "200",
                    context: "<p>halo</p><p>center</p>",
                    reply: [
                        {
                            user: "zijian",
                            avatar: '//cdn.v2ex.com/gravatar/7c3d2db8337080adfccf106782b5b866?s=48&d=retro',
                            replyTime: "10分钟前",
                            context: "欢迎"
                        },
                        {
                            user: "mello",
                            avatar: '//cdn.v2ex.com/gravatar/7c3d2db8337080adfccf106782b5b866?s=48&d=retro',
                            replyTime: "9分钟前",
                            context: "欢迎+1"
                        },
                    ]
                }
            }
        },
        methods: {},
        created(){

        }
    }
</script>
<style lang="less">
    @import "../../common.less";

    .postDetail {
        position: relative;
        background-color: #f2f2f2 !important;

    .postDetail-coontainer {
        position: absolute;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        margin: 20px auto;
        width: 1100px;

    .postDetail-body {
        width: 750px;
        box-shadow: 1px 1px 10px #e2e2e2;
        float: left;
        margin: 10px;

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
        color: #999;
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
        float: left;
        margin-left: 20px;

    .body-reply-left-btn{
        color: #999;
        font-size: 14px;
        text-align: right;
        margin-top: 15px;
        cursor: pointer;
    }

    .body-reply-left-info {
        width: 640px;
        color: #666;
        margin-bottom: 8px;

    .reply-left-info-userName {
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
    }

    }

    }
    .body-reply-backBtn {
        margin-top: 15px;
      float:right;
    }
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