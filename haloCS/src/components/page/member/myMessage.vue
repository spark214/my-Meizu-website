<template>
    <div class="myMessage">
        <div class="msg-header">
            我的消息
        </div>
        <div class="msg-item" v-for="item in message">
            <div class="msg-reply" v-if="item.type === 'reply'">
                <img :src="item.avatar" width="48px" height="48px">
                <span class="msg-item-info clearfix">
                    <span class="msg-item-info-user">{{item.user}}</span> 回复了您的帖子
                    <span class="msg-item-info-post" @click="goRouter">{{item.post}}</span>
                    <span class="msg-item-info-btn" @click="goRouter()">查看</span>
                    <span class="msg-item-info-time">{{item.time}}</span>
                </span>

            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                message: [
                    {
                        type: 'reply',
                        avatar: '//cdn.v2ex.com/gravatar/7c3d2db8337080adfccf106782b5b866?s=48&d=retro',
                        post: '欢迎来到halo社区欢迎来到halo社区欢迎来到halo社区欢迎来到halo社区欢迎来到halo社区',
                        user: "zijian",
                        time: "2019年3月12日"
                    }
                ]
            }
        },
        methods:{
            goRouter(){
                this.$router.push({path: "/postDetail", query: {}});
            },
            websocket () {
                let ws = new WebSocket('ws://123.207.121.122:8868/api/halo/user/1/message');
                ws.onopen = () => {
                    // Web Socket 已连接上，使用 send() 方法发送数据
                    console.log('数据发送中...')
                    ws.send('Holle')
                    console.log('数据发送完成')
                }
                ws.onmessage = evt => {
                    console.log('数据已接收...')
                }
                ws.onclose = function () {
                    // 关闭 websocket
                    console.log('连接已关闭...')
                }
                // 路由跳转时结束websocket链接
                this.$router.afterEach(function () {
                    ws.close()
                })
            }
        },
        created(){
            this.websocket();
        }
    }
</script>
<style lang="less">
    @import "../../common.less";
    .myMessage {

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
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

    .msg-item-info-post {
        display: inline-block;
        max-width: 400px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        position: relative;
        top: 5px;
        color: #999;
        cursor: pointer;
    }

    .msg-item-info-btn {
        margin-left: 15px;
        cursor: pointer;
    }
    .msg-item-info-time{
        float: right;
        position: relative;
        top: 5px;
        color: #999;
    }
    .msg-item-info-user,.msg-item-info-btn,.msg-item-info-post{
        cursor: pointer;
        color: #999;

        &:hover{
        color: #666;
         }
    }

    }

    }
    }
</style>
