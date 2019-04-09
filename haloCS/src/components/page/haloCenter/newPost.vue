<template>
    <div class="newPost">
        <center-header></center-header>
        <div class="newPost-container">
            <div class="newPost-header">
                <p>发表帖子</p>
            </div>
            <div class="newPost-body">
                <div>
                    <el-select v-model="section" placeholder="请选择版块" v-if="haveSection === ''">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">

                        </el-option>
                    </el-select>
                    <el-input class="titleInput" v-model="form.title" :clearable="true"></el-input>
                    <span class="numTips">还可输入{{80-form.title.length}}个字符</span>
                </div>
                <div class="newPost-editor">
                    <editor @newPost="newPost"></editor>
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
                options: [
                    {value: '1', label: '综合讨论'},
                    {value: '2', label: '闲置交易'},
                    {value: '3', label: '建议反馈'},
                    {value: '4', label: '谈天说地'},
                ],
                section: '',
                haveSection:''
            }
        },
        methods: {
            newPost(msg){
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

                })
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