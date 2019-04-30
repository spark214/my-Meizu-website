<template>
    <div class="sectionPage">
        <center-header></center-header>
        <div class="sectionPage-container clearfix">
            <div class="section-container">
                <div class="section-header">
                    <h3><span v-if="typeId <= 0">搜索: </span>{{sectionName}}</h3>
                    <!--<el-dropdown @command="handleCommand">-->
                        <!--<span class="el-dropdown-link">-->
                            <!--排序方式<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                        <!--</span>-->
                        <!--<el-dropdown-menu slot="dropdown">-->
                            <!--<el-dropdown-item command="">默认排序</el-dropdown-item>-->
                            <!--<el-dropdown-item command="">发帖时间</el-dropdown-item>-->
                            <!--<el-dropdown-item command="">最新回复</el-dropdown-item>-->
                            <!--<el-dropdown-item command="hot">热度</el-dropdown-item>-->
                        <!--</el-dropdown-menu>-->

                    <!--</el-dropdown>-->
                </div>
                <div class="section-list" v-loading="loading">
                    <div class="section-item" v-for="item in sectionList" @click="goRouter('/postDetail',item.topicId)">
                        <div class="section-item-left">
                            <img :src="item.avatar" width="55px" height="55px" style="width: 55px;height: 55px;border: 1px solid #dcdcdc;border-radius: 5px" v-if="item.avatar">
                            <img src="https://image-res.mzres.com/img/download/uc/11/03/57/90/00/11035790/w100h100?t=1556275801" width="55px" height="55px" style="width: 55px;height: 55px;border: 1px solid #dcdcdc;border-radius: 5px" v-else>
                        </div>
                        <div class="section-item-right">
                            <p class="section-item-title">{{item.title}}</p>
                            <div class="section-item-data">
                                <span class="section-item-data-name">{{item.userName}}</span><i class="point" v-if="item.lastBack">&nbsp;</i>
                                <span v-if="item.lastBack">最后回复来自:{{item.lastBack }} &nbsp;&nbsp;{{item.lastTime }}</span>
                            </div>
                        </div>
                        <p :class="[{'section-item-data-backNumber':!item.backNumber},{'section-item-data-backNumber_have':item.backNumber}]">{{item.backNumber || 0}}</p>
                    </div>
                    <div class="unfound" v-if="sectionList.length == 0 && !loading">
                        <h3 v-if="typeId > 0">此版块暂无帖子，快去发表吧</h3>
                        <h3 v-if="typeId <= 0">搜索不到相关帖子</h3>
                        <img src="http://store.res.meizu.com/member/img/noData-31ec95ea89.png">
                    </div>
                </div>
                <div class="section-footer" v-if="sectionList.length > 0">
                    <el-pagination @current-change="handlePage" layout="total, prev, pager, next" :total="total" page-size="10">
                    </el-pagination>
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
    import SectionBoard from './common/sectionBoard.vue';
    import VFooter from './common/footer.vue';
    import Editor from './common/editor.vue';
    export default{
        components: {
            CenterHeader, VFooter, SectionBoard,Editor
        },
        data(){
            return {
                sectionName: '',
                sectionList: [],
                total:0,
                pageNum:1,
                typeId:1,
                loading:false
            }
        },
        methods: {
            goRouter(item,id){
                this.$router.push({path: item, query: {topicId:id}});
            },
            getData(){
                this.loading = true;
                this.typeId = this.$route.query.id;
                this.sectionName = this.$route.query.name;
                let url = '';
                let options ;
                if(this.typeId > 0){
                    url = this.$rootUrl + "/api/forum/getTypePage";

                    options = {
                        method: 'POST',
                        url: url,
                        data: {
                            id: this.typeId,
                            pageSize:10,
                            pageNum:this.pageNum
                        }
                    };
                }else{
                    url = this.$rootUrl + "/api/forum/searchTopic";

                    options = {
                        method: 'POST',
                        url: url,
                        data: {
                            key:this.sectionName,
                            pageSize:10,
                            pageNum:this.pageNum
                        }
                    };
                }

                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.code == 0) {
                        this.loading = false;
                        this.sectionList = item.data.topics;
                        this.total = item.data.count;
                    }else{
                        throw item.message;
                    }
                }).catch(errorMsg => {
                    this.$message.error(errorMsg);
                });
            },
            handlePage(value){
                this.pageNum = value;
                this.getData();
            }
        },
        watch: {
            '$route'(to, from) {
                this.pageNum = 1;
                this.getData();
            }
        },
        created(){
            this.getData();
        }
    }
</script>
<style lang="less">
    @import "../../common.less";

    .sectionPage {
        background-color: #f2f2f2 !important;

    .sectionPage-container {
        min-height: 730px;
        margin: auto;
        width: 1100px;

    .section-container {
        float: left;
        position: relative;
        margin: 20px auto;
        width: 716px;
        border: 1px solid #e6e6e6;
        background-color: #fff;
        padding: 0 15px 10px;
        box-shadow: 1px 1px 10px #e2e2e2;
        font-family: "微软雅黑", Arial, Helvetica, sans-serif;

    .section-header {
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #333;

    h3 {
        font-weight: 400;
    }

    .el-dropdown {
        margin-left: 80px;
        cursor: pointer;

    &:hover {
        color: #00a7ea;
    }

    }
    }
    .section-list {
        min-height: 100px;
        border-top: 1px solid #e6e6e6;

    .section-item {
        height: 50px;
        position: relative;
        padding: 15px;
        border-bottom: 1px solid #e6e6e6;

    .section-item-left{
        position: absolute;
        top:12px;
    }
    .section-item-right{
        position: absolute;
        left: 90px;
        top:17px;
    }

    .section-item-title {
        cursor: pointer;
        font-weight: 400;
        color: #777;
        width: 500px;
        overflow-x: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    &:hover {
         color: #00a7ea;
     }
    }

    .section-item-data {
        margin-top: 5px;
        font-size: 14px;
        color: #999;

    .section-item-data-name{
        display: inline-block;
        max-width: 90px;
        overflow-x: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        padding-left: 0;
    }

    .section-item-data-type{
        display: inline-block;
        background-color: #efefef;
        text-align: center;
        border-radius: 4px;
        padding: 0 10px;
        color: #999;
        font-size: 13px;
        margin-right: 10px;
    }
    span {
        vertical-align: middle;
        padding: 0 15px;

    &:last-child {
        border-right: 0;
    }

    }
    }
    .section-item-data-backNumber{
        position: absolute;
        right: 10px;
        top:30px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:#999;
        color: #FFFFFF;
        height: 20px;
        width: 40px;
        opacity: 0.7;
        border-radius: 10px;
        text-align: center;
    }
    .section-item-data-backNumber_have{
        background-color:#00a2d4;
        position: absolute;
        right: 10px;
        top:30px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        height: 20px;
        width: 40px;
        opacity: 0.7;
        border-radius: 10px;
        text-align: center;
    }


    .point {
        display: inline-block;
        width: 5px;
        height: 5px;
        background-color: #ccc;
        border-radius: 50%;
        position: relative;
        top:8px;
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
    .section-footer{
        text-align: right;
        margin-top: 20px;
    }
    }
    }
    .right {
        float: left;
    }

    }
</style>