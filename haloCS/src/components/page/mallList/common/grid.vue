<template>
    <div class="product-grid">
        <el-row :gutter="7">
            <el-col :span="6" v-for="(item,index) in item">
                <el-card shadow="hover" class="list_card">
                    <a>
                        <img width="220px" class="list_img" v-lazy="filterImg[index][selectPic[index]]" :key="filterImg[index][selectPic[index]]"
                             @click="goProduct(item.proId)">
                        <div class="list_colorchoose">
                            <ul class="clearfix">
                                <li v-for="(pic,picIndex) in  filterImg[index]" v-if="pic!==undefined">
                                    <img v-lazy="pic" :key="pic"
                                         width="39px" @click="selectPic.splice(index,1,picIndex)"
                                         :class="{selectPic:selectPic[index]==(picIndex)}">
                                </li>
                            </ul>
                        </div>
                        <div class="list_desc" @click="goProduct(item.proId)">
                            <p class="list_name">{{item.name}}</p>
                            <p class="list_title">{{item.title}}</p>
                            <p class="list_price"><span>￥ </span><span class="price_span">{{item.price}}</span> 起</p>
                        </div>
                    </a>
                </el-card>
            </el-col>
        </el-row>
        <div class="unfound" v-if="item.length == 0">
            <h3>暂无商品</h3>
            <img src="http://store.res.meizu.com/member/img/noData-31ec95ea89.png">
        </div>
        <el-pagination
                v-if="cateId == 0 && brandId == 0"
                layout="prev, pager, next"
                :page-count="6"
                @current-change="handleCurrentChange"
                class="grid_pagination"
                pager-count="4">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                item: [],
                pageIndex: 1,
                selectPic: [],
                cateId: 0,
                brandId:0
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getData(this.cateId);

            },
            goRouter(that) {
                this.$router.push({path: "/" + that});
            },
            goProduct(id) {
                if (id <= 10)
                    this.$router.push({path: "/mallProductPhone", query: {proId: id}})
                else
                    this.$router.push({path: "/mallProductOther", query: {proId: id}})
            },
            getData(cateId) {
                var url;
                var data = {};
                var brandId = this.$route.query.brandId;
                if (cateId == -1) {
                    var name = this.$route.query.name;
                    url = this.$rootUrl + "/api/product/searchProduct";
                    data = {name: name};
                }
                else if (cateId == 0) {
                    if (brandId !== undefined) {
                        url = this.$rootUrl + "/api/product/productByBrand";
                        data = {brand: brandId};
                    }
                    else {
                        url = this.$rootUrl + "/api/product/productList";
                        data = {page: this.pageIndex};
                    }

                }
                else {
                    if (brandId !== undefined) {
                        url = this.$rootUrl + "/api/product/productByCateNBrand";
                        data = {
                            brand: brandId,
                            cate: cateId
                        };
                    }
                    else {
                        url = this.$rootUrl + "/api/product/productByCate";
                        data = {cate: cateId};
                    }
                }
                const options = {
                    method: 'POST',
                    url: url,
                    data: data
                };

                this.$axios(options).then((res) => {
                    let item = res.data.data;
                    if(item.errorCode == 0){
                        if (item.data) {
                            this.item = item.data.items;
                            for (let i = 0; i < this.item.length; i++) {
                                this.selectPic[i] = 0
                            }
                            window.scroll(0, 0);
                        }
                    }else{
                        throw item.errorMsg;
                    }
                }).catch(errorMsg => {
                    this.$message.error(errorMsg);
                });
            }
        },
        computed: {
            filterImg() {
                let imgurl = new Array()
                for (let i = 0; i < this.item.length; i++) {
                    imgurl[i] = new Array(i)
                    let j = 0
                    let currindex = 0
                    let nextindex = this.item[i].imgUrl.indexOf(",", currindex)
                    while (nextindex > 0) {
                        imgurl[i][j] = this.item[i].imgUrl.slice(currindex, nextindex)
                        currindex = nextindex + 1
                        nextindex = this.item[i].imgUrl.indexOf(",", currindex)
                        j++
                    }
                    imgurl[i][j] = this.item[i].imgUrl.slice(currindex)
                }
                return imgurl
            }
            ,
        },
        created() {
            this.cateId = this.$route.query.cateId || 0;
            this.brandId = this.$route.query.brandId || 0;
            this.getData(this.cateId);
        },
        watch: {
            '$route'(to, from) {
                this.cateId = this.$route.query.cateId || 0;
                this.brandId = this.$route.query.brandId || 0;
                this.getData(this.cateId);
            }
        }
    }
</script>
<style lang="less">
    .product-grid {

    .list_colorchoose ul {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }

    .list_colorchoose li {
        border: 0.5px solid #dcdcdc;
        border-radius: 3px;
        margin-right: 10px;
        width: 40px;
        height: 40px;
    }

    .list_colorchoose li img {
        margin-left: 1px;
    }

    .list_card {
        position: relative;
        width: 303px;
        height: 400px;
        text-align: center;
        margin-top: 10px;
        cursor: pointer;
    }

    .list_desc {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        line-height: 28px;
    }

    .list_title {
        color: #999;
        font-size: 12px;
    }

    .list_name {
        color: #333;
        font-size: 14px;
    }

    .list_price {
        color: #c00;
    }

    .list_price span {
        font-size: 14px;
    }

    .price_span {
        font-size: 22px !important;
    }

    .grid_pagination {
        display: flex;
        justify-content: center;
        background-color: transparent;
        margin-top: 20px;
    }

    .unfound {
        margin-top: 20px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 400px;
    }

    .unfound h3 {
        color: #666666;
        font-size: 24px;
        margin-bottom: 20px;

    }

    }
</style>
