<template>
  <div>
    <el-row :gutter="7">
      <el-col :span="6" v-for="(item,index) in item">
        <el-card shadow="hover" class="list_card" >
          <a >
            <img width="220px" class="list_img" v-lazy="filterImg[selectPic]" @click="goRouter('mallCart')">
            <div class="list_colorchoose">
              <ul class="clearfix">
                <li v-for="(pic,picIndex) in  filterImg">
                  <img v-lazy="pic"
                       width="39px" @click="selectPic=picIndex" :class="{selectPic:selectPic==(picIndex)}">
                </li>
              </ul>
            </div>
            <div class="list_desc" @click="goRouter('mallCart')">
              <p class="list_name">{{item.name}}</p>
              <p class="list_title">{{item.title}}</p>
              <p class="list_price"><span>￥ </span><span class="price_span">{{item.price}}</span> 起</p>
            </div>
          </a>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data(){
     return{
       item:[],
       pageIndex:1,
       selectPic:0
     }
  },
  methods:{
    goRouter(that) {
      this.$router.push({path: "/" + that});
    },
    getData(cateId) {

        var url = this.$rootUrl + "/api/halo/items?pageIndex="+this.pageIndex+"&pageCount=14" ;

      const options = {
        method: 'GET',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        url: url,
        data: {}
      };

      this.$axios(options).then((res) => {
        console.log(res.data.data)
        if (res.data.data) {
          this.item = res.data.data.items

        }
      })
    }
  },
  created() {
    this.getData()
  },
  computed: {
    filterImg() {
      let imgurl = []
      let currindex = 0
      let nextindex = this.item[0].imgUrl.indexOf(",", currindex)

      while (nextindex > 0) {
        imgurl.push(this.item[0].imgUrl.slice(currindex, nextindex))
        currindex = nextindex + 1
        nextindex = this.item[0].imgUrl.indexOf(",", currindex)
      }
      imgurl.push(this.item[0].imgUrl.slice(currindex))
      return imgurl
    }
    ,
  },
}
</script>
<style scoped>
.list_colorchoose ul{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom:10px;
}
.list_colorchoose li{
  border: 0.5px solid #dcdcdc;
  border-radius: 3px;
margin-right: 10px;
  width: 40px;
  height: 40px;
}
.list_colorchoose li img{
  margin-left: 1px;
}
.list_card{
  position: relative;
  width: 303px;
  height: 400px;
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
}
.list_desc{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  line-height: 28px;
}
.list_title{
  color:#999;
  font-size: 14px;
}
.list_name{
  color: #333;
  font-size: 16px;
}
.list_price{
  color: #c00;
}
.list_price span{
  font-size: 14px;
}
.price_span{
  font-size: 22px !important;
}
</style>
