<template>
    <div class="myMessage">
        <div class="msg-header">
            我的消息
        </div>
        <div class="msg-item" v-for="item in message" v-loading="loading">
            <div class="msg-reply">
                <!--<img :src="item.avatar" width="48px" height="48px">-->
                <p class="msg-item-info clearfix">
                    <span class="msg-item-info-user">{{item.senderName}}</span> 回复了您的发表
                    <span class="msg-item-info-post" @click="goRouter('/postDetail',item.topicId)">{{item.title}}</span>
                    <span class="msg-item-info-btn" @click="goRouter('/postDetail',item.topicId)">查看</span>
                    <span class="msg-item-info-time">{{item.createTime}}</span>
                </p>
                <p class="table-reply">
                    <i class="el-icon-caret-top"></i>
                    <span @click="goRouter('/postDetail',item.topicId)">回复：{{item.content}}</span>
                </p>
            </div>
        </div>
        <div class="unfound" v-if="message.length === 0">
            <h3>您暂无消息，多去社区发表吧！</h3>
            <img src="http://store.res.meizu.com/member/img/noData-31ec95ea89.png">
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                message: [],
                loading:false
            }
        },
        methods:{
            goRouter(item,id){
                this.$router.push({path: item, query: {topicId:id}});
            },
            getData(){
                this.loading = true;
                const url = this.$rootUrl + "/api/forum/getMessage";

                const options = {
                    method: 'GET',
                    url: url,
                    data: {}
                };

                this.$axios(options).then((res) => {
                    let item = res.data.data;
                if (item.code == 0) {
                    this.message = item.data.backs;
                    this.loading = false;
                }
                })
            }
        },
        created(){
            this.getData();
            window.scroll(0, 0);
        }
    }
</script>
<style lang="less">
    @import "../../common.less";
    .myMessage {
        font-family: Helvetica,Tahoma,Arial,Hiragino Sans GB,Microsoft YaHei,SimSun,Heiti,sans-serif;

    .msg-header{
        font-size: 20px;
        color: #333;
        font-weight: 500;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 15px;
    }

    .msg-item {
        font-weight: 200;
        position: relative;
        padding: 20px;
        border-bottom: 1px solid #e6e6e6;

    &:hover{
        background-color: #f6fafd;
     }

    img {
        margin-right: 10px;
    }

    .msg-item-info {
        font-size: 15px;
        color: #666;
        width: 90%;

    .msg-item-info-post {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-weight: 400;
        display: inline-block;
        max-width: 400px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        position: relative;
        height: 20px;
        vertical-align: top;
        top: 1px;
        color: #aaa;
        cursor: pointer;
    }

    .msg-item-info-btn {
        margin-left: 15px;
        cursor: pointer;
    }
    .msg-item-info-time{
        float: right;
        position: relative;
        top:6px;
        color: #888;
    }
    .msg-item-info-user,.msg-item-info-btn,.msg-item-info-post{
        cursor: pointer;
        color: #888;

        &:hover{
        color: #666;
         }
    }

    }

    }
    .table-reply{
        cursor: pointer;
        position: relative;
        background-color: #f5f5f5;
        padding: 10px;
        margin-top: 10px;

    .el-icon-caret-top{
        font-size: 20px;
        position: absolute;
        top: -13px;
        left: 20px;
        color: #f5f5f5;
    }
    span{
        display: inline-block;
        max-width: 95%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    }
    .unfound{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height:400px;
    }
    .unfound h3{
        color: #666666;
        font-size: 24px;
        margin-bottom: 20px;

    }
    }
</style>
