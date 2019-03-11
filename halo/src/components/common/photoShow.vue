<template>
    <div class="contain_head_img">
        <img v-lazy="imgurl[picS][selectPic]" width="395px"
             class="img_preview">
        <ul>
            <li v-for="(pic,picIndex) in imgurl[picS]">
                <img v-lazy="pic"
                     width="75px" @click="changePic(picIndex)" :class="{selectPic:selectPic==(picIndex)}">
            </li>
        </ul>
    </div>
</template>
<style>
    .contain_head_img {
        position: relative;
        float: left;
        width: 40%;
        margin-left: 30px;
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
<script>
    import bus from './bus.js';

    export default {

        data() {
            return {
                common: [],
                selectPic: 0,
                imgurl: [],
                picS: 0
            }
        },
        methods: {
            changePic(index) {
                this.selectPic = (index);
            },
            getData() {
                var proId = this.$route.query.proId;
                var url = this.$rootUrl + "/api/product/productDetail";

                const options = {
                    method: 'POST',
                    url: url,
                    data: {
                        proId: proId
                    }
                };

                this.$axios(options).then((res) => {
                    let item = res.data.data;
                this.imgurl = new Array();
                var common = JSON.parse(item.data.itemDetail.specificationJson);
                for (let i = 0; i < common.imgUrl.length; i++) {
                    this.imgurl[i] = new Array(i);
                    this.imgurl[i] = common.imgUrl[i].split(',');

                }
                console.log(this.imgurl)

            })
            }

        },
        computed: {},
        created() {
            bus.$on("pic", msg => {
                this.picS = msg;
            })
            this.getData()
        },
        watch: {
            '$route'(to, from) {
                this.getData();
            }
        }
    }
</script>
