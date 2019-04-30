<template>
    <div class="editor">
        <vue-ueditor-wrap v-model="msg" :config="myConfig" @ready="editR"></vue-ueditor-wrap>
        <div class="editor-footer">
            <el-button type="primary" @click="postMsg" v-if="type == 1 || type == 3">发表帖子</el-button>
            <el-button type="primary" @click="postMsg" v-if="type == 2">发表评论</el-button>
        </div>
    </div>
</template>
<script>
    import VueUeditorWrap from 'vue-ueditor-wrap';
    import _ from 'lodash';

    export default{
        components: {
            VueUeditorWrap
        },
        props:{
            type:{
                type:Number,
                default:0
            },
            reply:{
                type:String
            },
            content:{
                type:String
            },
            clear:{
                type:Number
            }
        },
        data(){
            return{
                msg:'',
                url:'',
                myConfig: {
                    // 编辑器不自动被内容撑高
                    autoHeightEnabled: false,
                    // 初始容器高度
                    initialFrameHeight: 240,
                    // 初始容器宽度
                    initialFrameWidth: '100%',
                    // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                    serverUrl: '/proxy/ueditor',
                    // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                    UEDITOR_HOME_URL: '/static/UEditor/',
                    //工具栏
                    toolbars:[
                            ['bold','fontsize','indent','selectall', 'cleardoc','emotion','simpleupload','blockquote','source']
                    ],
                    //元素路径关闭
                    elementPathEnabled:false
                },
                imgArr:[]
            }
        },
        methods:{
            editR(ueditor){
                    ueditor.addListener('myImg',(link,title) => {
                            var url = this.$rootUrl + "/api/forum/handleImg";
                            const options = {
                                method: 'POST',
                                url: url,
                                data: {
                                    path:title
                                }
                            };
                            this.$axios(options).then((res) => {
                                let item = res.data.data;
                                if (item.errorCode == 0) {
                                    let t = title.toString();
                                    this.imgArr.push({
                                        title:t,
                                        url:item.data.imgUrl
                                    });
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
                    });
            },
            postMsg(){
                const expireTime = sessionStorage.getItem('expireTime');
                const nowTime = new Date().getTime();
                if(expireTime && nowTime < expireTime){
                    _.each(this.imgArr,item => {
                        this.msg = this.msg.replace(item.title,item.url);
                    });
                    this.$emit('newPost',this.msg);
                }else{
                    sessionStorage.setItem('pageHistory',this.$route.fullPath);
                    this.$router.push('/login');
                }
            }
        },
        created(){
            if(this.type == 3){
                this.msg = this.$store.state.updateTopic.content;
            }
        },
        watch:{
            reply:function(value){
                this.msg = value + "<br>";
            },
            clear:function (value) {
                this.msg = '';
            }
        }
    }
</script>
<style lang="less">
    @import "../../../common.less";
    .editor{
    .editor-footer{
        padding: 20px 0px;
    .el-button{
        margin-top: 0;
    }
    }
    }

</style>