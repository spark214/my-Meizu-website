<template>
    <div class="haloCenter ">
        <center-header userName="halo user"></center-header>
        <div class="index-container clearfix">
            <div class="hot-container">
                <div class="hot-header ">
                    社区热帖
                </div>
                <div class="hot-body clearfix">
                    <div class="hot-item clearfix" v-for="item in postList">
                        <div class="hot-item-title" @click="goRouter('/postDetail')">{{item.title}}</div>
                        <span class="hot-item-user">{{item.user}}</span>
                        <span class="hot-item-dataNum">
                            <span>{{item.view}}<i class="el-icon-view"></i></span>
                            <span>{{item.reply}}<i class="el-icon-message"></i></span>
                        </span>
                    </div>
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
    export default{
        name: "haloCenter",
        components: {
            CenterHeader, VFooter,SectionBoard
        },
        data(){
            return {
                searchKey: '',
                postList: [
                    {title: 'Halo社区欢迎您', user: "halo user", view: 10086, reply: 310},
                    {title: 'Halo社区欢迎您', user: "halo user", view: 10086, reply: 310},
                    {title: 'Halo社区欢迎您', user: "halo user", view: 10086, reply: 310},
                    {title: 'Halo社区欢迎您', user: "halo user", view: 10086, reply: 310},
                    {title: 'Halo社区欢迎您', user: "halo user", view: 10086, reply: 310},
                    {title: 'Halo社区欢迎您', user: "halo user", view: 10086, reply: 310},
                    {title: 'Halo社区欢迎您', user: "halo user", view: 10086, reply: 310},
                    {title: 'Halo社区欢迎您', user: "halo user", view: 10086, reply: 310},
                    {title: 'Halo社区欢迎您', user: "halo user", view: 10086, reply: 310},
                    {title: 'Halo社区欢迎您', user: "halo user", view: 10086, reply: 310},
                ],


            }
        },
        methods: {
            goRouter(item){
                this.$router.push({path: item, query: {}});
            }
        },
        created(){

        }
    }
</script>
<style lang="less">
    @import "../../common.less";

    .haloCenter {
        background-color: #f2f2f2 !important;

    .hot-container {
        float: left;
        position: relative;
        margin: 10px auto;
        /*margin-left: 300px;*/
        width: 716px;
        border: 1px solid #e6e6e6;
        background-color: #fff;
        padding: 0 15px 10px;
        box-shadow: 1px 1px 10px #e2e2e2;
        font-family: "微软雅黑", Arial, Helvetica, sans-serif;

    .hot-header {
        height: 50px;
        display: flex;
        align-items: center;
        font-size: 18px;
        color: #333;
    }

    .hot-body {
        border-top: 1px solid #e6e6e6;
        padding-top: 15px;
        width: 700px;
        margin: auto;

    .hot-item {
        float: left;
        margin-bottom: 15px;
        width: 340px;
        height: 50px;

    .hot-item-user {
        margin-right: 20px;
        font-size: 13px;
        color: #999;
        width: 75px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .hot-item-title {
        cursor: pointer;
        font-size: 15px;
        color: #333;
        overflow: hidden;
        width: 310px;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 5px;

    &:hover {
        color: #00a7ea;
    }

    }
    .hot-item-dataNum {
        float: right;
        margin-right: 30px;
        font-size: 13px;
        color: #999;

    i {
        margin-left: 2px;
    }

    span:first-child {
        margin-right: 10px;
    }

    }
    &:nth-child(even) {
        margin-left: 15px;
    }

    }
    }

    }
    .right {
        float: left;
    }

    .index-container{
        margin: auto;
        width: 1100px;
    }
    }
</style>