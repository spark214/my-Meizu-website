<template>
    <div class="newPost">
        <center-header></center-header>
        <div class="newPost-container">
            <div class="newPost-header">
                <p v-if="type == 1">发表帖子</p>
                <p v-if="type == 3">编辑帖子</p>
            </div>
            <div class="newPost-body">
                <div>
                    <el-select v-model="section" placeholder="请选择版块" v-if="haveSection === ''" :disabled="type == 3">
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.typeName"
                                :value="item.id">

                        </el-option>
                    </el-select>
                    <el-input class="titleInput" v-model="form.title" :clearable="true" :disabled="type == 3"></el-input>
                    <span class="numTips">还可输入{{80-form.title.length}}个字符</span>
                </div>
                <div class="newPost-editor">
                    <editor @newPost="newPost" :type="type" :reply="content"></editor>
                </div>
            </div>

        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import CenterHeader from './common/header.vue';
    import VFooter from './common/footer.vue';
    import Editor from './common/editor.vue';
    export default{
        components: {
            CenterHeader, VFooter, Editor
        },
        data(){
            return {
                form: {
                    title: "",
                    word: ""
                },
                options: [],
                section: '',
                haveSection:'',
                type:1,
                topicId:'',
                content:''
            }
        },
        methods: {
            goRouter(item){
                this.$router.push({path: item, query: {}});
            },
            newPost(msg){
                if(this.type == 1){

                    var url = this.$rootUrl + "/api/forum/newTopic";
                    const options = {
                        method: 'POST',
                        url: url,
                        data: {
                            content:msg,
                            title:this.form.title,
                            typeId:this.section
                        }
                    };
                    this.$axios(options).then((res) => {
                        let item = res.data.data;
                        if (item.code == 0) {
                            this.$message({
                                message: '发帖成功',
                                type: 'success'
                            });
                            this.$router.push({path: '/postDetail', query: {topicId:item.data}});
                        }else{
                            this.$alert(item.message, '失败', {
                                confirmButtonText: '返回首页',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.goRouter('/haloCenter');
                            }).catch((err) => {
                                this.$message.error(err);
                            });
                        }
                    })
                }else if(this.type == 3){
                    const date = new Date().toLocaleString();
                    msg += "<p style='margin-top: 20px;font-size: 14px;color: #999999'>修改于" + date + "</p>";
                    var url = this.$rootUrl + "/api/forum/updateTopic";
                    const options = {
                        method: 'POST',
                        url: url,
                        data: {
                            content:msg,
                            id:this.topicId
                        }
                    };
                    this.$axios(options).then((res) => {
                        let item = res.data.data;
                        if (item.code == 0) {
                            this.$router.push({path: '/postDetail', query: {topicId:this.topicId}});
                        }else{
                            this.$alert(item.message, '失败', {
                                confirmButtonText: '返回首页',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.goRouter('/haloCenter');
                            }).catch(() => {

                            });
                        }
                    })
                }
            },
            getType(){
                var url = this.$rootUrl + "/api/forum/getType";
                const options = {
                    method: 'GET',
                    url: url,
                    data: {}
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.code == 0) {
                        this.options = item.data;
                        this.$store.commit('TYPELIST',item.data);
                    }else {
                        throw item.message;
                    }
            }).catch(errorMsg => {
                    this.$message.error(errorMsg);
            });
            }
        },
        created(){
            this.type = this.$route.query.type || 1;
            if (this.type == 3) {
                this.topicId = this.$route.query.id;
                this.content = this.$store.state.updateTopic.content;
                this.section = this.$store.state.updateTopic.typeName;
                this.form.title = this.$store.state.updateTopic.title;
            }else{
                if(this.$store.state.typeList.length == 0){
                    this.getType();
                }else{
                    this.options = this.$store.state.typeList;
                }
            }
        }
    }
</script>
<style lang="less">
    @import "../../common.less";

    .newPost {
        background-color: #f2f2f2 !important;

    .newPost-container {
        margin: 20px auto;
        background-color: #fff;
        width: 1100px;

    .newPost-header {
        padding:20px 60px;


        p{
            font-size: 18px;
            font-weight: 500;
            color: #999;
        }
    }

    .newPost-body {
        padding:0 60px;

    .el-select {
        width: 150px;
        margin-right: 10px;
    }

    .titleInput {
        width: 500px;
    }

    .numTips {
        color: #999;
        font-size: 14px;
        margin-left: 20px;
    }

    .newPost-editor {
        margin-top: 20px;
    }

    }
    .newPost-footer{
        padding: 20px 60px;
    }
    }
    }
</style>