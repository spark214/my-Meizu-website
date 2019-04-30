<template>
    <div class="contain_head_img">
        <img v-lazy="imgurl[picS][selectPic]" :key="imgurl[picS][selectPic]" width="395px" height="395px"
             class="img_preview">
        <ul>
            <li v-for="(pic,picIndex) in imgurl[picS]">
                <img v-lazy="pic" :key="pic"
                     width="75px" height="75px" @click="changePic(picIndex)" :class="{selectPic:selectPic == (picIndex)}">
            </li>
        </ul>
    </div>
</template>
<script>
    import bus from '../../../common/bus.js';

    export default {
        props:{
          imgurl:[]
        },
        data() {
            return {
                common: [],
                selectPic: 0,
                picS: 0,
                bigImg: '',
                source:''
            }
        },
        methods: {
            changePic(index) {
                this.selectPic = (index);
                this.bigImg = this.imgurl[this.picS][this.selectPic];
            },
            getData() {
                var CancelToken = this.$axios.CancelToken
                this.source = CancelToken.source()
                this.cancelRequest();
                var proId = this.$route.query.proId;
                var url = this.$rootUrl + "/api/product/productDetail";

                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        proId: proId
                    },
                    cancelToken: new this.$axios.CancelToken((c) => {
                        this.source = c;
                    })
                };

                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if (item.errorCode == 0) {
                        this.imgurl = new Array();
                        var common = JSON.parse(item.data.itemDetail.specificationJson);
                        for (let i = 0; i < common.imgUrl.length; i++) {
                            this.imgurl[i] = new Array(i);
                            this.imgurl[i] = common.imgUrl[i].split(',');
                        }
                    }
                })
            },
            cancelRequest(){
                if(typeof this.source ==='function'){
                    this.source('终止请求')
                }
            }
        },
        computed: {},
        mounted() {
//            this.getData();
            bus.$on("pic", msg => {
                this.picS = msg;
            });
        },
        watch: {
            '$route'(to, from) {
//                this.getData();
            }
        }
    }
</script>
<style lang="less">
    .contain_head_img {
        position: relative;
        margin-left: 30px;

    & > img {
        width: 395px !important;
        height: 395px !important;
    }

    }

    .contain_head_img ul {
        margin-left: 20px;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .contain_head_img ul li {
        display: inline;
        margin-right: 25px;
        cursor: pointer;
    }

    .contain_head_img ul li img {
        box-sizing: border-box;
    }

    .selectPic {
        border: 1px solid #dcdcdc;
    }
</style>
