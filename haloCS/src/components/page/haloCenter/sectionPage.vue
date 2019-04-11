<template>
    <div class="sectionPage">
        <center-header></center-header>
        <div class="sectionPage-container clearfix">
            <div class="section-container">
                <div class="section-header">
                    <h3>{{sectionName}}</h3>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            排序方式<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>默认排序</el-dropdown-item>
                            <el-dropdown-item>发帖时间</el-dropdown-item>
                            <el-dropdown-item>最新回复</el-dropdown-item>
                            <el-dropdown-item>热度</el-dropdown-item>
                        </el-dropdown-menu>

                    </el-dropdown>
                </div>
                <div class="section-list">
                    <div class="section-item" v-for="item in sectionList" @click="goRouter('/postDetail',item.topicId)">
                        <p class="section-item-title">{{item.title}}</p>
                        <div class="section-item-data">
                            <span>{{item.userName}}</span>
                            <span>回复：{{item.backNumber || 0}}</span>
                            <span>{{item.lastBack }} &nbsp;&nbsp;{{item.lastTime }}</span>
                        </div>
                    </div>
                </div>
                <div class="section-footer">
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
                typeId:1
            }
        },
        methods: {
            goRouter(item,id){
                this.$router.push({path: item, query: {topicId:id}});
            },
            getData(){
                this.typeId = this.$route.query.id || 1;
                this.sectionName = this.$route.query.name;
                const url = this.$rootUrl + "/api/forum/getTypePage";

                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        id: this.typeId,
                        pageSize:10,
                        pageNum:this.pageNum
                    }
                };

                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.code == 0) {
                        this.sectionList = item.data.topics;
                        this.total = item.data.count;
                    }
                })
            },
            handlePage(value){
                this.pageNum = value;
                this.getData();
            }
        },
        watch: {
            '$route'(to, from) {
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
        border-top: 1px solid #e6e6e6;

    .section-item {
        padding: 15px;
        border-bottom: 1px solid #e6e6e6;

    .section-item-title {
        cursor: pointer;
        font-weight: 500;
        color: #333;
    &:hover {
         color: #00a7ea;
     }
    }

    .section-item-data {
        margin-top: 5px;
        font-size: 14px;
        color: #666;

    span {
        padding: 0 15px;
        border-right: 1px solid #666;

    &:first-child {
        padding-left: 0;
    }

    &:last-child {
        border-right: 0;
    }

    }
    }
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