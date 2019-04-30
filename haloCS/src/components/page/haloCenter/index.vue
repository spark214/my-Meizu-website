<template>
    <div class="sectionPage">
        <center-header></center-header>
        <div class="sectionPage-container clearfix">
            <div class="section-container">
                <div class="section-header">
                    <h3>社区新帖</h3>
                </div>
                <div class="section-list" v-loading="loading">
                    <div class="section-item" v-for="item in sectionList">
                        <div class="section-item-left">
                            <img :src="item.avatar" width="55px" height="55px" style="width: 55px;height: 55px;border: 1px solid #dcdcdc;border-radius: 5px" v-if="item.avatar">
                            <img src="https://image-res.mzres.com/img/download/uc/11/03/57/90/00/11035790/w100h100?t=1556275801" width="55px" height="55px" style="width: 55px;height: 55px;border: 1px solid #dcdcdc;border-radius: 5px" v-else>
                        </div>
                        <div class="section-item-right">
                            <p class="section-item-title"  @click="goRouter('/postDetail',item.topicId)">{{item.title}}</p>
                            <div class="section-item-data">
                                <span class="section-item-data-type" @click="goType(item.typeId,item.typeName)">{{item.typeName}}</span><i class="point">&nbsp;</i>
                                <span class="section-item-data-name">{{item.userName}}</span><i class="point" v-if="item.lastBack">&nbsp;</i>
                                <span v-if="item.lastBack" @click="goRouter('/postDetail',item.topicId)">最后回复来自:{{item.lastBack }} &nbsp;&nbsp;{{item.lastTime }}</span>
                            </div>
                        </div>
                        <p :class="[{'section-item-data-backNumber':!item.backNumber},{'section-item-data-backNumber_have':item.backNumber}]"  @click="goRouter('/postDetail',item.topicId)">{{item.backNumber || 0}}</p>
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
    import Editor from './common/editor.vue';
    export default{
        components: {
            CenterHeader, VFooter, SectionBoard,Editor
        },
        data(){
            return {
                sectionName: '闲置交易',
                sectionList: [],
                loading:false
            }
        },
        methods: {
            goType(id,name){
                this.$router.push({path: '/centerSection', query: {id:id,name:name}});
            },
            goRouter(item,id){
                this.$router.push({path: item, query: {topicId:id}});
            },
            getData(){
                this.loading = true;
                var url = this.$rootUrl + "/api/forum/getAllTopic";
                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        pageSize:10,
                        pageNum:1
                    }
                };
                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.code == 0) {
                        this.sectionList = item.data.topics;
                        this.loading = false;
                    }else{
                        throw item.message;
                    }
            }).catch(errorMsg => {
                    this.$message.error(errorMsg);
            });
            }
        },
        created() {
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
        min-height: 400px;
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
        margin-top: 6px;
        font-size: 14px;
        color: #999;
    .section-item-data-name{
        display: inline-block;
        max-width: 90px;
        overflow-x: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }

    .section-item-data-type{
        cursor: pointer;
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
        cursor: pointer;
        vertical-align: middle;
        padding: 0 15px;

    &:last-child {
         border-right: 0;
     }

    }
    }
    .section-item-data-backNumber{
        cursor: pointer;
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
        cursor: pointer;
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
    }
    }
    }
    .right {
        float: left;
    }

    }
</style>